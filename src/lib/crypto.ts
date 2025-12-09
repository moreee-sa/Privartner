export async function generaCoppiaChiavi() {
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: "ECDSA",
      namedCurve: "P-384",
    },
    true,
    ["sign", "verify"],
  );

  return keyPair
}

export async function esportaCryptoKeyPair(keyPair: CryptoKeyPair) {
  const pubJwk = await window.crypto.subtle.exportKey("jwk", keyPair.publicKey);
  const privJwk = await window.crypto.subtle.exportKey("jwk", keyPair.privateKey);

  return JSON.stringify({ publicKey: pubJwk, privateKey: privJwk });
}

export async function getPublicKeyStringXY(jwkPair: string) {
  const jwkjson = JSON.parse(jwkPair);
  const publicKeyX = jwkjson.publicKey.x;
  const publicKeyY = jwkjson.publicKey.y;

  return publicKeyX + publicKeyY;
}

export async function saveKeyPair(keyPair: CryptoKeyPair) {
  const pubJwk = await crypto.subtle.exportKey("jwk", keyPair.publicKey);
  const privJwk = await crypto.subtle.exportKey("jwk", keyPair.privateKey);

  const jwkPair = { publicKey: pubJwk, privateKey: privJwk };
  localStorage.setItem("lastPairKey", JSON.stringify(jwkPair));
  console.log("Coppia di chiavi salvate");
}