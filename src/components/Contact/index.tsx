import type { Contact } from "@/lib/contacts"
import { THEME } from "@/lib/constants";
import ContactCard from "./ContactCard";

interface ContactsProps {
  contacts: Contact[] | null;
}

function ContactList({ contacts }: ContactsProps) {
  return (
    <div className="w-full">
      <span
        className="text-lg md:text-xl lg:text-2xl"
        style={{
          color: THEME.text,
          fontFamily: "'Nunito Sans Variable', sans-serif",
        }}
      >
        Lista Contatti
      </span>
      <div className="flex flex-col gap-2 pt-5">
        {contacts && contacts.length > 0 ? (
          contacts.map(contact => (
            <ContactCard contact={contact} key={contact.id} />
          ))
        ) : (
          <p style={{ color: THEME.text }}>
            {contacts === null ? "Caricamento contatti" : "Nessun contatto trovato"}
          </p>
        )}
      </div>
    </div>
  )
}

export default ContactList;