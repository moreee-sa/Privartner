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
  return keyPair
}

export async function esportaCryptoKeyPair(keyPair: CryptoKeyPair) {
  const pubJwk = await window.crypto.subtle.exportKey("jwk", keyPair.publicKey);
  const privJwk = await window.crypto.subtle.exportKey("jwk", keyPair.privateKey);
  return JSON.stringify({ publicKey: pubJwk, privateKey: privJwk });
}

export function getPublicKeyStringRSA(pubJwkString: string) {
  const pubJwk = JSON.parse(pubJwkString);
  
  if (pubJwk.publicKey?.n) return pubJwk.publicKey.n;
  if (pubJwk.n) return pubJwk.n;
}

export async function importPublicKey(jwk: JsonWebKey): Promise<CryptoKey> {
  return await window.crypto.subtle.importKey(
    "jwk",
    jwk,
    {
      name: "RSA-OAEP",
      hash: "SHA-256"
    },
    true,
    ["encrypt"]
  );
}

export async function importPrivateKey(jwk: JsonWebKey): Promise<CryptoKey> {
  return await window.crypto.subtle.importKey(
    "jwk",
    jwk,
    {
      name: "RSA-OAEP",
      hash: "SHA-256"
    },
    true,
    ["decrypt"]
  );
}

export async function encryptMessage(cryptoKey: CryptoKey, encMessage: Uint8Array<ArrayBuffer>) {
  const encryptedMessage = window.crypto.subtle.encrypt(
    {
      name: "RSA-OAEP",
    },
    cryptoKey,
    encMessage,
  )

  return encryptedMessage;
}

export async function decryptMessage(privateKey: CryptoKey, ciphertext: BufferSource) {
  const decryptedMessage = window.crypto.subtle.decrypt(
    {
      name: "RSA-OAEP",
    },
    privateKey,
    ciphertext,
  )

  return decryptedMessage;
}

export function arrayBufferToBase64(buffer: ArrayBuffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return window.btoa(binary);
}

export function base64ToArrayBuffer(base64: string) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes.buffer;
}

export function getMessageEncoding(message: string) {
  const userMessage = message.trim();
  if (!userMessage) return null;

  return new TextEncoder().encode(userMessage);
}