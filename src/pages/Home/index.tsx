import { useState, useEffect } from "react";

async function exportCryptoKey(key: CryptoKey) {
  const jwk = await window.crypto.subtle.exportKey("jwk", key);
  return JSON.stringify(jwk);
}

async function generaChiave() {
  const key = await window.crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"],
  );

  return key
}

function Home() {
  const [chiave, setChiave] = useState<string | null>();

  useEffect(() => {
    async function init() {
      const cryptoKey  = await generaChiave();
      const jwkString = await exportCryptoKey(cryptoKey);
      const jwk = JSON.parse(jwkString);
      const key = jwk.k;
      setChiave(key);
    }

    init();
  }, []);

  return (
    <div className="bg-black">
      <h1 className="text-white">Privartner</h1>
      <span className="text-white">
        key: {chiave ?? "Generazione chiave in corso..."}
      </span>
    </div>
  );
}

export default Home;