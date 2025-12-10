export async function generaCoppiaChiavi() {
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 4096,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["encrypt", "decrypt"],
  );

  console.log("Coppia di chiavi:", keyPair)

  return keyPair
}

export async function esportaCryptoKeyPair(keyPair: CryptoKeyPair) {
  const pubJwk = await window.crypto.subtle.exportKey("jwk", keyPair.publicKey);
  const privJwk = await window.crypto.subtle.exportKey("jwk", keyPair.privateKey);

  console.log("pubJwk:", pubJwk)
  console.log("privJwk:", privJwk)

  return JSON.stringify({ publicKey: pubJwk, privateKey: privJwk });
}

export async function getPublicKeyStringRSA(pubJwkString: string) {
  const pubJwk = JSON.parse(pubJwkString);
  return pubJwk.publicKey.n;
}

export async function saveKeyPair(keyPair: CryptoKeyPair) {
  const pubJwk = await crypto.subtle.exportKey("jwk", keyPair.publicKey);
  const privJwk = await crypto.subtle.exportKey("jwk", keyPair.privateKey);

  const jwkPair = { publicKey: pubJwk, privateKey: privJwk };
  localStorage.setItem("lastPairKey", JSON.stringify(jwkPair));
}