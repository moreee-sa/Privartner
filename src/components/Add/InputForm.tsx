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
    <>
      <span
        className="text-xl"
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
          style={{ color: THEME.text }}
          className="border-none outline-none text-xl w-full h-14"
        />
        {qrcode &&
          <div className="bg-[#fca311] flex items-center justify-center h-full p-2 rounded-lg">
            <MdOutlineQrCodeScanner color={THEME.textSecondary} size={35} />
          </div>
        }
      </div>
    </>
  )
}

export default InputForm;