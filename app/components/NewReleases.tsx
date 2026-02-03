"use client";
import { useEffect, useState } from "react";
import RatingStars from "./RatingStars";
import Image from "next/image";
import placeholder from "../assets/44.jpg";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaFireAlt } from "react-icons/fa";

export default function NewReleases() {
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewGames = async () => {
      try {
        const res = await fetch(
          "https://api.rawg.io/api/games?key=f8843485cf0441ee8ce9ada8bf1f3610&ordering=-rating&page_size=20"
        );
        const data = await res.json();
        setGames(data.results);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNewGames();
  }, []);

  if (loading)
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-10">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-72 rounded-2xl bg-blue-900/30 animate-pulse"
          />
        ))}
      </div>
    );

  return (
    <section className="px-3 md:px-2 mb-24">

      {/* Header */}
      <div className="flex items-end justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            New Releases
          </h1>
          <p className="text-blue-300">
            Fresh games just dropped. Stay ahead.
          </p>
        </div>
        <span className="text-blue-400 text-sm bg-blue-900/40 px-4 py-1 rounded-full">
          {games.length}+ Games
        </span>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {games.map((game, i) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              href={`/games/${game.id}`}
              className="group relative block rounded-2xl overflow-hidden border border-blue-900/40 bg-[#0b1120]/70 backdrop-blur-lg hover:border-cyan-400/40 transition"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={game.background_image || placeholder}
                  alt={game.name}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-700"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-transparent to-transparent" />

                {/* Badge */}
                {i < 4 && (
                  <span className="absolute top-3 left-3 flex items-center gap-1 text-xs bg-red-500/90 text-white px-2 py-1 rounded-full">
                    <FaFireAlt /> HOT
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-white font-semibold text-lg mb-1 line-clamp-1 group-hover:text-cyan-300 transition">
                  {game.name}
                </h3>

                <div className="text-blue-300 text-sm mb-3">
                  <RatingStars rating={game.rating} />
                </div>

                <div className="flex flex-wrap gap-2">
                  {game.genres.slice(0, 2).map((g: any) => (
                    <span
                      key={g.id}
                      className="text-xs bg-blue-900/40 text-blue-300 px-2 py-1 rounded"
                    >
                      {g.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-cyan-500/10 blur-2xl transition" />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
