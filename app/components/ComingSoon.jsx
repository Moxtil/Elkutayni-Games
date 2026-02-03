"use client"
import { useEffect, useState } from "react";

export default function ComingSoon() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("https://api.rawg.io/api/games?dates=2026-01-01,2026-12-31&ordering=-added&page_size=6&key=f8843485cf0441ee8ce9ada8bf1f3610")
      .then(res => res.json())
      .then(data => setGames(data.results || []));
  }, []);

  return (
    <section className="mb-24 px-6 md:px-10">
      <h2 className="text-3xl font-bold text-white mb-8">Coming Soon</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {games.map(game => (
          <div key={game.id} className="bg-[#0f172a] p-5 rounded-xl border border-blue-900/40 text-white">
            <div className="text-lg font-semibold mb-2 line-clamp-1">{game.name}</div>
            <div className="text-blue-400 text-sm">Release: {game.released}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
