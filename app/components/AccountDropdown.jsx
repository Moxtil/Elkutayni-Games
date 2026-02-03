"use client";
import Link from "next/link";
import { useState } from "react";
import { FaSignInAlt, FaUserPlus, FaUserCircle } from "react-icons/fa";

export default function AccountDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative md:w-full">
      <button
        onClick={() => setOpen(!open)}
        className="md:w-full md:px-4 md:py-2 rounded-lg cursor-pointer flex flex-col md:flex-row md:space-x-2 items-center justify-center md:justify-start
     
        hover:bg-blue-700/30 hover:text-blue-400 transition-all duration-200 shadow-lg"
      >
        <FaUserCircle className="text-white text-lg"  size={20}/>
        <span>Account</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute right-0 mt-3 w-40 origin-top-right rounded-xl
          bg-[#0b1120]/95 backdrop-blur-md border border-blue-800/40
          shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-200"
        >
          <p className="text-xs text-blue-400 px-3 py-1 uppercase tracking-wider">
            Account
          </p>

          <Link href={`/sign-in`}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg
            text-white hover:bg-blue-700/60 transition"
          >
            <FaSignInAlt className="text-blue-400" />
            Log In
          </Link>

          <Link href={`/sign-up`}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg
            text-white hover:bg-blue-700/60 transition"
          >
            <FaUserPlus className="text-blue-400" />
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
}
