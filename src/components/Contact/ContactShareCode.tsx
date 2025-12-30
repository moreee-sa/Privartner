import { THEME } from "@/lib/constants";
import { MdOutlineEdit } from "react-icons/md";

interface ShareCodeProps {
  name: string | undefined;
  code: string;
}

function ContactShareCode({ name, code }: ShareCodeProps) {
  return (
    <div className="flex flex-col">
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
          className="w-full h-full rounded-md px-4 py-2 flex"
          style={{
            color: THEME.text,
            fontFamily: "'Nunito Sans Variable', sans-serif",
            boxShadow: "inset 0px 12px 25px -3px rgba(0, 0, 0, 0.25)",
          }}
          type="text"
          defaultValue={code}
          disabled
        />
        <button
          className="shrink-0 rounded-lg min-w-12 min-h-12 md:min-w-14 md:min-h-14 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
          style={{ backgroundColor: THEME.button }}
        >
          <MdOutlineEdit
            size={24}
            className="md:size-7"
            color={THEME.text}
          />
        </button>
      </div>
    </div>
  )
}

export default ContactShareCode;