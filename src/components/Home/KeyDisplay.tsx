import { THEME } from "@/lib/constants"
import { TbReload } from "react-icons/tb";

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
        <span className={`text-base lg:text-lg opacity-50 transition-opacity duration-500 ${chiave && "opacity-100"}`} style={{ color: THEME.text }}>
          {chiave ?? "Generazione chiave in corso..."}
        </span>
      </div>

      <button
        className="rounded-lg w-16 h-16 flex items-center justify-center aspect-square"
        onClick={handleClick}
        disabled={!chiave}
      >
        <TbReload
          size={35}
          color={chiave ? '#eceeee' : '#4a4e69'}
          className="transition-colors duration-500"
        />
      </button>
    </div>
  )
}

export default KeyDisplay;