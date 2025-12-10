import { useState, useEffect } from "react";
import { generaCoppiaChiavi, esportaCryptoKeyPair, getPublicKeyStringXY, saveKeyPair} from "@/lib/crypto";
import { THEME } from "@/lib/constants";
import Navbar from "@/components/Navbar";
import KeyDisplay from "@/components/Home/KeyDisplay";
import AddContact from "@/components/Home/AddContact";

async function init() {
  const cryptoKeyPair = await generaCoppiaChiavi();
  const jwkPair = await esportaCryptoKeyPair(cryptoKeyPair)
  const publicKeyString = await getPublicKeyStringXY(jwkPair)
  const encodedKey = encodeURIComponent(publicKeyString);

  return { encodedKey, cryptoKeyPair };
}

function HomePage() {
  const [chiave, setChiave] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const { encodedKey, cryptoKeyPair } = await init();
      setChiave(encodedKey);
      await saveKeyPair(cryptoKeyPair);
    }
    
    load();
  }, []);

  async function generateNewKeyPair() {
    const { encodedKey, cryptoKeyPair } = await init();
    setChiave(encodedKey);
    await saveKeyPair(cryptoKeyPair);
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: THEME.background }}>
      <Navbar />
      <div className="flex flex-col gap-5 px-10 lg:px-52">
        <KeyDisplay chiave={chiave} handleClick={generateNewKeyPair} />
        <AddContact />
      </div>
    </div>
  );
}

export default HomePage;