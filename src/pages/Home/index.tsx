import { useState, useEffect } from "react";
import { generaChiave, esportaCryptoKey } from "@/lib/crypto";
import { THEME } from "@/lib/constants";
import Navbar from "@/components/Navbar";
import KeyDisplay from "@/components/Home/KeyDisplay";
import AddContact from "@/components/Home/AddContact";

async function init() {
  const cryptoKey  = await generaChiave();
  const jwkString = await esportaCryptoKey(cryptoKey);
  const jwk = JSON.parse(jwkString);
  const key = jwk.k;
  return key;
}

function Home() {
  const [chiave, setChiave] = useState<string | null>();

  useEffect(() => {
    async function load() {
      const key = await init();
      setChiave(key);
    }
    load();
  }, []);

  async function handleClick() {
    const key = await init();
    setChiave(key);
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: THEME.background }}>
      <Navbar />
      <div className="flex flex-col gap-5 px-10 lg:px-52">
        <KeyDisplay chiave={chiave} handleClick={handleClick} />
        <AddContact chiave={chiave} />
      </div>
      
    </div>
  );
}

export default Home;