import type { Contact } from "@/lib/contacts";
import { MdAccountCircle } from "react-icons/md";
import { THEME } from "@/lib/constants";
import { Link } from "react-router";

interface ContactProps {
  contact: Contact;
}

function ContactCard({ contact }: ContactProps) {
  return (
    <Link key={contact.id} to={`/contact/${contact.id}`}>
      <div
        className="flex items-center justify-start gap-4 p-5 rounded-lg opacity-80 hover:opacity-100 transition-opacity"
        style={{ backgroundColor: THEME.button }}
      >
        <MdAccountCircle size={30} color={THEME.text} />
        <div className="flex flex-col">
          <span className="text-base md:text-lg lg:text-xl" style={{ color: THEME.text }}>
            {contact.name}
          </span>
          <span className="text-xs md:text-base" style={{ color: THEME.textSecondary }}>
            {contact.description}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default ContactCard;