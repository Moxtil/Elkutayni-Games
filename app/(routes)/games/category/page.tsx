import Image from "next/image";
import { FaFire, FaStar } from "react-icons/fa";
import placeholderImage from "../../../assets/44.jpg";
import Link from "next/link";

async function getGamesByGenre(genre: string) {
  const res = await fetch(
    `https://api.rawg.io/api/games?key=f8843485cf0441ee8ce9ada8bf1f3610&genres=${genre}&page_size=20`,
    { cache: "no-store" }  
  );

  if (!res.ok) throw new Error("Failed to fetch games");
  return res.json();
}


export default async function CategoryPage({
  searchParams,
}: {
  searchParams: { genre?: string };
}) {
  const genre = searchParams.genre || "action";
  const data = await getGamesByGenre(genre);
  const games = data.results;

  return (
    <div className="min-h-screen bg-[#0b1120] text-white px-6 md:px-12 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold flex items-center gap-3">
          <FaFire className="text-sky-400" />
          {genre.toUpperCase()} GAMES
        </h1>
        <p className="text-gray-400 mt-2">
          Explore the best {genre} games right now
        </p>
      </div>

      {/* Games */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {games.map((game: any) => (
          <Link href={`/games/${game.id}`}
            key={game.id}
            className="group relative bg-[#111827] border border-blue-900/40 rounded-2xl overflow-hidden shadow-lg hover:shadow-sky-500/20 transition duration-300"
          >
            <div className="relative h-52 overflow-hidden">
              <Image
                src={game?.background_image || placeholderImage}
                alt={game.name}
                fill
                className="object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-transparent to-transparent" />
            </div>

            {/* text */}
            <div className="p-5 space-y-3">
              <h2 className="text-lg font-semibold line-clamp-1 group-hover:text-sky-400 transition">
                {game.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 text-yellow-400 text-sm">
                <FaStar />
                <span>{game.rating}</span>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2">
                {game.genres?.slice(0, 2).map((g: any) => (
                  <span
                    key={g.id}
                    className="text-xs bg-sky-500/10 text-sky-300 px-2 py-1 rounded-full"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Hover effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-sky-500/5 blur-2xl" />
          </Link>
        ))}
      </div>
    </div>
  );
}
