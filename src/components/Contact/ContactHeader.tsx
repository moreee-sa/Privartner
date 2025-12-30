import { useState } from "react";
import { THEME } from "@/lib/constants";

interface ContactInfo {
  name: string | undefined;
  description: string | undefined;
  id: string | undefined;
}

function ContactHeader({ name, description, id }: ContactInfo) {
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
        {name}
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
          id
        ) : (
          description
        )}
      </span>
    </div>
  )
}

export default ContactHeader;