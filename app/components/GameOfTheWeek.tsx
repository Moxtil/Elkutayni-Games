"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Parallax } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import RatingStars from "./RatingStars";
import { LiaMedalSolid } from "react-icons/lia";
import Image from "next/image";

export default function GameOfTheWeek() {
  const [games, setGames] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://api.rawg.io/api/games?key=f8843485cf0441ee8ce9ada8bf1f3610&genres=action&page_size=10")
      .then(res => res.json())
      .then(data => setGames(data.results));
  }, []);

  return (
    <section className="mb-24 relative">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-white mb-8 flex items-center gap-2"
      >
        <LiaMedalSolid className="text-yellow-400 text-3xl" />
        Games of the Week
      </motion.h2>

      <Swiper
        modules={[Pagination, Autoplay, Parallax]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4500 }}
        parallax
        loop
        className="rounded-2xl"
      >
        {games.slice(0, 5).map((game) => (
          <SwiperSlide key={game.id}>
            <div className="relative h-[440px] overflow-hidden rounded-2xl border border-blue-900/40 group">

              {/* Background Image */}
              <Image
                src={game?.background_image}
                alt={game.name}
                width={300}
                height={200}
                data-swiper-parallax="-150"
                className="h-full w-full object-cover"
              />

              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-[#0b1120]/60 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 p-8 z-10">
                <h3
                  data-swiper-parallax="-300"
                  className="text-3xl font-bold text-white drop-shadow-lg"
                >
                  {game.name}
                </h3>

                <div
                  data-swiper-parallax="-400"
                  className="flex items-center gap-2 text-blue-300 mt-2"
                >
                  <RatingStars rating={game.rating} />
                  <span className="text-sm opacity-70">{game.released}</span>
                </div>
              </div>

              {/* glow */}
              <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition duration-500 blur-2xl" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Swiper Style */}
      <style jsx global>{`
        .swiper-pagination {
          margin-top: 14px;
          position: relative;
        }
        .swiper-pagination-bullet {
          background: #1e3a8a;
          opacity: 0.4;
          width: 10px;
          height: 10px;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          background: #38bdf8;
          opacity: 1;
          width: 24px;
          border-radius: 6px;
        }
      `}</style>
    </section>
  );
}
