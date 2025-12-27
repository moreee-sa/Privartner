import { THEME } from "@/lib/constants";
import { MdOutlineQrCodeScanner } from "react-icons/md";

interface InputProps {
  title: string;
  nameInput: string;
  valueInput: string;
  placeholderInput: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  qrcode?: boolean;
}

function InputForm({ title, nameInput, valueInput, placeholderInput, onChange, qrcode }: InputProps) {
  return (
    <div>
      <span
        className="text-base md:text-lg lg:text-xl"
        style={{ color: THEME.text }}
      >
        {title}
      </span>
      <div className="flex w-full items-center">
        <input
          type="text"
          name={nameInput}
          value={valueInput}
          onChange={onChange}
          required
          placeholder={placeholderInput}
          style={{ color: THEME.textSecondary }}
          className="border-none outline-none w-full h-14 text-base md:text-lg lg:text-xl"
        />
        {qrcode &&
          <div className="bg-[#323031] flex items-center justify-center h-full p-2 rounded-lg">
            <MdOutlineQrCodeScanner color={THEME.textSecondary} size={35} />
          </div>
        }
      </div>
    </div>
  )
}

export default InputForm;