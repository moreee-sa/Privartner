import { THEME } from "@/lib/constants";
import { FaLockOpen, FaLock } from "react-icons/fa";
interface buttonProps {
  actionText: string;
  disableButton: boolean;
  handleClick: () => void;
  isDecrypt?: boolean;
}

function CryptoActionButton({ actionText, disableButton, handleClick, isDecrypt }: buttonProps ) {
  return (
    <button
      className={`rounded-2xl w-full h-16 flex items-center justify-center ${disableButton ? "opacity-50 cursor-not-allowed" : "opacity-80 hover:opacity-100 cursor-pointer"} gap-5  transition-opacity`}
      style={{ backgroundColor: THEME.button }}
      onClick={handleClick}
      disabled={disableButton}
    >
      {isDecrypt ? 
        <FaLockOpen size={20} color={THEME.text} /> :
        <FaLock size={20} color={THEME.text} />
      }
      <span
        className="text-base md:text-lg lg:text-xl"
        style={{
          color: THEME.text,
          fontFamily: "'Nunito Sans Variable', sans-serif",
        }}
      >
        {actionText}
      </span>
    </button>
  )
}

export default CryptoActionButton;