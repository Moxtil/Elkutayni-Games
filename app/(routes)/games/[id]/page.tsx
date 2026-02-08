"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  FaStar, FaFire, FaGamepad, FaCalendarAlt, FaTrophy,
  FaGlobe, FaReddit, FaWindows, FaPlaystation, FaXbox,
  FaUsers
} from "react-icons/fa";
import DetailedGameSwiper from "@/app/components/DetailedGameSwiper";
import AddToFavButton from "@/app/components/AddToFavoriteBtn";
import RatingStars from "@/app/components/RatingStars";
import moment from "moment";

/*  TYPES  */

type Platform = {
  platform: { id: number; name: string };
  requirements?: {
    minimum?: string;
    recommended?: string;
  };
};

type Store = {
  id: number;
  store: { name: string; domain: string };
};

type Game = {
  id : number;
  name: string;
  background_image: string;
  rating: number;
  rating_top: number;
  metacritic: number;
  released: string;
  achievements_count: number;
  reviews_count: number;
  playtime: number;
  reddit_count: number;
  reddit_url: string;
  website: string;
  description: string;
  genres: { name: string }[];
  tags: { name: string }[];
  developers: { name: string }[];
  publishers: { name: string }[];
  platforms: Platform[];
  stores: Store[];
  metacritic_platforms: {
    metascore: number;
    platform: { id: number; name: string };
  }[];
  added_by_status: {
    owned: number;
    playing: number;
    beaten: number;
    toplay: number;
  };
  esrb_rating?: { name: string };
};

/*  PAGE  */

export default function GameDetailsPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [game, setGame] = useState<Game | null>(null);
  const [screens, setScreens] = useState<string[]>([]);
const [reviews, setReviews] = useState<any[]>([]);
const [similarGames, setSimilarGames] = useState<any[]>([]);



useEffect(() => {
  if (!id) return;

  const fetchGame = async () => {
    try {
      /* MAIN GAME */
      const gRes = await fetch(
        `https://api.rawg.io/api/games/${id}?key=f8843485cf0441ee8ce9ada8bf1f3610`
      );
      const g: Game = await gRes.json();

      setGame(g);

      /* SCREENSHOTS */
      const s = await fetch(
        `https://api.rawg.io/api/games/${id}/screenshots?key=f8843485cf0441ee8ce9ada8bf1f3610`
      ).then(r => r.json());

      setScreens(s?.results?.map((x: any) => x.image) || []);

      /* REVIEWS */
      const rRes = await fetch(
        `https://api.rawg.io/api/games/${id}/reviews?key=f8843485cf0441ee8ce9ada8bf1f3610&page_size=8`
      );

      const rText = await rRes.text();
      const rData = rText ? JSON.parse(rText) : null;
      setReviews(rData?.results || []);

      /* s SIMILAR GAMES s */

      const genreNames = g.genres.map(gen => gen.name).join(",");
      const searchWord = g.name.split(" ")[0];

      const simRes = await fetch(
        `https://api.rawg.io/api/games/${id}/game-series?key=f8843485cf0441ee8ce9ada8bf1f3610&page_size=20`
      );

      const simData = await simRes.json();

      const filtered = (simData?.results || [])
        .filter((x: any) => x.id !== g.id)
        .slice(0, 8);

      setSimilarGames(filtered);

    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  fetchGame();
}, [id]);


  if (!game)
    return <div className="h-screen flex items-center justify-center text-white"><span className="loader"></span></div>;

  const platformIcon = (name: string) => {
    if (name.includes("PC")) return <FaWindows />;
    if (name.includes("PlayStation")) return <FaPlaystation />;
    if (name.includes("Xbox")) return <FaXbox />;
    return <FaGamepad />;
  };

  return (
    <div className="text-white p-6 md:p-12 space-y-16">

      {/* HERO */}
      <div className="relative rounded-3xl overflow-hidden">
        <Image src={game.background_image} alt="" width={1400} height={600} className="w-full h-[550px] object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-[#0b1120]/70 to-transparent p-10 flex flex-col justify-end">
          <h1 className="text-5xl font-extrabold">{game.name}</h1>

          <div className="flex gap-6 mt-4 text-sm text-blue-300 flex-wrap">
            <span className="flex items-center gap-1"><FaStar /> {game.rating} / {game.rating_top}</span>
            <span className="flex items-center gap-1"><FaFire /> Metacritic {game.metacritic}</span>
            <span className="flex items-center gap-1"><FaCalendarAlt /> {game.released}</span>
            <span className="flex items-center gap-1"><FaTrophy /> {game.achievements_count} Achievements</span>
            <span className="flex items-center gap-1"><FaUsers /> {game.reviews_count} Reviews</span>
          </div>

          <div className="mt-4 flex gap-4">
            <AddToFavButton item={game} />
          </div>
        </div>
      </div>

      {/* GALLERY */}
      <DetailedGameSwiper screens={screens} />

      {/* PLAYER STATS */}
      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Stat title="Owned" value={game.added_by_status?.owned} />
        <Stat title="Playing" value={game.added_by_status?.playing} />
        <Stat title="Beaten" value={game.added_by_status?.beaten} />
        <Stat title="Wishlist" value={game.added_by_status?.toplay} />
        <Stat title="Playtime" value={`${game.playtime} hrs`} />
        <Stat title="Reddit Users" value={game.reddit_count} />
      </div>

      {/* DESCRIPTION */}
      <Section title="About This Game">
        <div dangerouslySetInnerHTML={{ __html: game.description }} />
      </Section>

      {/* CRITIC SCORES */}
      <Section title="Critic Scores">
        <div className="flex flex-wrap gap-4">
          {game.metacritic_platforms.map((p , index) => (
            <div key={index} className="bg-[#0f172a] px-4 py-3 rounded-xl border border-blue-900/40">
              {p.platform.name} — <span className="text-green-400 font-bold">{p.metascore}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* PLATFORMS */}
      <Section title="Platforms">
        <div className="flex flex-wrap gap-4">
          {game.platforms.map(p => (
            <div key={p.platform.id} className="bg-[#0f172a] px-4 py-2 rounded-xl border border-blue-900/40 flex items-center gap-2">
              {platformIcon(p.platform.name)} {p.platform.name}
            </div>
          ))}
        </div>
      </Section>

      {/* SYSTEM REQUIREMENTS */}
      {game.platforms[0]?.requirements?.minimum && (
        <Section title="PC Requirements">
          <pre className="whitespace-pre-wrap text-sm text-gray-300">
            {game.platforms[0].requirements.minimum}
          </pre>
          <hr className="my-4 border-blue-900/40"/>
          <pre className="whitespace-pre-wrap text-sm text-gray-300">
            {game.platforms[0].requirements.recommended}
          </pre>
        </Section>
      )}

      {/* TAGS */}
      <Section title="Genres">
        <Tags items={game.genres.map(g => g.name)} />
      </Section>

      <Section title="Tags">
        <Tags items={game.tags.slice(0, 15).map(t => t.name)} />
      </Section>

      {/* STUDIOS */}
      <Section title="Studios">
        <Tags items={[...game.developers.map(d => d.name), ...game.publishers.map(p => p.name)]} />
      </Section>

      {/* STORES */}
      <Section title="Buy From">
        <div className="flex flex-wrap gap-4">
          {game.stores.map((s, index) => (
            <Link key={index} href={`https://${s.store.domain}`} target="_blank"
              className="bg-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition">
              {s.store.name}
            </Link>
          ))}
        </div>
      </Section>

      {/* COMMUNITY */}
      <Section title="Community">
        <div className="flex gap-6 text-blue-400 text-2xl">
          <Link href={game.website} target="_blank"><FaGlobe /></Link>
          <Link href={game.reddit_url} target="_blank"><FaReddit /></Link>
        </div>
      </Section>


      {/* REVIEWS */}
      {reviews.length > 0 && <Section title="Player Reviews">
  <div className="space-y-6">
    {reviews.map((review, i) => (
      <div key={i} className="bg-[#0b1120] p-5 rounded-xl border border-blue-900/40 space-y-3">
        <div className="w-full flex justify-start items-center gap-2 text-sm text-blue-300">
          <span className="font-semibold">{review.user?.username || "Player"}</span>
          <RatingStars rating={review.rating} />
        </div>

        <p className="text-gray-300 text-sm leading-relaxed line-clamp-4">
          {review.text}
        </p>

        <span className="text-xs text-gray-500">{moment(review.created).fromNow()}</span>
      </div>
    ))}
  </div>
</Section> }

{/* SIMILAR GAMES */}
{similarGames.length > 0 && <Section title={`More Like ${game?.name}`}>
  <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {similarGames.map(game => (
      <Link
        key={game.id}
        href={`/games/${game.id}`}
        className="group bg-[#0b1120] rounded-2xl overflow-hidden border border-blue-900/40 hover:border-blue-500 transition"
      >
        <div className="relative h-40">
          <Image
            src={game.background_image}
            alt={game.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
        </div>

        <div className="p-4 space-y-2">
          <h3 className="font-bold text-white line-clamp-1">
            {game.name}
          </h3>

          <div className="flex items-center gap-3 text-xs text-blue-300">
            <div className="flex items-center gap-1">
              <RatingStars rating={game.rating || 0} />
            </div>
            {game.released && (
              <span className="flex items-center gap-1">
                <FaCalendarAlt />
                {moment(game.released).format("YYYY")}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-1 mt-2">
            {game.genres?.slice(0, 2).map((g: any, i: number) => (
              <span
                key={i}
                className="text-[11px] px-2 py-0.5 rounded bg-blue-900/40 text-blue-300"
              >
                {g.name}
              </span>
            ))}
          </div>
        </div>
      </Link>
    ))}
  </div>
</Section>}

    </div>


  );
}

/*  UI COMPONENTS  */

function Stat({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-[#0f172a] p-5 rounded-2xl border border-blue-900/40 text-center">
      <p className="text-blue-400 text-sm">{title}</p>
      <p className="text-xl font-bold mt-2">{value}</p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-blue-400">{title}</h2>
      <div className="bg-[#0f172a] p-6 rounded-2xl border border-blue-900/40">{children}</div>
    </div>
  );
}

function Tags({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((i, idx) => (
        <span key={idx} className="bg-blue-900/40 text-blue-300 px-3 py-1 rounded-lg text-sm">
          {i}
        </span>
      ))}
    </div>
  );
}
