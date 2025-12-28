import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import type { Contact } from "@/lib/contacts";
import { THEME } from "@/lib/constants";
import Navbar from "@/components/Navbar";
import ContactDetail from "@/components/Contact/ContactDetail";

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
    <div
      className="min-h-screen px-4 md:px-10 md:flex md:justify-center"
      style={{ backgroundColor: THEME.background }}
    >
      <div className="w-full md:w-150 lg:w-200">
        <Navbar />
        {showError ? (
          <span>Contatto non trovato</span>
        ) : (
          <ContactDetail contact={contact} />
        )}
      </div>
    </div>
  )
}

export default ContactPage;