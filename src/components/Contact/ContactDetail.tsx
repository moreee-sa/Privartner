import { useState, useEffect } from "react";
import { THEME } from "@/lib/constants";
import type { Contact } from "@/lib/contacts";
import CryptoActionButton from "./CryptoActionButton";
import type { ContactKey } from "@/lib/contacts";
import { importPublicKey, getPublicKeyStringRSA, encryptMessage } from "@/lib/crypto";

interface ContactProps {
  contact: Contact | null;
}


function ContactDetail({ contact }: ContactProps) {
  const [showId, setShowId] = useState(false);
  const [message, setMessage] = useState("");
  const [placeholder, setPlaceholder] = useState("Inserisci il messaggio");
  const [publicKey, setPublicKey] = useState("");

  
  useEffect(() => {
    async function load() {
      console.log(contact)
      if (!contact?.keys) return;

      const pubJwkString = JSON.stringify(contact.keys);
      const pbk = await getPublicKeyStringRSA(pubJwkString);
      setPublicKey(pbk);
      console.log(pbk);
    }

    load();
  }, [contact]);

  function getMessageEncoding() {
    const userMessage = message.trim();
    if (!userMessage) return null;

    return new TextEncoder().encode(userMessage);
  }
  
  async function handleEncryptMessage(publicKey: ContactKey) {
    const encMessage = getMessageEncoding();
    if (encMessage) {
      console.log(encMessage);
      console.log("publicKey:", publicKey);
      setPlaceholder("Cifraggio del messaggio in corso...");

      const cryptoKey = await importPublicKey(publicKey);
      console.log("cryptoKey:", cryptoKey)

      const encryptedMessage = await encryptMessage(cryptoKey, encMessage);

      console.log(encryptedMessage);
    }
  }

  function Decrypt() {
    console.log("Crypt:", message);
  }

  return (
    <div className="flex flex-col">
      <span
        className="text-2xl"
        style={{
          color: THEME.text,
          fontFamily: "'Nunito Sans Variable', sans-serif",
        }}
      >
        {contact?.name}
      </span>
      <span
        className="text-base"
        style={{
          color: THEME.textSecondary,
          fontFamily: "'Nunito Sans Variable', sans-serif",
        }}
        onClick={() => setShowId(prev => !prev)}
      >
        {showId ? (
          contact?.id
        ) : (
          contact?.description
        )}
      </span>
      <div>
        <input type="text" defaultValue={publicKey} />
      </div>
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
        <CryptoActionButton actionText="Mostra" handleClick={() => contact?.contactKey && handleEncryptMessage(contact.contactKey)} />
        <CryptoActionButton actionText="Nascondi" handleClick={Decrypt} />
      </div>
    </div>
  )
}

export default ContactDetail;