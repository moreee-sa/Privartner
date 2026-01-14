import { useState } from "react";
import { THEME } from "@/lib/constants";
import { MdAccountCircle } from "react-icons/md";

interface ContactInfo {
  name: string | undefined;
  description: string | undefined;
  id: string | undefined;
}

function ContactHeader({ name, description, id }: ContactInfo) {
  const [showId, setShowId] = useState(false);

  return (
    <div
      className="flex flex-row  p-5 rounded-2xl gap-2"
      style={{
        backgroundColor: THEME.button,
      }}
      onClick={() => setShowId(prev => !prev)}
    >
      <MdAccountCircle size={45} color={THEME.text} />
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
        >
          {showId ? (
            id
          ) : (
            description
          )}
        </span>
      </div>
    </div>
  )
}

export default ContactHeader;