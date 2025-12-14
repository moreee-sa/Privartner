import { useNavigate } from "react-router";
import { useState, useEffect, type FormEvent } from "react";
import { addContact, addContactKey } from "@/lib/contacts";
import { THEME } from "@/lib/constants";
import Navbar from "@/components/Navbar";
import { IoPersonAddSharp } from "react-icons/io5";
import { MdOutlineQrCodeScanner } from "react-icons/md";

function loadContacts() {
  const saved = localStorage.getItem("lastPairKey");

  if (saved) {
    const jwkPair = JSON.parse(saved);
    console.log(jwkPair)
    const publicKeyOnly = JSON.stringify(jwkPair.publicKey);
    const encodedKey = encodeURIComponent(publicKeyOnly);
    console.log("Chiave pubblica da condividere:", encodedKey);

    return encodedKey
  };

  return null
}

function AddContactPage() {
  const navigate = useNavigate();
  const [nameContact, setNameContact] = useState("");
  const [descriptionContact, setDescriptionContact] = useState("");
  const [keyContact, setKeyContact] = useState("");
  
  useEffect(() => {
    const data = loadContacts();
    if (data === null) navigate("/");
  }, [navigate]);

  const createContact = (e: FormEvent) => {
    e.preventDefault();

    const savedPair = localStorage.getItem("lastPairKey");

    if (!savedPair) {
      console.error("Nessuna coppia di chiavi trovata!");
      return;
    }

    const jwkPair = JSON.parse(savedPair);
    const contactKey = addContactKey(keyContact);
    console.log("contact key public",contactKey)
    const newContactId = addContact(nameContact, descriptionContact, jwkPair, contactKey);

    console.log("Contatto aggiunto!", newContactId);
    navigate(`/`)
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: THEME.background }}>
      <Navbar />
      <div className="px-10 lg:px-52">
        <form
          onSubmit={createContact}
          className="flex flex-col gap-5 p-5 rounded-lg"
        >
          <div
            className="w-full rounded-md px-4 py-2"
            style={{ boxShadow: 'inset 0px 12px 25px -3px rgba(0, 0, 0, 0.25)' }}
          >
            <input
              type="text"
              name="nome"
              value={nameContact}
              onChange={(e) => setNameContact(e.target.value)}
              required
              placeholder="Inserisci il nome del contatto"
              style={{ color: THEME.text }}
              className="border-none outline-none text-xl w-full h-14"
            />
          </div>

          <div
            className="w-full rounded-md px-4 py-2"
            style={{ boxShadow: 'inset 0px 12px 25px -3px rgba(0, 0, 0, 0.25)' }}
          >
            <input
              type="text"
              name="descrizione"
              value={descriptionContact}
              onChange={(e) => setDescriptionContact(e.target.value)}
              placeholder="Inserisci la descrizione"
              style={{ color: THEME.text }}
              className="border-none outline-none text-xl w-full h-14"
            />
          </div>

          <div
            className="w-full rounded-md px-4 py-2 flex items-center"
            style={{ boxShadow: 'inset 0px 12px 25px -3px rgba(0, 0, 0, 0.25)' }}
          >
            <input
              type="text"
              name="descrizione"
              value={keyContact}
              onChange={(e) => setKeyContact(e.target.value)}
              placeholder="Inserisci la chiave pubblica del contatto"
              style={{ color: THEME.text }}
              className="border-none outline-none text-xl w-full h-14"
            />
            <div className="hidden">
              <MdOutlineQrCodeScanner color="grey" size={35} />
            </div>
          </div>

          <button
            type="submit"
            className="rounded-lg w-full h-16 flex items-center justify-center gap-5"
            style={{ backgroundColor: THEME.button }}
          >
            <IoPersonAddSharp size={25} color={THEME.text} />
            <span className="text-2xl" style={{ color: THEME.text }}>
              Aggiungi Contatto
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddContactPage;