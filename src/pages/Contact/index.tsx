import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import type { Contact } from "@/lib/contacts";

function ContactPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [contact, setContact] = useState<Contact | null>(null);
  const [showError, setShowError] = useState<boolean>(false)

  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }

    async function load() {
      const contactsString = localStorage.getItem("contacts");
      
      if (!contactsString) {
        return;
      }
    
      const contacts: Contact[] = JSON.parse(contactsString);
      const foundContact = contacts.find(c => c.id === id);
      if (foundContact) {
        setContact(foundContact);
      }else{setShowError(true)}
    }

    load()
  }, [id, navigate]);

  if (!id) return null

  return (
    <>
      <h1>Pagina Contatti</h1>
      {showError && <h1>Contatto non trovato</h1>}
      <p>{id}</p>
      <p>{contact?.name}</p>
      <p>{contact?.description}</p>
    </>
  )
}

export default ContactPage;