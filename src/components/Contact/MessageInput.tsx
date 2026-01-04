import { THEME } from "@/lib/constants";

interface MessageProps {
  maxBytes: boolean;
  placeholder: string;
  text: string;
  byteLength: number;
  handleMessageLength: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function MessageInput({ maxBytes, placeholder, text, byteLength, handleMessageLength }: MessageProps) {
  const MAX_RSA_OAEP_BYTES = 400;

  return (
    <>
      <textarea
        className="outline outline-[#323031] rounded-lg focus:outline-[#969593] transition-all p-5 w-full resize-none field-sizing-content"
        style={{
          color: maxBytes ? "#FF2C2C" : THEME.text,
          fontFamily: "'Nunito Sans Variable', sans-serif",
        }}
        placeholder={placeholder}
        value={text}
        onChange={(e) => handleMessageLength(e)}
      />
      <div className="flex justify-end">
        <span
          className="transition-colors"
          style={{ color: maxBytes ? "#FF2C2C" : THEME.text, fontFamily: "'Nunito Sans Variable', sans-serif", }}
        >
          {byteLength}/{MAX_RSA_OAEP_BYTES} bytes
        </span>
      </div>
    </>
  )
}

export default MessageInput;