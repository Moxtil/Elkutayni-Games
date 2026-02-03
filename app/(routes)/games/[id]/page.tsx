"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  FaStar, FaFire, FaGamepad, FaCalendarAlt,
  FaTrophy, FaGlobe, FaReddit, FaWindows,
  FaPlaystation, FaXbox
} from "react-icons/fa";
import Image from "next/image";
import DetailedGameSwiper from "@/app/components/DetailedGameSwiper";
import AddToFavButton from "@/app/components/AddToFavoriteBtn";
import Link from "next/link";
type Game = any;

export default function GameDetailsPage() {
  const { id } = useParams();
  const [game, setGame] = useState<Game | null>(null);
  const [screens, setScreens] = useState<string[]>([]);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    const fetchGame = async () => {
      const g = await fetch(`https://api.rawg.io/api/games/${id}?key=f8843485cf0441ee8ce9ada8bf1f3610`).then(r => r.json());
      setGame(g);
      setMainImage(g.background_image);

      const s = await fetch(`https://api.rawg.io/api/games/${id}/screenshots?key=f8843485cf0441ee8ce9ada8bf1f3610`).then(r => r.json());
      setScreens(s.results.map((x: any) => x.image));
    };
    fetchGame();
  }, [id]);

  if (!game) return <div className="flex justify-center items-center h-screen"><span className="loader"></span></div>;

  const platformIcon = (name: string) => {
    if (name.includes("PC")) return <FaWindows />;
    if (name.includes("PlayStation")) return <FaPlaystation />;
    if (name.includes("Xbox")) return <FaXbox />;
    return <FaGamepad />;
  };

  return (
    <div className="text-white space-y-16 p-6 md:p-12">

      {/* HERO */}
      {/* <div className="relative rounded-3xl overflow-hidden border border-blue-900/40">
        <Image src={mainImage} alt={game.name || "Game Image"} width={1200} height={520} className="w-full h-[520px] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-[#0b1120]/70 to-transparent p-10 flex flex-col justify-end">
          <h1 className="text-5xl font-extrabold">{game.name}</h1>
          <div className="flex gap-6 mt-4 text-sm text-blue-300">
            <span className="flex items-center gap-1"><FaStar /> {game.rating}</span>
            <span className="flex items-center gap-1"><FaFire /> {game.metacritic}</span>
            <span className="flex items-center gap-1"><FaCalendarAlt /> {game.released}</span>
            <span className="flex items-center gap-1"><FaTrophy /> {game.achievements_count} Achievements</span>
          </div>
        </div>
      </div> */}
      <DetailedGameSwiper screens={screens} />

      {/* SCREENSHOTS */}
      <div className="flex gap-4 overflow-x-hidden pb-2">
        {screens.map((img, i) => (
          <Image
          alt={game.name || "Game Screenshot"}
            key={i}
            src={img}
            width={300}
            height={200}
            className="h-28 w-48 object-cover rounded-xl opacity-75 border border-blue-900/40"
          />
        ))}
      </div>

      <div className="relative w-fit ml-12">
        <AddToFavButton item={game} />

      </div>
      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">

        <StatCard title="Playtime" value={`${game.playtime} hrs`} />
        <StatCard title="Reviews" value={game.reviews_count} />
        <StatCard title="Favorites" value={game.added} />
        <StatCard title="ESRB" value={game.esrb_rating?.name} />

      </div>

      {/* DESCRIPTION */}
      <Section title="About The Game">
        <div dangerouslySetInnerHTML={{ __html: game.description }} />
      </Section>

      {/* PLATFORMS */}
      <Section title="Platforms">
        <div className="flex flex-wrap gap-4">
          {game.platforms.map((p: any) => (
            <div key={p.platform.id} className="bg-[#0f172a] px-4 py-2 rounded-xl border border-blue-900/40 flex items-center gap-2">
              {platformIcon(p.platform.name)} {p.platform.name}
            </div>
          ))}
        </div>
      </Section>

      {/* GENRES */}
      <Section title="Genres">
        <Tags items={game.genres.map((g: any) => g.name)} />
      </Section>

      {/* TAGS */}
      <Section title="Game Tags">
        <Tags items={game.tags.map((t: any) => t.name)} />
      </Section>

      {/* DEVELOPERS & PUBLISHERS */}
      <Section title="Studios">
        <Tags items={[...game.developers.map((d: any) => d.name), ...game.publishers.map((p: any) => p.name)]} />
      </Section>

      {/* STORES */}
      <Section title="Available On">
        <div className="flex flex-wrap gap-4">
          {game.stores.map((s: any) => (
            <a key={s.id} href={`https://${s.store.domain}`} target="_blank"
              className="bg-blue-900/40 px-4 py-2 rounded-xl hover:bg-blue-800 transition">
              {s.store.name}
            </a>
          ))}
        </div>
      </Section>

      {/* LINKS */}
      <Section title="Community & Links">
        <div className="flex gap-6 text-blue-400 text-xl">
          <Link href={game.website} target="_blank"><FaGlobe /></Link>
          <Link href={game.reddit_url} target="_blank"><FaReddit /></Link>
        </div>
      </Section>

    </div>
  );
}

function StatCard({ title, value }: any) {
  return (
    <div className="bg-[#0f172a] p-6 rounded-2xl border border-blue-900/40 text-center">
      <p className="text-blue-400 text-sm">{title}</p>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}

function Section({ title, children }: any) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-blue-400">{title}</h2>
      <div className="bg-[#0f172a] p-6 rounded-2xl border border-blue-900/40">
        {children}
      </div>
    </div>
  );
}

function Tags({ items }: any) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((i: string, idx: number) => (
        <span key={idx} className="bg-blue-900/40 text-blue-300 px-3 py-1 rounded-lg text-sm">
          {i}
        </span>
      ))}
    </div>
  );
}
