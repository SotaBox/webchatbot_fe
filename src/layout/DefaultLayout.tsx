import NavBar from "src/components/navbar";

function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-col h-screen">
      <NavBar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3 bg-slate-900">
        <div className="flex flex-col">
          <p className="font-bold text-white text-center">Footer</p>
          <p className="text-white">
            Beautiful hand-crafted SVG icons, by the makers of Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default DefaultLayout;
