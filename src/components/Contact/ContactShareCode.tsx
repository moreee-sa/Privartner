import { THEME } from "@/lib/constants";
import { MdOutlineEdit } from "react-icons/md";

interface ShareCodeProps {
  name: string | undefined;
  code: string;
  handleContactKey: (contactKeyValue: string) => void;
  handleSaveContactKey: () => void;
  saved: boolean;
}

function ContactShareCode({ name, code, handleContactKey, handleSaveContactKey, saved }: ShareCodeProps) {
  return (
    <div className="flex flex-col gap-3">
      <span
        className="text-2xl"
        style={{
          color: THEME.text,
          fontFamily: "'Nunito Sans Variable', sans-serif",
        }}
      >
        Codice di {name}
      </span>
      <div className="flex gap-2 items-center w-full h-12 md:h-14">
        <input
          className="w-full h-full rounded-2xl px-4 py-2 flex focus:outline-black"
          style={{
            color: THEME.textSecondary,
            fontFamily: "'Nunito Sans Variable', sans-serif",
            boxShadow: "inset 0px 12px 25px -3px rgba(0, 0, 0, 0.25)",
          }}
          type="text"
          defaultValue={code}
          onChange={(e) => handleContactKey(e.target.value)}
        />
        <button
          className="shrink-0 rounded-2xl min-w-12 min-h-12 md:min-w-14 md:min-h-14 flex items-center justify-center opacity-80 hover:opacity-100 transition-all duration-500 cursor-pointer"
          style={{ backgroundColor: saved? THEME.successful : THEME.button }}
          onClick={handleSaveContactKey}
        >
          <MdOutlineEdit
            size={24}
            className="md:size-7"
            color={saved ? THEME.successfulText : THEME.text}
          />
        </button>
      </div>
    </div>
  )
}

export default ContactShareCode;