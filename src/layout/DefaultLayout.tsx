import NavBar from "src/components/navbar";

function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <NavBar />
      <main className="">{children}</main>
    </div>
  );
}

export default DefaultLayout;
