interface IProps {
  modalCreate: {
    onOpen: () => void;
  };
}
export default function HeaderTableCrawlData({ modalCreate }: IProps) {
  return (
    <div className="flex flex-row space-x-6 items-center justify-between">
      <div className="text-3xl font-bold">Table Crawl Data</div>
      <button
        onClick={modalCreate.onOpen}
        className="flex flex-row space-x-2 bg-sky-600 p-2 px-5 rounded-xl hover:opacity-90 hover:shadow-lg shadow-sm transition duration-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
            clipRule="evenodd"
          />
        </svg>
        <div className="text-white font-bold">Create New URL</div>
      </button>
    </div>
  );
}
