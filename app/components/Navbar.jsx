"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaSearch, FaGamepad, FaHome, FaStore, FaFire, FaHeart, FaBook, FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { UserButton, useUser } from "@clerk/nextjs";
import AccountDropdown from "./AccountDropdown";
export default function Navbar() {
  const {user} = useUser();
    const path = usePathname()
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()){
        toast.error("Search input is currently empty.");
    } else {

        router.push(`/search?q=${encodeURIComponent(query)}`);
    }

    setQuery("");
  };

  const navLink =
    "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-700/30 hover:text-blue-400 transition-all duration-200 cursor-pointer";

  return (
    <>
        <Toaster position="top-right" reverseOrder={false} />
    
      {/*  SIDEBAR */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 bg-[#0b1120] border-r border-blue-900/40 p-6 flex-col justify-between text-white shadow-xl">
        <div>
          <div className="flex items-center gap-3 text-2xl font-bold mb-8">
            <FaGamepad className="text-blue-400" />
            GameHub
          </div>

          <form onSubmit={handleSearch} className="relative mb-8">
            <input
              type="text"
              placeholder="Search games..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-[#111827] border border-blue-900/40 rounded-lg py-2 pl-10 pr-3 text-sm focus:outline-none focus:border-blue-500"
            />
            
            <FaSearch className="cursor-pointer absolute left-3 top-2.5 text-blue-400 text-sm" />
          </form>

          <nav className="flex flex-col gap-3 text-sm">
            <Link href="/feed" className={`${navLink} ${path === '/feed' ? 'bg-blue-700/30 text-blue-400' : ''}`}>
              <FaHome /> Home
            </Link>
            <Link href="/store" className={`${navLink} ${path === '/store' ? 'bg-blue-700/30 text-blue-400' : ''}`}>
              <FaStore /> Store
            </Link>
            <Link href="/trending" className={`${navLink} ${path === '/trending' ? 'bg-blue-700/30 text-blue-400' : ''}`}>
              <FaFire /> Trending
            </Link>
           

<Link href="/wishlist" className={`${navLink} ${path === '/wishlist' ? 'bg-blue-700/30 text-blue-400' : ''}`}>
  <FaHeart /> Wishlist
</Link>


  {!user && (

            <AccountDropdown />
          )}
          <div className="ml-4">
            <UserButton
            afterSignOutUrl="/feed"
            appearance={{
              elements: {
                userButtonPopoverCard: "shadow-lg border border-gray-200",
                userButtonAvatarBox: "ring-2 ring-indigo-500 w-[50px] h-[50px]",
              },
            }}
          />
          </div>
          </nav>
        </div>

        <div className="text-xs text-blue-400/60">© GameHub</div>
      </aside>

      {/*  MOBILE NAVBAR */}
      <header className="md:hidden fixed top-0 left-0 w-full bg-[#0b1120] border-b border-blue-900/40 px-4 py-3 flex flex-col gap-3 z-50 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-lg text-white">
            <FaGamepad className="text-blue-400" />
            GameHub
          </div>
        </div>

        <form onSubmit={handleSearch} className="relative w-full">
          <input
            type="text"
            placeholder="Search games..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-[#111827] border border-blue-900/40 rounded-lg py-2 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-blue-500"
          />
          <FaSearch className="absolute left-3 top-2.5 text-blue-400 text-sm" onClick={handleSearch} />
        </form>

        <nav className="flex justify-center items-center gap-6 text-sm text-white pt-1">
          <Link href="/feed" className={`flex flex-col items-center gap-1 cursor-pointer hover:text-blue-400 transition ${path === '/feed' ? 'text-blue-400' : ''}`}>
            <FaHome size={17}/> Home
          </Link>
          <Link href="/store" className={`flex flex-col items-center gap-1 cursor-pointer hover:text-blue-400 transition ${path === '/store' ? 'text-blue-400' : ''}`}>
            <FaStore size={17} /> Store
          </Link>
          <Link href="/trending" className={`flex flex-col items-center gap-1 cursor-pointer hover:text-blue-400 transition ${path === '/trending' ? 'text-blue-400' : ''}`}>
            <FaFire size={17} /> Trending
          </Link>


<Link href="/wishlist" className={`flex flex-col items-center gap-1 cursor-pointer hover:text-blue-400 transition ${path === '/wishlist' ? 'text-blue-400' : ''}`}>
  <FaHeart size={17} /> Wishlist
</Link>
  {!user && (
           <AccountDropdown />
          )}
          <div className="ml-4">
            <UserButton
            afterSignOutUrl="/feed"
            appearance={{
              elements: {
                userButtonPopoverCard: "shadow-lg border border-gray-200",
                userButtonAvatarBox: "ring-2 ring-indigo-500 w-[50px] h-[50px]",
              },
            }}
          />
          </div>


        </nav>
      </header>
    </>
  );
}
