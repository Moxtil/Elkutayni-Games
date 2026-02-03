"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GiAk47 } from "react-icons/gi";
import Image from "next/image";
import placeholder from "../assets/44.jpg";
import RatingStars from "./RatingStars";

export default function PopularWeek() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch(
          "https://api.rawg.io/api/games?key=f8843485cf0441ee8ce9ada8bf1f3610&genres=shooter&page_size=8"
        );
        const data = await res.json();
        setGames(data.results || []);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  return (
    <section className="mb-24 px-6 md:px-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <GiAk47 size={34} className="text-yellow-400" />
        <h2 className="text-3xl font-bold text-white">Top Shooter Games</h2>
      </div>

      {/* Error */}
      {error && (
        <div className="text-red-400 text-center py-10">
          Failed to load games. Try again later.
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-56 rounded-xl bg-slate-800 animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Games */}
      {!loading && !error && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game) => (
            <Link
              href={`/games/${game.id}`}
              key={game.id}
              className="group relative bg-[#0f172a] border border-blue-900/40 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-900/40"
            >
              {/* Image */}
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={game.background_image || placeholder}
                  alt={game.name}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="text-white font-semibold text-lg line-clamp-1 mb-2">
                  {game.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 text-yellow-400 text-sm mb-3">
                  <RatingStars rating={game?.rating || 0} />
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-2">
                  {game.genres?.slice(0, 2).map((g) => (
                    <span
                      key={g.id}
                      className="text-xs bg-blue-900/40 text-blue-300 px-2 py-1 rounded"
                    >
                      {g.name}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
