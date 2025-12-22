import { Link } from "react-router"
import { THEME } from "@/lib/constants"

function Navbar() {
  return (
    <div className="w-full py-5">
      <Link
        to={"/"}
        className="text-3xl"
        style={{ color: THEME.text }}
      >
        <span className="lg:text-3xl">
          Privartner
        </span>
      </Link>
    </div>
  )
}

export default Navbar