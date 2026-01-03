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

function ContactDetailView({ contact }: ContactProps) {
  const [message, setMessage] = useState("");
  const [placeholder, setPlaceholder] = useState("Inserisci il messaggio");
  const [contactKey, setContactKey] = useState("");
  const [personalKey, setPersonalKey] = useState("");

  useEffect(() => {
    async function load() {
      console.log(contact)
      if (!contact?.contactKey) return;

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

    if (encMessage) {
      setPlaceholder("Cifraggio del messaggio in corso...");
      const cryptoKey = await importPublicKey(publicKey);
      const encryptedMessage = await encryptMessage(cryptoKey, encMessage);
      const base64Message = arrayBufferToBase64(encryptedMessage);
      setMessage(base64Message);
    }
  }

  function handleDecryptMessage() {
    console.log("Crypt:", message);
  }

  return (
    <div className="flex flex-col gap-4">
      <ContactHeader name={contact?.name} description={contact?.description} id={contact?.id} />
      <MyShareCode code={personalKey} />
      <ContactShareCode name={contact?.name} code={contactKey} />

      <div>
        <textarea
          className="outline outline-[#323031] rounded-lg focus:outline-[#969593] transition-all p-5 w-full"
          style={{
            color: THEME.text,
            fontFamily: "'Nunito Sans Variable', sans-serif",
          }}
          placeholder={placeholder}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <CryptoActionButton actionText="Mostra" handleClick={handleDecryptMessage} />
        <CryptoActionButton actionText="Nascondi" handleClick={() => contact?.contactKey && handleEncryptMessage(contact.contactKey, message)} />
      </div>
    </div>
  )
}

export default ContactDetailView;