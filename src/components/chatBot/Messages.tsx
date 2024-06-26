import { Avatar } from "@nextui-org/react";
import { useEffect, useRef } from "react";
import Message from "src/types/chatbot/Message";
import { UserRole } from "src/types/chatbot/UserRole";
interface IProps {
  messages: Message[];
}
export default function Messages({ messages }: IProps) {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col space-y-6 max-w-6xl">
      {messages?.map((mess, index) => {
        return (
          <>
            {mess.role === UserRole.USER ? (
              <div
                key={index}
                className="flex flex-row justify-end space-x-4 mt-4"
              >
                <div className="flex flex-col space-y-1 rounded-lg shadow-md p-2">
                  <p className="text-black max-w-sm md:max-w-xl">
                    {mess.content}
                  </p>
                </div>
              </div>
            ) : (
              <div key={index} className="flex flex-row space-x-4">
                <Avatar
                  icon={
                    <Avatar
                      icon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                          />
                        </svg>
                      }
                      className="shadow-md"
                      classNames={{
                        base: "bg-gradient-to-br from-[#0369a1] to-[#082f49]",
                        icon: "text-white/80",
                      }}
                    />
                  }
                  className="shadow-md flex"
                  classNames={{
                    base: "bg-gradient-to-br from-[#71717A] to-[#27272A]",
                    icon: "text-white/80",
                  }}
                />
                <div className="flex flex-col space-y-1 rounded-lg shadow-md p-2 bg-sky-800">
                  <p className="text-white max-w-sm md:max-w-xl">
                    {mess.content}
                  </p>
                </div>
              </div>
            )}
          </>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}
