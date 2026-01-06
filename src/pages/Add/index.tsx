import { useNavigate, useSearchParams } from "react-router";
import { useState, useEffect, type FormEvent } from "react";
import { addContact, addContactKey } from "@/lib/contacts";
import { THEME } from "@/lib/constants";
import Navbar from "@/components/Navbar";
import { IoPersonAddSharp } from "react-icons/io5";
import InputForm from "@/components/Add/InputForm";
import '@fontsource-variable/nunito-sans';
import { generaCoppiaChiavi } from "@/lib/crypto";

function AddContactPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const contactKeyFromUrl = searchParams.get("key") || "";

  const [nameContact, setNameContact] = useState("");
  const [descriptionContact, setDescriptionContact] = useState("");
  const [keyContact, setKeyContact] = useState(contactKeyFromUrl);
  const [keyPair, setKeyPair] = useState<CryptoKeyPair | null>(null);
  
  useEffect(() => {
    async function load() {
      const savedPair = localStorage.getItem("lastPairKey");
      if (savedPair) {
        const jwkPair = JSON.parse(savedPair);
        console.log("Chiave salvata trovata:", jwkPair);
        setKeyPair(jwkPair);
      } else {
        const newPair = await generaCoppiaChiavi();
        setKeyPair(newPair);
        localStorage.setItem("lastPairKey", JSON.stringify(newPair));
        console.log("Nuova coppia di chiavi generata:", newPair);
      }
    }
    load();
  }, []);

  const createContact = (e: FormEvent) => {
    e.preventDefault();

    if (!keyPair) {
      console.error("Nessuna coppia di chiavi disponibile!");
      return;
    }

    const contactKey = addContactKey(keyContact);
    const newContactId = addContact(nameContact, descriptionContact, keyPair, contactKey);

    console.log("Contatto aggiunto!", newContactId);
    navigate(`/`);
  };

  return (
    <div
      className="min-h-screen px-4 md:px-10 md:flex md:justify-center"
      style={{ backgroundColor: THEME.background }}
    >
      <div className="w-full md:w-150 lg:w-200">
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
            required
          />

          <InputForm
            title={"Descrizione del contatto"}
            nameInput={"descrizione"}
            valueInput={descriptionContact}
            placeholderInput={"Inserisci la descrizione"}
            onChange={(e) => setDescriptionContact(e.target.value)}
            required
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
            className="rounded-lg w-full h-16 flex items-center justify-center gap-5 opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
            style={{ backgroundColor: THEME.button }}
          >
            <IoPersonAddSharp
              className="text-base md:text-lg lg:text-xl"
              color={THEME.text}
            />
            <span
              className="text-base md:text-lg lg:text-xl"
              style={{ color: THEME.text }}
            >
              Aggiungi Contatto
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddContactPage;