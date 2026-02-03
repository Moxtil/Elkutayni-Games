"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoaderSkeleton from "./components/LoaderSkeleton";
export default function Home() {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    router.push("/feed");
  }, [user, isLoaded, isSignedIn]);

  return (
      <LoaderSkeleton />
  );
}
