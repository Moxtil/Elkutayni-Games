"use client";
import { useEffect, useState } from "react";
import RatingStars from "./RatingStars";
import Link from "next/link";
import Image from "next/image";
export default function FeaturedGamesSection() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch(
          `https://api.rawg.io/api/games?key=f8843485cf0441ee8ce9ada8bf1f3610&page_size=12`
        );
        const data = await res.json();
        setGames(data.results.slice(0, 8));
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading)
    return <div className="w-full text-center my-24"><span className="loader"></span></div>;

  return (
    <section className="mb-20">
      <h2 className="text-3xl font-bold text-white mb-8">
        Featured Games
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {games.map((game) => (
          <Link href={`/games/${game.id}`}
            key={game.id}
            className="group bg-[#0f172a] border border-blue-900/40 rounded-2xl overflow-hidden shadow-lg hover:shadow-blue-900/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            <div className="overflow-hidden">
              <Image
              width={300}
              height={200}
                src={game.background_image}
                alt={game.name}
                className="h-52 w-full object-cover group-hover:scale-110 transition duration-500"
              />
            </div>

            <div className="p-4">
              <h3 className="text-white font-semibold text-[15.5px] md:text-lg mb-1 truncate">
                {game.name}
              </h3>

              <div className="text-sm mb-2 w-fit flex items-start flex-col">
                <div className="flex items-start gap-2">
                  <RatingStars rating={game.rating} /> 
                <span className="text-yellow-500 ">{game.rating.toFixed(1)}</span>
                </div>
                <span className="text-xs text-gray-500">({game.ratings_count} reviews)</span>

              </div>

              <div className="flex flex-wrap gap-2">
                {game.genres.slice(0, 2).map((g) => (
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
      
    </section>
  );
}
