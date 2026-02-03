"use client";
import { FaGamepad, FaDiscord, FaGithub, FaTwitter } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-sky-900/40 bg-[#0b1120] text-white">
      {/* Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-sky-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-14 grid md:grid-cols-4 gap-10">
        
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xl font-bold">
            <FaGamepad className="text-sky-400 text-2xl" />
            <span className="tracking-wide">GameVerse</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Discover top-rated games, explore new worlds, and stay ahead in the gaming universe.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-sky-400 font-semibold mb-4">Explore</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><Link href="/" className="hover:text-sky-400 transition">Home</Link></li>
            <li><Link href="/games" className="hover:text-sky-400 transition">Games</Link></li>
            <li><Link href="/categories" className="hover:text-sky-400 transition">Categories</Link></li>
            <li><Link href="/search" className="hover:text-sky-400 transition">Search</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sky-400 font-semibold mb-4">Account</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><Link href="/profile" className="hover:text-sky-400 transition">Profile</Link></li>
            <li><Link href="/wishlist" className="hover:text-sky-400 transition">Wishlist</Link></li>
            <li><Link href="/dashboard" className="hover:text-sky-400 transition">Dashboard</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-sky-400 font-semibold mb-4">Community</h3>
          <div className="flex gap-4 text-xl">
            <Link href={"https://discord.com"} className="bg-white/5 p-3 rounded-xl hover:bg-sky-500/20 hover:text-sky-400 transition border border-white/10">
              <FaDiscord />
            </Link>
            <Link href={"https://x.com"} className="bg-white/5 p-3 rounded-xl hover:bg-sky-500/20 hover:text-sky-400 transition border border-white/10">
              <FaTwitter />
            </Link>
            <Link href={"https://github.com"} className="bg-white/5 p-3 rounded-xl hover:bg-sky-500/20 hover:text-sky-400 transition border border-white/10">
              <FaGithub />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-sky-900/40 text-center text-gray-500 text-sm py-6">
        © {new Date().getFullYear()} GameVerse. All rights reserved.
      </div>
    </footer>
  );
}
