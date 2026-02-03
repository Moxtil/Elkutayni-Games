"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaStar, FaFire, FaArrowRight } from "react-icons/fa";
import Image from "next/image";

export default function RDR2() {
  const [game, setGame] = useState(null);

  useEffect(() => {
    fetch("https://api.rawg.io/api/games/28?key=f8843485cf0441ee8ce9ada8bf1f3610")
      .then(res => res.json())
      .then(data => setGame(data));
  }, []);

  if (!game) return null;

  return (
    <section className="relative w-full overflow-hidden rounded-3xl border border-blue-900/40 mb-16">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
    
      >
        <Image src={game.background_image} alt={game.name} fill className="object-cover" />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b1120] via-[#0b1120]/90 to-transparent" />

      {/* Glow Effects */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full animate-pulse" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-cyan-400/20 blur-3xl rounded-full animate-pulse" />

      {/* Content */}
      <div className="relative z-10 p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-10 min-h-[420px]">

        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl space-y-6"
        >
          <span className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-1 rounded-full text-xs font-semibold border border-blue-500/20">
            <FaFire /> FEATURED GAME
          </span>

          <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            {game.name}
          </h2>

          <p className="text-blue-200 text-lg line-clamp-3">
            {game.description_raw?.slice(0, 160)}...
          </p>

          <div className="flex items-center gap-6 text-blue-300 text-sm">
            <span className="flex items-center gap-2">
              <FaStar className="text-yellow-400" /> {game.rating}
            </span>
            <span>{game.released}</span>
          </div>

          <Link
            href="/games/28"
            className="inline-flex items-center gap-3 mt-4 bg-blue-500 hover:bg-blue-600 text-white px-7 py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition cursor-pointer"
          >
            View Game <FaArrowRight />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden md:block"
        >
         
        </motion.div>
      </div>
    </section>
  );
}
