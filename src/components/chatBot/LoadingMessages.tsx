export default function LoadingMessages() {
  return (
    <div className="flex space-y-2 space-x-1 justify-center items-center dark:invert">
      <span className="sr-only">Loading...</span>
      <div className="size-3 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="size-3 bg-gray-300  rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="size-3 bg-gray-300  rounded-full animate-bounce"></div>
    </div>
  );
}
