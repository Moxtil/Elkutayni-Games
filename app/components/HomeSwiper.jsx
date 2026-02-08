"use client";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Snowfall from "react-snowfall";
import GamePulseBackground from "./GamePulseBackground";
import img1 from "../assets/witcher.png";
import img2 from "../assets/eldenring.png";
import img3 from "../assets/cyberpunk.png";
import img4 from "../assets/gta.png";
import img5 from "../assets/cod.png";
import img6 from "../assets/fortnite.png";
import imgMob1 from '../assets/mobile_assets/the_witcher.jpg'
import imgMob2 from '../assets/mobile_assets/elden_ring.jpg'
import imgMob3 from '../assets/mobile_assets/cyber.jpg'
import imgMob4 from '../assets/mobile_assets/gtav.jpg'
import imgMob5 from '../assets/mobile_assets/cod.jpg'
import imgMob6 from '../assets/mobile_assets/fortnite.jpg'


export default function HomeSwiper() {
  const slides = [
    {
      image: img1,
      mobileImg : imgMob1,
      badge: "RPG LEGEND",
      title: "The Witcher 3",
      highlight: "Wild Hunt",
      description:
        "Step into a dark fantasy world full of monsters, choices, and epic storytelling.",
      primaryBtn: "View Game",
      secondaryBtn: "Add to Wishlist",
    },
    {
      image: img2,
      mobileImg : imgMob2,
      badge: "GAME OF THE YEAR",
      title: "Elden Ring",
      highlight: "Rise, Tarnished.",
      description:
        "Explore a vast open world forged by FromSoftware’s legendary design.",
      primaryBtn: "Explore",
      secondaryBtn: "See Details",
    },
    {
      image: img3,
      mobileImg : imgMob3,
      badge: "FUTURE WARFARE",
      title: "Cyberpunk 2077",
      highlight: "Night City Awaits.",
      description:
        "Dive into a neon-drenched dystopian future packed with action and choices.",
      primaryBtn: "Enter City",
      secondaryBtn: "More Info",
    },
    {
      image: img4,
      mobileImg : imgMob4,
      badge: "OPEN WORLD",
      title: "GTA V",
      highlight: "Los Santos Life.",
      description:
        "Experience crime, chaos, and freedom in one of the biggest open worlds ever made.",
      primaryBtn: "Play Now",
      secondaryBtn: "View Modes",
    },
    {
      image: img5,
      mobileImg : imgMob5,
      badge: "FPS ACTION",
      title: "Call of Duty",
      highlight: "Modern Warfare",
      description:
        "Tactical combat, intense multiplayer, and cinematic missions.",
      primaryBtn: "Join Battle",
      secondaryBtn: "Loadout Info",
    },
    {
      image: img6,
      mobileImg : imgMob6,
      badge: "BATTLE ROYALE",
      title: "Fortnite",
      highlight: "Victory Royale",
      description:
        "Build, battle, and survive in the world’s most explosive arena.",
      primaryBtn: "Drop In",
      secondaryBtn: "Game Modes",
    },
  ];

  return (
    <div className="mb-10 w-full min-h-[450px] relative overflow-hidden bg-[#0b1120]">
     <GamePulseBackground />
      <Snowfall color="#38bdf8" snowflakeCount={80} />

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        loop
        className="w-full h-full"
      >
        {slides.map((slide, i) => (
        <SwiperSlide key={i}>
  <div className="relative w-full min-h-[560px] flex items-center overflow-hidden">

    {/* Gradient background */}
    {/* <div className="absolute inset-0 bg-gradient-to-r from-[#0b1120] via-[#0b1120]/95 to-[#0b1120]/40 z-0" /> */}

    <div className="relative z-10 mx-auto w-full max-w-7xl px-6 flex flex-col-reverse lg:flex-row items-center justify-between gap-8 p-4">

      {/* TEXT SIDE */}
      <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
        <span className="inline-block bg-cyan-400/20 text-cyan-400 px-5 py-1.5 rounded-full text-xs font-bold tracking-widest">
          {slide.badge}
        </span>

        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-white">
          {slide.title}
          <br />
          <span className="text-cyan-400">{slide.highlight}</span>
        </h1>

        <p className="text-gray-400 text-base md:text-lg max-w-lg mx-auto lg:mx-0">
          {slide.description}
        </p>

        <div className="flex gap-4 pt-4 justify-center lg:justify-start">
          <button className="cursor-pointer bg-cyan-500 hover:bg-cyan-600 transition px-7 py-3 rounded-xl font-semibold text-white shadow-lg shadow-cyan-500/30">
            {slide.primaryBtn}
          </button>

          <button className="cursor-pointer bg-white/10 backdrop-blur hover:bg-white/20 transition px-7 py-3 rounded-xl font-semibold border border-white/20 text-white">
            {slide.secondaryBtn}
          </button>
        </div>
      </div>

      {/* IMAGE SIDE */}
      <div className="relative w-full lg:w-1/2 flex justify-center items-center">

        {/* Glow behind image */}
        {/* <div className="absolute w-[280px] md:w-[420px] h-[280px] md:h-[420px] bg-cyan-500/20 blur-[120px] rounded-full" /> */}

        {/* Image container */}
        <div className="relative w-full md:w-[420px] lg:w-[480px] aspect-[4/5]">
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="hidden md:block md:translate-y-20 object-contain md:drop-shadow-[0_0_50px_rgba(56,189,248,0.45)] transition duration-500 hover:scale-[1.04]"
            priority={i === 0}
            sizes="(max-width: 768px) 80vw, 480px"
          />
          <Image
            src={slide.mobileImg}
            alt={slide.title}
            fill
            className="block w-full md:hidden object-cover md:drop-shadow-[0_0_50px_rgba(56,189,248,0.45)] transition-all duration-300"
            priority={i === 0}
            
          />
        </div>
      </div>

    </div>
  </div>
</SwiperSlide>

        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #38bdf8 !important;
        }
        .swiper-pagination-bullet {
          background: #fff !important;
          opacity: 0.3;
        }
        .swiper-pagination-bullet-active {
          background: #38bdf8 !important;
          opacity: 1;
        }
        @media (max-width: 768px) {
          .swiper-pagination-bullet {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
