import { useState, useEffect } from "react";
import { generaChiave, esportaCryptoKey } from "@/lib/crypto";

function Home() {
  const [chiave, setChiave] = useState<string | null>();

  useEffect(() => {
    async function init() {
      const cryptoKey  = await generaChiave();
      const jwkString = await esportaCryptoKey(cryptoKey);
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