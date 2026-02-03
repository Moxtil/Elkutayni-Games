"use client";

import { useContext, useEffect,  } from "react";
import HoloCard from "../../components/HoloCard";
import { WishlistContext } from "@/app/context/Wishlist";
import { FaHeart } from "react-icons/fa";
import noGameImage from '../../assets/undraw_video-game-night_fxcu.svg'
import Image from "next/image";
import { Toaster } from "react-hot-toast";
type Game = {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  genres: { id: number; name: string }[];
};

export default function WishlistPage() {

const {favoriteItems} = useContext(WishlistContext);


  if (favoriteItems.length === 0){
    return (
      <div className="text-center text-white py-32">
        <h2 className="text-3xl font-bold mb-2">Your Wishlist is Empty</h2>
        <p className="text-blue-300 flex items-center justify-center gap-1 text-center w-full">Start adding games you love <FaHeart color="oklch(80.9% 0.105 251.813)" /></p>
        <div className="max-w-6xl">
                  <Image src={noGameImage} alt="No Games In Pocket" width={300} height={200} className="w-full h-128 object-contain" />

        </div>
      </div>
    )}else
  return (
    <div className="p-6 md:p-12 space-y-14">
      <Toaster position="top-right" reverseOrder={false} />
      <div>
        <h1 className="text-4xl font-bold text-white">Your Wishlist</h1>
        <p className="text-blue-300">Your saved games ready to play.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {favoriteItems.map((game:any) => (
          <HoloCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}
