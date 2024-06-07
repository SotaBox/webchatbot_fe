import Footer from "src/components/Footer";
import NavBar from "src/components/navbar";

function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-col h-screen">
      <NavBar />
      <main className="flex items-center justify-center min-h-screen ">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
