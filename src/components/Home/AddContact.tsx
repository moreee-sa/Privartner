import { Link } from "react-router";
import { THEME } from "@/lib/constants";
import { IoPersonAddSharp } from "react-icons/io5";

function AddContact() {
  return (
    <Link
      to="/add"
      className="rounded-2xl w-full h-16 flex items-center justify-center gap-5 opacity-80 hover:opacity-100 transition-opacity"
      style={{ backgroundColor: THEME.button }}
    >
      <IoPersonAddSharp
        color={THEME.text}
        className="text-base md:text-lg lg:text-xl"
      />
      <span
        className="text-base md:text-lg lg:text-xl"
        style={{
          color: THEME.text,
          fontFamily: "'Nunito Sans Variable', sans-serif",
        }}
      >
        Aggiungi Contatto
      </span>
    </Link>
  )
}

export default AddContact;