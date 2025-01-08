"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProStore } from "@/store/proStore";

export default function RealTime() {
  const router = useRouter();
  const { isPro } = useProStore();

  useEffect(() => {
    if (!isPro) {
      router.replace("/");
    }
  }, [isPro, router]);

  if (!isPro) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="h-screen flex justify-center items-center flex-col gap-4">
        <p>Live chat</p>
        <button className="px-4 py-2 rounded-lg text-white bg-green-500">
          Start Talking
        </button>
      </div>
    </div>
  );
}
