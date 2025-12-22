import { useNavigate } from "react-router";
import { useState, useEffect, type FormEvent } from "react";
import { addContact, addContactKey } from "@/lib/contacts";
import { THEME } from "@/lib/constants";
import Navbar from "@/components/Navbar";
import { IoPersonAddSharp } from "react-icons/io5";
import InputForm from "@/components/Add/InputForm";

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
    <div className="min-h-screen px-10 lg:px-[25%]" style={{ backgroundColor: THEME.background }}>
      <Navbar />
      <form
        onSubmit={createContact}
        className="flex flex-col gap-5 p-5 rounded-lg"
        style={{ backgroundColor: THEME.form }}
      >
        <InputForm
          title={"Nome del contatto"}
          nameInput={"nome"}
          valueInput={nameContact}
          placeholderInput={"Inserisci il nome del contatto"}
          onChange={(e) => setNameContact(e.target.value)}
        />

        <InputForm
          title={"Descrizione del contatto"}
          nameInput={"descrizione"}
          valueInput={descriptionContact}
          placeholderInput={"Inserisci la descrizione"}
          onChange={(e) => setDescriptionContact(e.target.value)}
        />

        <InputForm
          title={"Chiave pubblica del contatto"}
          nameInput={"publickey"}
          valueInput={keyContact}
          placeholderInput={"Inserisci la chiave pubblica"}
          onChange={(e) => setKeyContact(e.target.value)}
          qrcode
        />

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
  );
}

export default AddContactPage;