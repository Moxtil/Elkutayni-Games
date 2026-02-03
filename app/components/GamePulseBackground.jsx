"use client";
import { motion } from "framer-motion";

export default function GamePulseBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">

      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5" />

      <svg
        className="absolute w-[200%] h-full opacity-30"
        viewBox="0 0 2000 400"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0 200 
             L150 200 
             L200 120 
             L260 280 
             L320 160 
             L380 240 
             L440 200 
             L2000 200"
          fill="transparent"
          stroke="url(#pulseGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <defs>
          <linearGradient id="pulseGradient">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
      </svg>

      {/* Moving light */}
      <motion.div
        className="absolute top-0 left-0 w-40 h-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent blur-2xl"
        animate={{ x: ["-10%", "110%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
