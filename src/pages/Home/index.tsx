// Librerie esterne
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import '@fontsource-variable/nunito-sans';

// Moduli interni
import { generaCoppiaChiavi, esportaCryptoKeyPair, getPublicKeyStringRSA } from "@/lib/crypto";
import { loadContacts } from "@/lib/contacts";
import { THEME } from "@/lib/constants";

// Componenti
import Navbar from "@/components/Navbar";
import KeyDisplay from "@/components/Home/KeyDisplay";
import AddContact from "@/components/Home/AddContact";
import ContactList from "@/components/Contact";

// Tipi
import type { Contact } from "@/lib/contacts";
import type { AppDispatch } from "@/state/store";

// Redux slices / actions
import { setKeyPair } from "@/state/keyPair/keyPairSlice";

async function init() {
  const cryptoKeyPair = await generaCoppiaChiavi();
  const jwkPair = await esportaCryptoKeyPair(cryptoKeyPair)
  const publicKeyString = await getPublicKeyStringRSA(jwkPair)
  const encodedKey = encodeURIComponent(publicKeyString);

  return { encodedKey, cryptoKeyPair };
}

function HomePage() {
  const [publicKeyPreview, setPublicKeyPreview] = useState<string | null>(null);
  const [contacts, setContacts] = useState<Contact[] | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const load = async () => {
      try {
        // Carica contatti
        const contacts = loadContacts();
        setContacts(contacts)
  
        // Genera chiavi
        const { encodedKey, cryptoKeyPair } = await init();

        // Esporta chiavi
        // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/exportKey
        const pubJwk = await window.crypto.subtle.exportKey("jwk", cryptoKeyPair.publicKey);
        const privJwk = await window.crypto.subtle.exportKey("jwk", cryptoKeyPair.privateKey);
        dispatch(setKeyPair({ 
          publicKey: pubJwk,
          privateKey: privJwk,
        }));
        
        // Imposta chiave da visualizzare
        setPublicKeyPreview(encodedKey);
      } catch (err) {
        console.error("Errore:", err);
      }
    }

    load();
  }, [dispatch]);

  async function generateNewKeyPair() {
    try {
      // Resetta la chiave
      setPublicKeyPreview(null);

      // Genera chiavi
      const { encodedKey, cryptoKeyPair } = await init();

      // Esporta chiavi
      // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/exportKey
      const pubJwk = await window.crypto.subtle.exportKey("jwk", cryptoKeyPair.publicKey);
      const privJwk = await window.crypto.subtle.exportKey("jwk", cryptoKeyPair.privateKey);
      dispatch(setKeyPair({ 
        publicKey: pubJwk,
        privateKey: privJwk,
      }));

      // Imposta chiave da visualizzare
      setPublicKeyPreview(encodedKey);
    } catch (err) {
      console.error("Errore:", err)
    }
  }

  return (
    <div 
      className="min-h-screen px-4 md:px-10 md:flex md:justify-center"
      style={{ backgroundColor: THEME.background }}
    >
      <div className="w-full md:w-150 lg:w-200">
        <Navbar />
        <div className="flex flex-col gap-5 lg:gap-8 lg:items-center">
          <KeyDisplay chiave={publicKeyPreview} handleClick={generateNewKeyPair} />
          <AddContact />
          <ContactList contacts={contacts} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;