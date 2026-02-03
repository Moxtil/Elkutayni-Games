"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaStar, FaFire, FaGamepad } from "react-icons/fa";

export default function SpotLight() {
  const [game, setGame] = useState(null);

  useEffect(() => {
    fetch("https://api.rawg.io/api/games/3939?key=f8843485cf0441ee8ce9ada8bf1f3610")
      .then((res) => res.json())
      .then((data) => setGame(data));
  }, []);

  if (!game) return null;

  return (
    <section className="relative w-full p-2 flex items-center justify-left min-h-[720px] overflow-hidden rounded-3xl">
      
      {/* Background */}
      <Image
        src={game.background_image}
        alt={game.name}
        fill
        className="object-cover scale-110 animate-slowZoom"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f2c]/95 via-[#0a0f2c]/80 to-transparent" />

      {/* Glass Panel */}
      <div className="relative z-10 h-full flex items-center px-8">
        <div className=" bg-white/5 border border-white/10 p-6 rounded-3xl max-w-3xl shadow-2xl">

          <div className="flex items-center gap-2 text-orange-400 font-semibold mb-4">
            <FaFire /> Trending Now
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4">
            {game.name}
          </h1>

          {/* Description */}
          <p className="text-blue-200/80 line-clamp-3 mb-6">
            {game.description_raw}
          </p>

          {/* Stats */}
          <div className="grid sm:grid-cols-3 gap-6 mb-8">

            <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
              <FaStar className="mx-auto text-yellow-400 text-2xl mb-2" />
              <p className="text-white text-xl font-bold">{game.rating}</p>
              <p className="text-blue-300 text-sm">Rating</p>
            </div>

            <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
              <FaGamepad className="mx-auto text-cyan-400 text-2xl mb-2" />
              <p className="text-white text-xl font-bold">{game.playtime}h</p>
              <p className="text-blue-300 text-sm">Avg Playtime</p>
            </div>

            <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
              <p className="text-white text-xl font-bold">{game.reviews_count}</p>
              <p className="text-blue-300 text-sm">Reviews</p>
            </div>

          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {game.tags.slice(0, 6).map((tag) => (
              <span
                key={tag.id}
                className="px-3 py-1 text-xs bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-200 backdrop-blur-md hover:scale-105 transition"
              >
                {tag.name}
              </span>
            ))}
          </div>

          {/* CTA */}
          <Link
            href={`/games/${game.id}`}
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition"
          >
            View Game Details
          </Link>
        </div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-blue-600/30 blur-[140px] rounded-full" />
    </section>
  );
}
