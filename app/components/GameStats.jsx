"use client";
import { useEffect, useState } from "react";
import {
  FaUsers,
  FaStar,
  FaTrophy,
  FaGamepad,
  FaWindows,
  FaPlaystation,
  FaXbox,
  FaApple,
  FaFire,
} from "react-icons/fa";
import { SiNintendo } from "react-icons/si";
import HeartLine from "./HeartLine";
import { GrTrophy } from "react-icons/gr";

export default function GameStats() {
  const [players, setPlayers] = useState(18420);
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState(0);
  const [added, setAdded] = useState(0);
  const [playtime, setPlaytime] = useState(12);
  const [platforms, setPlatforms] = useState([]);
  const [achievement, setAchievement] = useState(null);

  // Live counters
  useEffect(() => {
    const interval = setInterval(() => {
      setPlayers((p) => p + Math.floor(Math.random() * 10 - 4));
      setPlaytime((t) => t + Math.random() * 0.2); 
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const achievements = [
      "Player reached Level 50!",
      "New speedrun record!",
      "Legendary item discovered!",
      "Boss defeated worldwide!",
    ];

    const interval = setInterval(() => {
      const msg = achievements[Math.floor(Math.random() * achievements.length)];
      setAchievement(msg);
      setTimeout(() => setAchievement(null), 4000);
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch("https://api.rawg.io/api/games/28?key=f8843485cf0441ee8ce9ada8bf1f3610")
      .then((r) => r.json())
      .then((data) => {
        setRating(data.rating);
        setReviews(data.ratings_count);
        setAdded(data.added);
        setPlatforms(data.platforms.map((p) => p.platform.name));
      });
  }, []);

  const iconMap = {
    pc: <FaWindows />,
    playstation: <FaPlaystation />,
    xbox: <FaXbox />,
    mac: <FaApple />,
    nintendo: <SiNintendo />,
  };

  return (
    <section className="relative w-full py-16 overflow-hidden">

     <HeartLine />

      {/* Achievement Popup */}
      {achievement && (
        <div className="absolute z-0  top-6 left-1/2 -translate-x-1/2 bg-black/70 border border-yellow-400/40 text-yellow-300 px-6 py-3 rounded-xl backdrop-blur-md animate-bounce  shadow-lg flex items-center gap-2">
          <GrTrophy color="gold" /> {achievement}
        </div>
      )}

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6">

        <div className="mb-10 overflow-hidden whitespace-nowrap">
          <div className="animate-[scroll_20s_linear_infinite] text-blue-300 text-sm tracking-widest flex items-center gap-1">
            <FaFire color="orange" /> Global Tournament Live • Double XP Weekend • New DLC Released • Community Event Active •
          </div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

          <StatCard icon={<FaUsers />} label="ONLINE PLAYERS" value={players.toLocaleString()} />
          <StatCard icon={<FaStar />} label="STORE RATING" value={rating} sub={`${reviews} reviews`} />
          <StatCard icon={<FaTrophy />} label="FAVORITES" value={added.toLocaleString()} />
          <StatCard icon={<FaGamepad />} label="AVG PLAYTIME" value={`${playtime.toFixed(1)}h`} />

          <div className="col-span-1 rounded-2xl bg-white/5 backdrop-blur-xl border border-blue-900/40 p-6 flex flex-col justify-center shadow-[0_0_30px_rgba(0,150,255,0.15)]">
            <p className="text-xs text-blue-300 tracking-widest mb-3 text-center">AVAILABLE ON</p>
            <div className="flex items-center justify-center gap-6 text-3xl text-blue-200">
              {platforms.map((name, i) => {
                const key = name.toLowerCase();
                const iconKey = Object.keys(iconMap).find((k) => key.includes(k));
                return (
                  <span key={i} className="hover:text-cyan-400 hover:scale-125 transition">
                    {iconMap[iconKey]}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scroll {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </section>
  );
}

function StatCard({ icon, label, value, sub }) {
  return (
    <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-blue-900/40 p-6 flex items-center gap-4 hover:scale-[1.03] transition shadow-[0_0_25px_rgba(0,150,255,0.15)]">
      <div className="text-3xl text-cyan-300 animate-pulse">{icon}</div>
      <div>
        <p className="text-xs text-blue-300 tracking-widest">{label}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
        {sub && <p className="text-xs opacity-70">{sub}</p>}
      </div>
    </div>
  );
}
