// Librerie esterne
import { useState, useEffect, type FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useSelector } from "react-redux";
import '@fontsource-variable/nunito-sans';
import { IoPersonAddSharp } from "react-icons/io5";

// Moduli interni
import { generaCoppiaChiavi } from "@/lib/crypto";
import { addContact, addContactKey } from "@/lib/contacts";
import { THEME } from "@/lib/constants";

// Componenti
import Navbar from "@/components/Navbar";
import InputForm from "@/components/Add/InputForm";

// Tipi
import type { RootState } from "@/state/store";

function AddContactPage() {
  // React router / hooks
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const contactKeyFromUrl = searchParams.get("key") || "";

  // Form fields
  const [nameContact, setNameContact] = useState("");
  const [descriptionContact, setDescriptionContact] = useState("");
  const [keyContact, setKeyContact] = useState(contactKeyFromUrl);

  // Key pair
  const [keyPair, setKeyPair] = useState<{ publicKey: JsonWebKey | null; privateKey: JsonWebKey | null } | null>(null);

  // UI state
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(true);

  // Redux selectors
  const jwkPair = useSelector((state: RootState) => state.keypair);

  useEffect(() => {
    async function load() {
      try {
        if (jwkPair.publicKey && jwkPair.privateKey) {
          setKeyPair(jwkPair);
        } else {
          const newPair = await generaCoppiaChiavi();
          const pubJwk = await crypto.subtle.exportKey("jwk", newPair.publicKey);
          const privJwk = await crypto.subtle.exportKey("jwk", newPair.privateKey);
          const jwkPair = { publicKey: pubJwk, privateKey: privJwk };
          setKeyPair(jwkPair);
        }
        setIsAddButtonDisabled(false);
      } catch (err) {
        console.error("Errore:", err)
      }
    }
    
    load();
  }, [jwkPair]);

  const createContact = (e: FormEvent) => {
    e.preventDefault();

    if (!keyPair?.publicKey || !keyPair?.privateKey) {
      console.error("Nessuna coppia di chiavi disponibile!");
      return;
    }

    const contactKey = addContactKey(keyContact);
    const newContactId = addContact(nameContact, descriptionContact, { publicKey: keyPair.publicKey, privateKey: keyPair.privateKey }, contactKey);

    console.log("Contatto aggiunto!", newContactId);
    navigate(`/contact/${newContactId}`);
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
            className={`rounded-lg w-full h-16 flex items-center justify-center gap-5 transition-opacity ${isAddButtonDisabled ? "opacity-25 cursor-not-allowed" : "opacity-80 hover:opacity-100 cursor-pointer"}`}
            style={{ backgroundColor: THEME.button }}
            disabled={isAddButtonDisabled}
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