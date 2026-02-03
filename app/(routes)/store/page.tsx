"use client";
import { useEffect, useState } from "react";
import GameCard from "../../components/GameCard";
import { FaFilter } from "react-icons/fa";
import Image from "next/image";
import gameImage from "../../assets/collec.jpeg";
import Snowfall from "react-snowfall";
import RDR2 from "../../components/RDR2";
import { Toaster } from "react-hot-toast";
import HeartLine from "@/app/components/HeartLine";
type Game = {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  genres: { id: number; name: string }[];
};

export default function StorePage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.rawg.io/api/games?key=f8843485cf0441ee8ce9ada8bf1f3610&limit=0")
      .then(res => res.json())
      .then((data: { results: Game[] }) => setGames(data.results || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loader"></span>
      </div>
    );

  return (
    <div className="p-3 pt-6 space-y-12">
      <Toaster position="top-right" reverseOrder={false} />
      {/* Hero */}
     <div className="relative overflow-hidden rounded-3xl border border-blue-900/40 bg-gradient-to-br from-[#0b1120] via-[#0f172a] to-[#0b1120] p-10 md:p-14">
<Snowfall
  color="rgba(59, 130, 246, 0.5)"
  snowflakeCount={100}
  enable3DRotation={true}
  style={{ position: 'absolute', width: '100%', height: '100%' }}
  
/>
<HeartLine />
  {/* Glow Effects */}
  <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-600/20 blur-3xl rounded-full animate-pulse" />
  <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full animate-pulse" />

  <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between gap-6">

    {/* TEXT SIDE */}
    <div className="max-w-2xl space-y-6">
      <span className="inline-block bg-blue-500/10 text-blue-400 px-4 py-1 rounded-full text-xs font-semibold tracking-wider border border-blue-500/20">
        NEXT LEVEL GAMING
      </span>

      <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
        Discover Your <span className="text-blue-400">Next Adventure</span>
      </h1>

      <p className="text-blue-200 text-lg">
        Explore trending hits, top-rated masterpieces, and hidden indie gems.
        Your ultimate gaming library starts here.
      </p>

      <div className="flex flex-wrap gap-4 pt-4">
        <button className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-7 py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/20 transition">
          Browse Games
        </button>

        <button className="cursor-pointer bg-white/5 hover:bg-white/10 border border-white/10 text-white px-7 py-3 rounded-xl font-semibold backdrop-blur-md transition">
          View Top Rated
        </button>
      </div>
    </div>

    {/* IMAGE SIDE */}
    <div className="hidden md:flex relative w-[420px] h-[400px]">
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-2xl blur-2xl" />
      <div className="relative w-full h-full rounded-2xl border border-blue-900/40 bg-cover bg-center opacity-80" />
      <Image
        src={gameImage}
        alt="Gaming Hero"
        width={420}
        height={300}
        className="w-full h-full object-cover rounded-2xl drop-shadow-sm drop-shadow-blue-400"
      />
    </div>

  </div>
</div>


      {/* Filter */}
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-[#0f172a] border border-blue-900/40 rounded-xl p-4">
        <FaFilter className="text-blue-400 absolute top-2 left-2" />
        <select className="bg-[#0b1120] text-white px-4 py-2 rounded-lg border border-blue-900/40 w-full">
          <option>All Genres</option>
          <option>Action</option>
          <option>RPG</option>
          <option>Shooter</option>
        </select>

        <select className="bg-[#0b1120] text-white px-4 py-2 rounded-lg border border-blue-900/40">
          <option>All Platforms</option>
          <option>PC</option>
          <option>PlayStation</option>
          <option>Xbox</option>
        </select>

        <select className="bg-[#0b1120] text-white px-4 py-2 rounded-lg border border-blue-900/40">
          <option>Sort By</option>
          <option>Top Rated</option>
          <option>Newest</option>
          <option>Popular</option>
        </select>
      </div>

      {/* Games */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
      <RDR2 />
    </div>
  );
}
