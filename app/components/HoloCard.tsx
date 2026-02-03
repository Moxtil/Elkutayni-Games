import Image from "next/image";
import Link from "next/link";
import {  FaStar } from "react-icons/fa";
import AddToFavoriteBtn from "./AddToFavoriteBtn";

type Game = {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  genres: { id: number; name: string }[];
};

export default function HoloCard({ game }: { game: Game }) {
  return (
    <div className="group relative rounded-3xl overflow-hidden bg-[#0f172a] border border-blue-900/40 hover:scale-[1.02] transition duration-500">

      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-cyan-400/10 to-purple-500/20 opacity-0 group-hover:opacity-100 transition duration-500 blur-2xl" />

      <div className="relative h-64 overflow-hidden">
        <Image
        width={300}
        height={200}
        alt="wishlist game"
          src={game.background_image}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />

        <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md rounded-full w-12 h-12 flex items-center justify-center border border-yellow-400">
          <span className="text-yellow-400 font-bold text-sm flex items-center gap-1">
            <FaStar /> {game.rating}
          </span>
        </div>

        <AddToFavoriteBtn item={game} />
      </div>

      <div className="p-6 space-y-3 relative z-10">
        <h3 className="text-white text-xl font-bold line-clamp-1">
          {game.name}
        </h3>

        <div className="flex flex-wrap gap-2">
          {game.genres?.slice(0, 2).map((g) => (
            <span
              key={g.id}
              className="text-xs bg-blue-900/40 text-blue-300 px-3 py-1 rounded-full"
            >
              {g.name}
            </span>
          ))}
        </div>

        <Link
          href={`/games/${game.id}`}
          className="block text-center bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-white py-2 rounded-xl font-semibold mt-4 transition"
        >
          View Game
        </Link>
      </div>

      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-cyan-400 to-blue-600 opacity-70" />
    </div>
  );
}
