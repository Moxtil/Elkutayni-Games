"use client";

import {  SignUp } from "@clerk/nextjs";
import Snowfall from "react-snowfall";
import { motion } from "framer-motion";
import HeartLine from "../../../components/HeartLine";
import AuthHeartBeatLine from "@/app/components/AuthHeartBeatLine";
export default function Page() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <HeartLine />
      <AuthHeartBeatLine />
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-black to-purple-900 animate-gradient opacity-80" />

      <Snowfall
        snowflakeCount={120}
        style={{ position: "fixed", width: "100vw", height: "100vh" }}
      />

      {/*  Glow  */}
      <motion.div
        className="absolute w-[500px] h-[500px] bg-purple-600 rounded-full blur-3xl opacity-30"
        animate={{ x: [0, 200, -200, 0], y: [0, -150, 150, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] bg-blue-600 rounded-full blur-3xl opacity-30"
        animate={{ x: [0, -150, 150, 0], y: [0, 200, -200, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      <section className="relative z-10 backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-6 md:p-10">
        <SignUp forceRedirectUrl="/feed" signInForceRedirectUrl="/sign-in" />
      </section>
    </main>
  );
}
