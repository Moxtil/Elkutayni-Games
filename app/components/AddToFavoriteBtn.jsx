"use client";
import React, { useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/config";

import { FaHeart } from "react-icons/fa";
import { useUser } from "@clerk/nextjs";
import { WishlistContext } from "../context/Wishlist";
import toast from "react-hot-toast";

export default function AddToFavButton({ item }) {
  const [favoriteIds, setFavoriteIds] = useState([item.id]);

  const { user } = useUser();
  const { toggleFavorite } = useContext(WishlistContext);

  const loadFavorites = async () => {
    if (!user) return;

    const favRef = collection(db, "users", user?.id, "favorite-items");
    const snapshot = await getDocs(favRef);

    const ids = snapshot.docs.map((doc) => doc.data().product.id);

    setFavoriteIds(ids);
  };
  useEffect(() => {
    loadFavorites();
  }, []);

  const isFavorite = favoriteIds.includes(item.id);
  return (
    <div
      onClick={async () => {
        if (user) {
          await toggleFavorite(item);
          loadFavorites();
        }else {
          toast.error("You need to be signed in to add favorites.");
        }
      }}
      className="rounded-full  p-1"
    >
      {isFavorite && user ? (
        <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:scale-110 transition">
          <FaHeart className="cursor-pointer text-red-500" />
        </button>
      ) : (
        <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:scale-110 transition">
          <FaHeart className="cursor-pointer text-gray-400 hover:text-red-500" />
        </button>
      )}
    </div>
  );
}
