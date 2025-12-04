import { THEME } from "@/lib/constants"
import { TfiReload } from "react-icons/tfi";

interface KeyDisplayProps {
  chiave?: string | null;
  handleClick: () => void;
}

function KeyDisplay({chiave, handleClick}: KeyDisplayProps) {
  return (
    <div
      className="w-full rounded-md px-4 py-2 flex gap-2 justify-between"
      style={{ boxShadow: 'inset 0px 12px 25px -3px rgba(0, 0, 0, 0.25)' }}
    >
      <div className="flex items-center overflow-hidden text-nowrap mask-[linear-gradient(to_right,black_50%,transparent)] mask-size-[100%_100%]">
        <span className="text-xl" style={{ color: THEME.text }}>
          {chiave ?? "Generazione chiave in corso..."}
        </span>
      </div>

      <button
        className="rounded-lg w-16 h-16 flex items-center justify-center aspect-square"
        onClick={handleClick}
      >
        <TfiReload size={35} color="#eceeee" />
      </button>
    </div>
  )
}

export default KeyDisplay