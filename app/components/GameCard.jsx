"use client";
import Image from "next/image";
import Link from "next/link";
import RatingStars from "./RatingStars";
import placeholder from "../assets/44.jpg";
import AddToFavoritesButton from "./AddToFavoriteBtn";


export default function GameCard({ game }) {
  return (
    <div
      className="group relative bg-[#0f172a] border border-blue-900/40 rounded-2xl overflow-hidden 
                  hover:shadow-[0_0_25px_rgba(56,189,248,0.25)] 
                 transition-all duration-200"
    >
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={game.background_image || placeholder}
          alt={game.name}
          fill
          className="object-cover group-hover:scale-[1.05] transition duration-700"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-transparent to-transparent opacity-90" />

          <AddToFavoritesButton item={game} />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-1">
          {game.name}
        </h3>

        <div className="text-blue-300 text-sm mb-3">
          <RatingStars rating={game.rating} />
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-2 mb-4">
          {game.genres?.slice(0, 2).map(g => (
            <span
              key={g.id}
              className="text-xs bg-blue-900/40 text-blue-300 px-2 py-1 rounded"
            >
              {g.name}
            </span>
          ))}
        </div>

        {/* Fake Price */}
        <div className="flex justify-between items-center">
          <span className="text-white font-bold">$59.99</span>

          <Link href={`/games/${game.id}`} className="opacity-100 bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-lg transition">
            View Game
          </Link>
        </div>
      </div>
    </div>
  );
}
