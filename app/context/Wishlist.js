"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import {  db } from "../firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

export const WishlistContext = createContext();

export default function WishlistProvider({ children }) {
  const router = useRouter();
  const {user} = useUser()
  const [favoriteItems, setFavoriteItems] = useState([]);
  // Load favorite items for the user
  const loadFavorites = async () => {
    if (!user) return;
    const favRef = collection(db, "users", user?.id, "favorite-items");
    const snapshot = await getDocs(favRef);
    const items = snapshot.docs.map((doc) => doc.data().product);
    setFavoriteItems(items);
  };



 

  // Load favorites whenever user changes
  useEffect(() => {
    if (user) loadFavorites(user);
  }, []);


  // Add or remove from favorites
  const toggleFavorite = async (item) => {
    if (!user) {
      router.push("/sign-up");
    } else {
      const favRef = collection(db, "users", user?.id, "favorite-items");
      try {
        const q = query(favRef, where("product.id", "==", item.id));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const existingDocId = snapshot.docs[0].id;
          await deleteDoc(
            doc(db, "users", user?.id, "favorite-items", existingDocId)
          );
          toast.success("Removed from wishlist");
        } else {
          await addDoc(favRef, {
            product: item,
            createdAt: new Date(),
          });
          toast.success("Added to wishlist");
        }
        loadFavorites(user);
      } catch (error) {
        console.error("Error toggling favorite item:", error);
      }
    }
  };

 

 

  return (
    <WishlistContext.Provider
      value={{
        toggleFavorite,
        favoriteItems,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
