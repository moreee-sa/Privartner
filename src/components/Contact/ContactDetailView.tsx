import { useState, useEffect } from "react";
import type { Contact } from "@/lib/contacts";
import CryptoActionButton from "./CryptoActionButton";
import type { ContactKey } from "@/lib/contacts";
import { importPublicKey, importPrivateKey, getPublicKeyStringRSA, encryptMessage, decryptMessage, arrayBufferToBase64, base64ToArrayBuffer, getMessageEncoding } from "@/lib/crypto";
import MyShareCode from "./MyShareCode";
import ContactHeader from "./ContactHeader";
import ContactShareCode from "./ContactShareCode";
import MessageInput from "./MessageInput";

interface ContactProps {
  contact: Contact | null;
}

function getByteLength(str: string) {
  return new TextEncoder().encode(str).length;
}

function ContactDetailView({ contact }: ContactProps) {
  const MAX_RSA_OAEP_BYTES = 400;
  const [messageData, setMessageData] = useState({
    text: "",
    byteLength: 0,
    maxBytes: false
  });
  const [placeholder, setPlaceholder] = useState("Inserisci il messaggio");
  const [contactKey, setContactKey] = useState("");
  const [personalKey, setPersonalKey] = useState("");
  const [disableButton, setDisableButton] = useState(true);

  useEffect(() => {
    async function load() {
      if (!contact?.contactKey) return;

      setDisableButton(false);

      // Chiave Contatto
      const cpubJwkString = JSON.stringify(contact.contactKey);
      const cpbk = await getPublicKeyStringRSA(cpubJwkString);
      setContactKey(cpbk);
      
      // Chiave Utente
      const ppubJwkString = JSON.stringify(contact.keys);
      const ppbk = await getPublicKeyStringRSA(ppubJwkString);
      setPersonalKey(ppbk);
    }

    load();
  }, [contact]);
  
  async function handleEncryptMessage(publicKey: ContactKey, message: string) {
    const encMessage = getMessageEncoding(message);

    if (encMessage && encMessage.length <= MAX_RSA_OAEP_BYTES) {
      setDisableButton(true);
      setPlaceholder("Cifraggio del messaggio in corso...");
      try {
        // Importa chiave
        const cryptoKey = await importPublicKey(publicKey);

        // Cifra messaggio
        const encryptedMessage = await encryptMessage(cryptoKey, encMessage);
        const base64Message = arrayBufferToBase64(encryptedMessage);

        // Imposta messaggio
        setMessageData(prev => ({
          ...prev,
          text: base64Message
        }));
        
        // Copia negli appunti
        const type = "text/plain";
        const clipboardItemData = {
          [type]: base64Message,
        };
        const clipboardItem = new ClipboardItem(clipboardItemData);
        await navigator.clipboard.write([clipboardItem]);
      } catch (error) {
        setMessageData(prev => ({
          ...prev,
          text: ""
        }));
        setPlaceholder("Errore durante la cifratura");
        console.error(error);
      } finally {
        setDisableButton(false);
      }
      return;
    } else if(encMessage) {
      setPlaceholder("Lunghezza del messaggio superata!");
      return;
    }
    setPlaceholder("Il messaggio non può essere vuoto!");
  }

  async function handleDecryptMessage(privateKeyInput: JsonWebKey, message: string) {
    if (!message) return;

    setDisableButton(true);

    try {
      const privateKey = await importPrivateKey(privateKeyInput);
      const ciphertext = base64ToArrayBuffer(message);
      const decryptedBuffer = await decryptMessage(privateKey, ciphertext);

      const text = new TextDecoder().decode(decryptedBuffer);
      setMessageData(prev => ({
        ...prev,
        text: text,
        maxBytes: false,
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setDisableButton(false);
    }
  }

  function handleMessageLength(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const msg = event.target.value;
    const msgLength = getByteLength(msg);
    setMessageData(prev =>({
      ...prev,
      text: msg,
      byteLength: msgLength,
    }))
    if (msgLength > MAX_RSA_OAEP_BYTES) {
      setDisableButton(false);
      setMessageData(prev =>({
        ...prev,
        maxBytes: true,
      }))
    } else {
      setDisableButton(false);
      setMessageData(prev =>({
        ...prev,
        maxBytes: false,
      }))
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <ContactHeader name={contact?.name} description={contact?.description} id={contact?.id} />
      <MyShareCode code={personalKey} />
      <ContactShareCode name={contact?.name} code={contactKey} />

      <MessageInput
        maxBytes={messageData.maxBytes}
        placeholder={placeholder}
        text={messageData.text}
        byteLength={messageData.byteLength}
        handleMessageLength={handleMessageLength}
      />
      
      <div className="flex gap-2">
        <CryptoActionButton
          actionText="Mostra"
          disableButton={disableButton}
          handleClick={() => contact?.keys && handleDecryptMessage(contact.keys.privateKey, messageData.text)}
          isDecrypt
        />
        <CryptoActionButton
          actionText="Nascondi"
          disableButton={disableButton}
          handleClick={() => contact?.contactKey && handleEncryptMessage(contact.contactKey, messageData.text)}
        />
      </div>
    </div>
  )
}
  
export default ContactDetailView;