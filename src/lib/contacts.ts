export type Contact = {
  id: string;
  name: string;
  description: string;
  keys: CryptoKeyPair;
  contactKey: ContactKey;
};

export type ContactKey = {
  crv: string;
  ext: boolean;
  key_ops: string[];
  kty: string;
  x: string;
  y: string;
}

export function loadContacts(): Contact[] {
  const saved = localStorage.getItem("contacts");
  return saved ? JSON.parse(saved) : [];
}

export function saveContacts(contacts: Contact[]) {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

export function addContact(name: string, description: string, jwkPair: CryptoKeyPair, contactKey: ContactKey) {
  const contacts = loadContacts();

  const newContact: Contact = {
    id: crypto.randomUUID(),
    name,
    description,
    keys: jwkPair,
    contactKey
  };

  contacts.push(newContact);
  saveContacts(contacts);

  return newContact;
}

export function addContactKey(x: string, y: string) {
  const crv = "P-384";
  const ext = true;
  const key_ops = ["verify"];
  const kty = "EC";

  const contactKey: ContactKey = {
    crv,
    ext,
    key_ops,
    kty,
    x,
    y,
  }

  return contactKey;
}