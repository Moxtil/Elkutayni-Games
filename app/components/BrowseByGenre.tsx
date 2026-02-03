"use client";
import { useEffect, useState } from "react";
import {
  FaCrosshairs,
  FaHatWizard,
  FaCarSide,
  FaFutbol,
  FaChessKnight,
  FaDragon,
} from "react-icons/fa";
import { GiPistolGun, GiSkullBolt } from "react-icons/gi";
import { IoExtensionPuzzleOutline, IoFootballOutline, IoGameControllerOutline } from "react-icons/io5";
import { SiApplearcade, SiTindie } from "react-icons/si";
import { PiBoxingGloveBold } from "react-icons/pi";
import { FaChalkboardUser } from "react-icons/fa6";
import { CgCardSpades } from "react-icons/cg";
import { MdOutlineCastForEducation } from "react-icons/md";
import Link from "next/link";

const genreIcons: any = {
  Action: FaCrosshairs,
  RPG: FaHatWizard,
  Adventure: GiSkullBolt ,
  Shooter: GiPistolGun ,
  Indie : SiTindie ,
  Racing: FaCarSide,
  Sports: IoFootballOutline ,
  Strategy: FaChessKnight,
  Platformer: IoGameControllerOutline ,
  Puzzle: IoExtensionPuzzleOutline  ,
  Arcade : SiApplearcade,
  Fighting : PiBoxingGloveBold ,
   Board : FaChalkboardUser,
   Card : CgCardSpades,
   Educational : MdOutlineCastForEducation,

};

export default function BrowseByGenre() {
  const [genres, setGenres] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://api.rawg.io/api/genres?key=f8843485cf0441ee8ce9ada8bf1f3610")
      .then((res) => res.json())
      .then((data) => setGenres(data.results.slice(0, 8)));
  }, []);

  return (
    <section className="mb-24">
      <h2 className="text-3xl font-bold text-white mb-10">
        Browse by Category
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {genres.map((genre, i) => {
          const Icon = genreIcons[genre.name] || FaDragon;

          return (
            <Link href={`/games/category?genre=${genre.slug}`}
              key={genre.id}
              className="relative group rounded-2xl p-[1px] bg-gradient-to-br from-blue-500/30 via-cyan-400/20 to-blue-700/30"
            >
              <div className="relative rounded-2xl bg-[#0b1120]/80 backdrop-blur-xl border border-blue-900/40 p-6 h-36 flex flex-col justify-between overflow-hidden">

                {/* Glow effect */}
                <div className="absolute -inset-10 bg-blue-500/10 opacity-0 group-hover:opacity-100 blur-3xl transition duration-500" />

                <Icon className="text-3xl text-blue-400 group-hover:text-cyan-300 transition" />

                <div>
                  <h3 className="text-white font-semibold text-lg">
                    {genre.name}
                  </h3>
                  <p className="text-xs text-blue-300/60">
                    {genre.games_count.toLocaleString()} games
                  </p>
                </div>

                {/* Hover */}
                <div className="absolute inset-0 border border-transparent group-hover:border-cyan-400/40 rounded-2xl transition" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
