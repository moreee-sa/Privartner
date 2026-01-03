import { THEME } from "@/lib/constants";

interface buttonProps {
  actionText: string;
  disableButton: boolean;
  handleClick?: () => void;
}

function CryptoActionButton({ actionText, disableButton, handleClick}: buttonProps ) {
  return (
    <button
      className={`rounded-lg w-full h-16 flex items-center justify-center ${disableButton ? "opacity-50 cursor-not-allowed" : "opacity-80 hover:opacity-100 cursor-pointer"} gap-5  transition-opacity`}
      style={{ backgroundColor: THEME.button }}
      onClick={handleClick}
      disabled={disableButton}
    >
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