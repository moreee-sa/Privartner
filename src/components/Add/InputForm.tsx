import { THEME } from "@/lib/constants";
import { MdOutlineQrCodeScanner } from "react-icons/md";

interface InputProps {
  title: string;
  nameInput: string;
  valueInput: string;
  placeholderInput: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  qrcode?: boolean;
  required?: boolean;
}

function InputForm({ title, nameInput, valueInput, placeholderInput, onChange, qrcode, required = false }: InputProps) {
  return (
    <div>
      <span
        className="text-base md:text-lg lg:text-xl"
        style={{
          color: THEME.text,
          fontFamily: "'Nunito Sans Variable', sans-serif",
        }}
      >
        {title}
      </span>
      <div className="flex w-full items-center">
        <input
          type="text"
          name={nameInput}
          value={valueInput}
          onChange={onChange}
          required={required}
          placeholder={placeholderInput}
          style={{
            color: THEME.textSecondary,
            fontFamily: "'Nunito Sans Variable', sans-serif",
          }}
          className="border-none outline-none w-full h-14 text-base md:text-lg lg:text-xl"
        />
        {qrcode &&
          <div className="bg-[#323031] flex items-center justify-center h-full p-2 rounded-lg opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
            <MdOutlineQrCodeScanner color={THEME.textSecondary} size={35} />
          </div>
        }
      </div>
    </div>
  )
}

export default InputForm;