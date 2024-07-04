import { createContext, useContext, useState } from "react";
import EmptyMessages from "src/components/chatBot/EmptyMessages";
import MessageInput from "src/components/chatBot/MessageInput";
import Messages from "src/components/chatBot/Messages";
import { useAppSelector } from "src/store";
export const LoadingContext = createContext({
  loading: false,
  setLoading: (loading: boolean) => {},
});
function ChatBot() {
  const messages = useAppSelector((state) => state.message);
  console.log("messages", messages);
  const isNewListMessage = Boolean(messages.length);
  const [loading, setLoading] = useState(false);
  return (
    <>
      <section className="md:my-4 ">
        <div className="mx-auto flex-1 md:max-w-[63rem] md:h-[37rem] bg-white">
          <LoadingContext.Provider value={{ loading, setLoading }}>
            {isNewListMessage ? (
              <Messages messages={messages} />
            ) : (
              <EmptyMessages />
            )}
            <MessageInput />
          </LoadingContext.Provider>
        </div>
      </section>
    </>
  );
}
export default ChatBot;
