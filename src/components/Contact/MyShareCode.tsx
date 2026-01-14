import { useState } from "react";
import { THEME } from "@/lib/constants";
import { CiShare1 } from "react-icons/ci";

interface ShareCodeProps {
  code: string;
}

function MyShareCode({ code }: ShareCodeProps) {
  const [copied, setCopied] = useState(false);

  async function ShareCode() {
    try {
      const url = `https://privartner.netlify.app/#/add?key=${code}`;
      const type = "text/plain";
      const clipboardItemData = {
        [type]: url,
      };
      const clipboardItem = new ClipboardItem(clipboardItemData);
      await navigator.clipboard.write([clipboardItem]);
      
      const shareUrl = {
        title: "Privartner",
        text: "Privartner",
        url: url,
      };
      await navigator.share(shareUrl);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    } catch (error) {
      console.error("Errore durante la copia:", error);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <span
        className="text-2xl"
        style={{
          color: THEME.text,
          fontFamily: "'Nunito Sans Variable', sans-serif",
        }}
      >
        Il mio codice
      </span>
      <div className="flex gap-2 items-center w-full h-12 md:h-14">
        <input
          className="w-full h-full rounded-2xl px-4 py-2 flex"
          style={{
            color: THEME.textSecondary,
            fontFamily: "'Nunito Sans Variable', sans-serif",
            boxShadow: "inset 0px 12px 25px -3px rgba(0, 0, 0, 0.25)",
          }}
          type="text"
          defaultValue={code}
          disabled
        />
        <button
          className="shrink-0 rounded-lg min-w-12 min-h-12 md:min-w-14 md:min-h-14 flex items-center justify-center opacity-80 hover:opacity-100 transition-all duration-500 cursor-pointer"
          style={{ backgroundColor: copied ? THEME.successful : THEME.button }}
          onClick={ShareCode}
        >
          <CiShare1
            size={26}
            className="md:size-7 transition-colors"
            color={copied ? THEME.successfulText : THEME.text}
          />
        </button>
      </div>
    </div>
  )
}

export default MyShareCode;