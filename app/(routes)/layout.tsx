import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export const metadata: Metadata = {
  title: "GameHub",
  description: "Gaming Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#0b1120] text-white">

      {/*  DESKTOP SIDEBAR  */}
      <aside className="hidden md:flex md:w-64 md:fixed md:left-0 md:top-0 md:h-screen z-50">
        <Navbar />
      </aside>

      {/*  PAGE WRAPPER  */}
      <div className="flex flex-col md:ml-64 min-h-screen">

        {/*  MOBILE NAVBAR  */}
        <div className="md:hidden fixed top-0 left-0 w-full z-50">
          <Navbar />
        </div>

        {/*  MAIN CONTENT  */}
        <main className="flex-1 w-full pt-36 md:pt-6 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
          {children}
        </main>
        
      <Footer />
      </div>
    </div>
  );
}
