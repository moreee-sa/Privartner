import { THEME } from "@/lib/constants";

interface buttonProps {
  actionText: string;
  handleClick?: () => void;
}

function CryptoActionButton({ actionText, handleClick}: buttonProps ) {
  return (
    <button
      className="rounded-lg w-full h-16 flex items-center justify-center gap-5 opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
      style={{ backgroundColor: THEME.button }}
      onClick={handleClick}
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