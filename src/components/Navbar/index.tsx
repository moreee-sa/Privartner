import { Link } from "react-router"
import { THEME } from "@/lib/constants"

function Navbar() {
  return (
    <div className="w-full py-5">
      <Link
        to={"/"}
        style={{ color: THEME.text }}
      >
        <span className="text-2xl md:text-3xl lg:text-4xl">
          Privartner
        </span>
      </Link>
    </div>
  )
}

export default Navbar 