"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useProfileStore } from "@/store/profileStore";

export default function GamePage() {
  const router = useRouter();
  const { isOnboarded, powerOn } = useProfileStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      router.replace("/");
    }
  }, [mounted, router]);

  return <div className="min-h-screen bg-black text-white" />;
}
