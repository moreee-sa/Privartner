import { THEME } from "@/lib/constants";
import { useState, useRef } from "react";

interface MessageProps {
  maxBytes: boolean;
  placeholder: string;
  text: string;
  byteLength: number;
  handleMessageLength: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function MessageInput({ maxBytes, placeholder, text, byteLength, handleMessageLength }: MessageProps) {
  const MAX_RSA_OAEP_BYTES = 400;
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [focused, setFocused] = useState(false);

  function focusTextArea() {
    textAreaRef.current?.focus();
    setFocused(true);
  }

  return (
    <div
      className={`outline  rounded-lg ${focused ? "outline-[#969593]" : "outline-[#323031]"} transition-all p-5 w-full`}
      onClick={focusTextArea}
      onMouseLeave={() => setFocused(false)}
    >
      <textarea
        className="outline-none transition-all w-full resize-none field-sizing-content"
        style={{
          color: maxBytes ? "#FF2C2C" : THEME.text,
          fontFamily: "'Nunito Sans Variable', sans-serif",
        }}
        placeholder={placeholder}
        value={text}
        onChange={(e) => handleMessageLength(e)}
        ref={textAreaRef}
      />
      <div className="flex justify-end">
        <span
          className="transition-colors"
          style={{ color: maxBytes ? "#FF2C2C" : THEME.text, fontFamily: "'Nunito Sans Variable', sans-serif", }}
        >
          {byteLength}/{MAX_RSA_OAEP_BYTES} bytes
        </span>
      </div>
    </div>
  )
}

export default MessageInput;