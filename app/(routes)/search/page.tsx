"use client";
import  { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import GameCard from "@/app/components/GameCard";

interface Game {
  id: number;
  name: string;
  released: string;
  background_image: string | null;
  rating: number;
  website?: string;
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams?.q || "";
  
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!query) return;

    const fetchGames = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.rawg.io/api/games?key=f8843485cf0441ee8ce9ada8bf1f3610&search=${query}`
        );
        const data = await res.json();
        setGames(data.results || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [query]);

  return (
    <div className="pt-24  md:pt-6 min-h-screen bg-gradient-to-b from-[#0b1120] to-[#1a1f3a] text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Search Results for: <span className="text-blue-400">{query}</span></h1>

      {loading ? (
        <p className="flex justify-center items-center h-64"><span className="loader"></span></p>
      ) : games.length === 0 ? (
        <p className="text-gray-400">No games found for "{query}".</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {games.map((game) => (
                   <GameCard key={game.id} game={game} />
                 ))}
        </div>
      )}
    </div>
  );
}
