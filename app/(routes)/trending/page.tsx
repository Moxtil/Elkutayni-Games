"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import SpotLight from "../../components/SpotLight";
import Link from "next/link";
import { FaFire, FaStar } from "react-icons/fa";
import Image from "next/image";

type Game = {
  id: number;
  name: string;
  background_image: string;
  rating: number;
};

export default function TrendingPage() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch(
      "https://api.rawg.io/api/games?key=f8843485cf0441ee8ce9ada8bf1f3610&ordering=-added&page_size=10"
    )
      .then(res => res.json())
      .then(data => setGames(data.results));
  }, []);

  if (!games.length) return null;

  return (
    <div className="space-y-24 py-10 ">

      {/*  SWIPER */}
      <section className="relative">
        <Swiper
          modules={[EffectFade, Autoplay, Pagination]}
          effect="fade"
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
          className="rounded-3xl overflow-hidden border border-blue-900/40"
        >
          {games.slice(0, 3).map(game => (
            <SwiperSlide key={game.id}>
              <div className="relative h-[480px] md:h-[560px] w-full flex flex-col justify-end ">
                <Image 
                alt="Game"
                fill
                  src={game.background_image}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0b1120] via-[#0b1120]/80 to-transparent" />

                <div className="relative z-10 p-10 md:p-16 max-w-2xl">
                  <span className="flex items-center gap-2 text-orange-400 mb-4">
                    <FaFire /> TRENDING NOW
                  </span>
                  <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
                    {game.name}
                  </h1>
                  <p className="text-blue-300 mb-6">
                    Discover why players can’t stop playing this game right now.
                  </p>
                  <Link
                    href={`/games/${game.id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition"
                  >
                    View Game
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-white mb-10 text-center">
          Top Trending Picks
        </h2>

        <Swiper
          modules={[EffectCoverflow, Pagination]}
          effect="coverflow"
          centeredSlides
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 20,
            stretch: 0,
            depth: 150,
            modifier: 1.5,
            slideShadows: false,
          }}
          centeredSlidesBounds={true}
          pagination={{ clickable: true }}
          className="pb-12"
        >
          {games.map(game => (
            <SwiperSlide key={game.id} style={{ width: "260px" }}>
              <Link href={`/games/${game.id}`}>
                <div className="bg-[#0f172a] border border-blue-900/40 rounded-2xl overflow-hidden hover:scale-105 transition">
                  <img
                    src={game.background_image}
                    className="h-64 w-full object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-white font-semibold line-clamp-1">
                      {game.name}
                    </h3>
                    <div className="text-blue-300 text-sm flex items-center gap-1 mt-1">
                      <FaStar className="text-yellow-400 text-xs" /> {game.rating}
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* SPOTLIGHT */}
      <section className="relative rounded-3xl overflow-hidden border border-blue-900/40">
        <div
          className="h-[450px] bg-cover bg-center"
          style={{ backgroundImage: `url(${games[4].background_image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1120] to-transparent p-10 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-white mb-3">
            Spotlight: {games[4].name}
          </h2>
          <p className="text-blue-300 max-w-lg mb-5">
            One of the most talked-about games this week.
          </p>
          <Link
            href={`/games/${games[4].id}`}
            className="transition-bg duration-200 bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl font-semibold w-fit"
          >
            Explore
          </Link>
        </div>
      </section>

      <SpotLight />

    </div>
  );
}
