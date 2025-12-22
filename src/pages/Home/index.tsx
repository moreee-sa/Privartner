import { useState, useEffect } from "react";
import { generaCoppiaChiavi, esportaCryptoKeyPair, getPublicKeyStringRSA, saveKeyPair} from "@/lib/crypto";
import { loadContacts } from "@/lib/contacts";
import { THEME } from "@/lib/constants";
import Navbar from "@/components/Navbar";
import KeyDisplay from "@/components/Home/KeyDisplay";
import AddContact from "@/components/Home/AddContact";
import ContactList from "@/components/Contact";
import type { Contact } from "@/lib/contacts";

async function init() {
  const cryptoKeyPair = await generaCoppiaChiavi();
  const jwkPair = await esportaCryptoKeyPair(cryptoKeyPair)
  const publicKeyString = await getPublicKeyStringRSA(jwkPair)
  const encodedKey = encodeURIComponent(publicKeyString);

  return { encodedKey, cryptoKeyPair };
}

function HomePage() {
  const [chiave, setChiave] = useState<string | null>(null);
  const [contatti, setContatti] = useState<Contact[] | null>(null);

  useEffect(() => {
    async function load() {
      const contacts = loadContacts();
      setContatti(contacts)
      const { encodedKey, cryptoKeyPair } = await init();
      setChiave(encodedKey);
      await saveKeyPair(cryptoKeyPair);
    }
    load();
  }, []);

  async function generateNewKeyPair() {
    setChiave(null);
    const { encodedKey, cryptoKeyPair } = await init();
    setChiave(encodedKey);
    await saveKeyPair(cryptoKeyPair);
  }

  return (
    <div 
      className="min-h-screen px-10 md:px-15 lg:px-[25%]"
      style={{ backgroundColor: THEME.background }}
    >
      <Navbar />
      <div className="flex flex-col gap-5 lg:gap-10 lg:items-center">
        <KeyDisplay chiave={chiave} handleClick={generateNewKeyPair} />
        <AddContact />
        <ContactList contacts={contatti} />
      </div>
    </div>
  );
}

export default HomePage;