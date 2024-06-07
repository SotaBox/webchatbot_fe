import { Avatar } from "@nextui-org/react";
import { useCallback, useEffect, useRef, useState } from "react";
import Message from "src/types/chatbot/Message";

import { UserRole } from "src/types/chatbot/UserRole";

function ChatBot() {
  const [input, setInput] = useState<string>("");
  const [question, setQuestions] = useState<Message[]>([
    {
      id: "1",
      content: "How are you",
      role: UserRole.USER,
      createdAt: Date().toString(),
    },
    {
      id: "2",
      content: `I am ChatGPT, an artificial intelligence language model
                    developed by OpenAI. I am based on the GPT-4 architecture,
                    designed to understand and generate human-like text. My
                    purpose is to assist with a wide range of tasks, including
                    answering questions, providing information, generating
                    creative content, and more. How can I assist you today?`,
      role: UserRole.BOT,
      createdAt: Date().toString(),
    },
    {
      id: "3",
      content: "How old are you",
      role: UserRole.USER,
      createdAt: Date().toString(),
    },
    {
      id: "4",
      content: `
ChatGPT
I don't have an age like humans do because I'm an artificial intelligence created by OpenAI. I was developed as part of the GPT-4 architecture, which was released in March 2023.`,
      role: UserRole.BOT,
      createdAt: Date().toString(),
    },
  ]);

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

  const generateMessage = () => {
    const words = [
      "The sky",
      "above",
      "the port",
      "was",
      "the color of television",
      "tuned",
      "to",
      "a dead channel",
      ".",
      "All",
      "this happened",
      "more or less",
      ".",
      "I",
      "had",
      "the story",
      "bit by bit",
      "from various people",
      "and",
      "as generally",
      "happens",
      "in such cases",
      "each time",
      "it",
      "was",
      "a different story",
      ".",
      "It",
      "was",
      "a pleasure",
      "to",
      "burn",
    ];
    const text = [];
    let x = 7;
    while (--x) text.push(words[Math.floor(Math.random() * words.length)]);
    return text.join(" ");
  };

  const handleSubmit = () => {
    const newMessageUser: Message = {
      id: Math.random().toString(),
      role: UserRole.USER,
      createdAt: Date().toString(),
      content: input,
    };
    setQuestions((pre) => [...pre, newMessageUser]);
    const newMessageBot: Message = {
      id: Math.random().toString(),
      role: UserRole.BOT,
      createdAt: Date().toString(),
      content: generateMessage(),
    };
    setTimeout(() => {
      setQuestions((prevMsgBot) => [...prevMsgBot, newMessageBot]);
    }, 2000);
    setInput("");
  };

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [question]);

  const isNewListMessage = Boolean(question.length);

  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="p-6 m-4 md:p-14 flex flex-col space-y-6">
          {isNewListMessage ? (
            <div className="flex flex-col space-y-6 h-[500px] max-w-2xl overflow-auto ">
              {question?.map((q) => {
                return (
                  <div className="flex flex-row space-x-4">
                    {q.role === UserRole.USER ? (
                      <Avatar showFallback />
                    ) : (
                      <Avatar name="Chat" />
                    )}
                    <div className="flex flex-col space-y-1">
                      <h3 className="text-left text-black font-medium">
                        {q.role === UserRole.USER ? "You" : "ChatBot"}
                      </h3>
                      <p className="text-black max-w-sm md:max-w-xl">
                        {q.content}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          ) : (
            <div className="relative flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
              <div className="p-4 md:p-12 m-4">
                <div className="flex flex-col space-y-4">
                  <div className="items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-12 h-12 mx-auto"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-black text-3xl font-medium text-center">
                    How can I help you today?
                  </h3>
                </div>
              </div>
            </div>
          )}

          <div className="relative flex flex-row space-x-3 ">
            <button className="absolute bottom-2 left-4 px-3 py-2 border-none shadow-sm hover:shadow-lg hover:-translate-y-1 rounded-xl transaction duration-500 hover:opacity-90">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                />
              </svg>
            </button>
            <input
              type="text"
              placeholder="Enter your question"
              className="w-full px-2 py-3 pl-12 pr-12 rounded-xl focus:outline-none ring-gray-300 focus:ring-gray-500 ring-2 "
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
        </div>
      </div>
    </>
  );
}
export default ChatBot;
