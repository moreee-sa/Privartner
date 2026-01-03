import { useState, useEffect } from "react";
import { THEME } from "@/lib/constants";
import type { Contact } from "@/lib/contacts";
import CryptoActionButton from "./CryptoActionButton";
import type { ContactKey } from "@/lib/contacts";
import { importPublicKey, getPublicKeyStringRSA, encryptMessage, arrayBufferToBase64, getMessageEncoding } from "@/lib/crypto";
import MyShareCode from "./MyShareCode";
import ContactHeader from "./ContactHeader";
import ContactShareCode from "./ContactShareCode";

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
      console.log(contact)
      if (!contact?.contactKey) return;

      setDisableButton(false);

      // Chiave Contatto
      const cpubJwkString = JSON.stringify(contact.contactKey);
      const cpbk = await getPublicKeyStringRSA(cpubJwkString);
      setContactKey(cpbk);
      console.log(cpbk);
      
      // Chiave Utente
      const ppubJwkString = JSON.stringify(contact.keys);
      const ppbk = await getPublicKeyStringRSA(ppubJwkString);
      setPersonalKey(ppbk);
      console.log(ppbk);
    }

    load();
  }, [contact]);
  
  async function handleEncryptMessage(publicKey: ContactKey, message: string) {
    const encMessage = getMessageEncoding(message);

    if (encMessage && encMessage.length <= MAX_RSA_OAEP_BYTES) {
      setDisableButton(true);
      setPlaceholder("Cifraggio del messaggio in corso...");
      try {
        const cryptoKey = await importPublicKey(publicKey);
        const encryptedMessage = await encryptMessage(cryptoKey, encMessage);
        const base64Message = arrayBufferToBase64(encryptedMessage);
        setMessageData(prev => ({
          ...prev,
          text: base64Message
        }));
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

  function handleDecryptMessage() {
    console.log("Crypt:", messageData.text);
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
      setDisableButton(true);
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
    <div className="flex flex-col gap-4">
      <ContactHeader name={contact?.name} description={contact?.description} id={contact?.id} />
      <MyShareCode code={personalKey} />
      <ContactShareCode name={contact?.name} code={contactKey} />

      <div>
        <textarea
          className="outline outline-[#323031] rounded-lg focus:outline-[#969593] transition-all p-5 w-full resize-none field-sizing-content"
          style={{
            color: messageData.maxBytes ? "#FF2C2C" : THEME.text,
            fontFamily: "'Nunito Sans Variable', sans-serif",
          }}
          placeholder={placeholder}
          value={messageData.text}
          onChange={(e) => handleMessageLength(e)}
        />
        <div className="flex justify-end">
          <span
            className="transition-colors"
            style={{ color: messageData.maxBytes ? "#FF2C2C" : THEME.text, fontFamily: "'Nunito Sans Variable', sans-serif", }}
          >
            {messageData.byteLength}/{MAX_RSA_OAEP_BYTES} bytes
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <CryptoActionButton actionText="Mostra" disableButton={disableButton} handleClick={handleDecryptMessage} />
        <CryptoActionButton actionText="Nascondi" disableButton={disableButton} handleClick={() => contact?.contactKey && handleEncryptMessage(contact.contactKey, messageData.text)} />
      </div>
    </div>
  )
}

export default ContactDetailView;