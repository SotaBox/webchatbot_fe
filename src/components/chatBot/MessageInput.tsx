import { useCallback, useState } from "react";
import { ReduxMessages } from "src/store/messages/reduxMessages";

export default function MessageInput() {
  const [input, setInput] = useState<string>("");
  const checkEmpty = useCallback(
    (input: string | undefined): boolean | void => {
      if (input === "") {
        return true;
      } else {
        return false;
      }
    },
    []
  );
  const handleSubmit = () => {
    ReduxMessages.createMessageUser(input);
    setTimeout(() => {
      ReduxMessages.createMessageBot();
    }, 2000);
    setInput("");
  };
  return (
    <div className="relative flex flex-row space-x-3">
      <input
        type="text"
        placeholder="Enter your question"
        className="w-full px-2 py-3 pl-4 pr-12 rounded-xl focus:outline-none ring-gray-300 focus:ring-gray-500 ring-2 "
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit();
        }}
      />

      {checkEmpty(input) ? (
        <button className="px-2 py-2 rounded-lg bg-slate-200 absolute right-2 top-2 cursor-not-allowed">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
            />
          </svg>
        </button>
      ) : (
        <button
          className="px-2 py-2 rounded-lg bg-slate-700 absolute right-2 top-2 shadow-sm hover:shadow-lg hover:opacity-90 hover:-translate-y-1 transaction duration-500"
          onClick={() => handleSubmit()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
