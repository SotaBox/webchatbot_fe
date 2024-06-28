import EmptyMessages from "src/components/chatBot/EmptyMessages";
import MessageInput from "src/components/chatBot/MessageInput";
import Messages from "src/components/chatBot/Messages";
import { useAppSelector } from "src/store";

function ChatBot() {
  const messages = useAppSelector((state) => state.message);
  const isNewListMessage = Boolean(messages.length);
  return (
    <>
      <section>
        <div className=" max-w-8xl mx-auto">
          <div className="p-6 m-6 flex flex-col space-y-6 bg-white">
            {isNewListMessage ? (
              <Messages messages={messages} />
            ) : (
              <EmptyMessages />
            )}
            <MessageInput />
          </div>
        </div>
      </section>
    </>
  );
}
export default ChatBot;
