import { Link } from "react-router"
import { THEME } from "@/lib/constants"

function Navbar() {
  return (
    <div className="w-full py-5 px-10 lg:px-52">
      <Link
        to={"/"}
        className="text-3xl"
        style={{ color: THEME.text }}
      >
        Privartner
      </Link>
    </div>
  )
}

export default Navbar