import { Link } from "react-router";
import { THEME } from "@/lib/constants";
import { IoPersonAddSharp } from "react-icons/io5";

interface AddContactProps {
  chiave?: string | null;
}

function AddContact({ chiave }: AddContactProps) {
  const path = chiave ? `/add/${chiave}` : "#";

  return (
    <Link
      to={path}
      className="rounded-lg w-full h-16 flex items-center justify-center gap-5"
      style={{ backgroundColor: THEME.button }}
    >
      <IoPersonAddSharp size={25} color={THEME.text} />
      <span className="text-2xl" style={{ color: THEME.text }}>
        Aggiungi Contatto
      </span>
    </Link>
  )
}

export default AddContact