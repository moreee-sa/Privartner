import type { Contact } from "@/lib/contacts"
import { MdAccountCircle } from "react-icons/md";
import { THEME } from "@/lib/constants";
import { Link } from "react-router";

interface ContactsProps {
  contacts: Contact[] | null;
}

function ContactList({ contacts }: ContactsProps) {
  return (
    <div>
      <span className="text-2xl" style={{ color: THEME.text }}>Contact List</span>
      <div className="flex flex-col gap-2 pt-5">
        {contacts && contacts.length > 0 ? (
          contacts.map(contact => (
            <Link key={contact.id} to={`/contact/${contact.id}`}>
              <div
                className="flex items-center justify-start gap-4 p-5 rounded-lg"
                style={{ backgroundColor: THEME.button }}
              >
                <MdAccountCircle size={30} color={THEME.text} />
                <span className="text-2xl" style={{ color: THEME.text }}>
                  {contact.name}
                </span>
              </div>
            </Link>
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

export default ContactList