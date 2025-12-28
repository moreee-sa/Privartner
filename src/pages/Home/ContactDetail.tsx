import { useState } from "react";
import { THEME } from "@/lib/constants";
import type { Contact } from "@/lib/contacts";

interface ContactProps {
  contact: Contact | null;
}

function ContactDetail({ contact }: ContactProps) {
  const [showId, setShowId] = useState(false);

  return (
    <div className="flex flex-col">
      <span
        className="text-2xl"
        style={{
          color: THEME.text,
          fontFamily: "'Nunito Sans Variable', sans-serif",
        }}
      >
        {contact?.name}
      </span>
      <span
        className="text-base"
        style={{
          color: THEME.textSecondary,
          fontFamily: "'Nunito Sans Variable', sans-serif",
        }}
        onClick={() => setShowId(prev => !prev)}
      >
        {showId ? (
          contact?.id
        ) : (
          contact?.description
        )}
      </span>
    </div>
  )
}

export default ContactDetail;