import Header from "src/components/Header";
import NavBar from "src/components/navbar";

function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <NavBar />
      <div className="flex flex-col w-full">
        <Header />
        <div>{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
