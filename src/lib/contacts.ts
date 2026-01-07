export type Contact = {
  id: string;
  name: string;
  description: string;
  keys: { publicKey: JsonWebKey; privateKey: JsonWebKey };
  contactKey: ContactKey;
};

export type ContactKey = {
  kty: string;
  alg: string;
  n: string;
  e: string;
  ext: boolean;
  key_ops: string[];
}

export function loadContacts(): Contact[] {
  const saved = localStorage.getItem("contacts");
  return saved ? JSON.parse(saved) : [];
}

export function saveContacts(contacts: Contact[]) {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

export function addContact(name: string, description: string, jwkPair: { publicKey: JsonWebKey; privateKey: JsonWebKey }, contactKey: ContactKey) {
  const contacts = loadContacts();
  const contactId = crypto.randomUUID();

  const newContact: Contact = {
    id: contactId,
    name,
    description,
    keys: jwkPair,
    contactKey
  };

  contacts.push(newContact);
  saveContacts(contacts);

  return contactId;
}

export function addContactKey(n: string,): ContactKey {
  return {
    alg: "RSA-OAEP-256",
    e: "AQAB",
    ext: true,
    key_ops: ["encrypt"],
    kty: "RSA",
    n,
  };
}