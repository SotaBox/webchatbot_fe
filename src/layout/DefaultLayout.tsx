import NavBar from "src/components/Navbar";

function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col w-full sm:flex-1">
        <NavBar />
        <div>{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
