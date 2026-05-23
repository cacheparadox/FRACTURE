"use client";

import { useEffect, useState } from "react";
import { useProfileStore } from "@/store/profileStore";

export default function CRTLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { powerOn, booting, setPowerOn, setBooting, settings } = useProfileStore();
  const [mounted, setMounted] = useState(false);
  const [glitchClass, setGlitchClass] = useState<string>("");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Randomized glitch scheduler
  const triggerRandomGlitch = () => {
    if (!settings.glitchEnabled) return;
    const glitchTypes = [
      "glitch-skew",
      "glitch-color",
      "glitch-shake",
      "glitch-flash",
      "glitch-extreme",
    ];
    const randomType = glitchTypes[Math.floor(Math.random() * glitchTypes.length)];
    setGlitchClass(randomType);

    setTimeout(() => {
      setGlitchClass("");
    }, 120 + Math.random() * 180); // Duration: 120ms to 300ms
  };

  // Schedule random glitches
  useEffect(() => {
    if (!powerOn || !settings.glitchEnabled) {
      setGlitchClass("");
      return;
    }

    let timer: NodeJS.Timeout;
    const scheduleNext = () => {
      const delay = 4000 + Math.random() * 11000; // 4s to 15s random delay
      timer = setTimeout(() => {
        triggerRandomGlitch();
        scheduleNext();
      }, delay);
    };

    scheduleNext();
    return () => clearTimeout(timer);
  }, [powerOn, settings.glitchEnabled]);

  // Click-triggered glitches (sometimes glitches on choice clicks)
  useEffect(() => {
    if (!powerOn || !settings.glitchEnabled) return;

    const handleGlobalClick = () => {
      // 30% chance of triggering an instant glitch upon clicks
      if (Math.random() < 0.3) {
        triggerRandomGlitch();
      }
    };

    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, [powerOn, settings.glitchEnabled]);

  const handlePowerSwitch = () => {
    if (powerOn) {
      setPowerOn(false);
    } else {
      setBooting(true);
      setTimeout(() => {
        setPowerOn(true);
        setBooting(false);
      }, 700);
    }
  };

  if (!mounted) {
    return <div className="min-h-screen bg-black text-white" />;
  }

  // ─── CASE A: Powered Off ───────────────────────────────────────
  if (!powerOn && !booting) {
    return (
      <main className="min-h-screen bg-[#060606] flex items-center justify-center p-4 font-mono select-none selection:bg-transparent">
        <div className="relative w-full max-w-4xl aspect-[4/3] bg-[#171717] border-[16px] border-[#222] rounded-3xl flex flex-col items-center justify-center p-6 crt-bezel border-t-[#333] border-l-[#333] border-r-[#111] border-b-[#111]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_55%,rgba(0,0,0,0.95)_100%)] pointer-events-none rounded-xl z-20" />
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none z-20 transform -skew-y-12 origin-top-left" />

          <div className="absolute top-3 left-6 text-[#2a2a2a] text-[9px] uppercase tracking-[0.3em] font-black">
            FRACTURE // EVALUATION MODULE
          </div>

          <div className="w-full h-[84%] bg-[#080808] border-4 border-[#0c0c0c] rounded-xl relative overflow-hidden flex flex-col items-center justify-center shadow-inner">
            <div className="absolute inset-0 bg-[#060606] opacity-95" />
            <div className="static-overlay opacity-5" />

            <div className="z-10 text-center max-w-xs px-4">
              <h2 className="text-[#1a1a1a] text-xs font-black uppercase tracking-[0.25em] mb-2 animate-pulse">
                System Depowered
              </h2>
              <p className="text-[#151515] text-[9px] uppercase tracking-widest leading-relaxed font-bold">
                Toggle the switch in the bezel controls to engage.
              </p>
            </div>
          </div>

          <div className="w-full h-[16%] mt-4 flex justify-between items-center px-4">
            <div className="flex gap-4">
              <div className="w-5 h-5 rounded-full bg-[#111] border border-[#222] shadow-inner" />
              <div className="w-5 h-5 rounded-full bg-[#111] border border-[#222] shadow-inner" />
              <div className="w-5 h-5 rounded-full bg-[#111] border border-[#222] shadow-inner" />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-red-950/70 border border-neutral-900 mb-1" />
                <span className="text-[7px] text-neutral-600 tracking-widest font-black uppercase">Power</span>
              </div>

              <button
                onClick={handlePowerSwitch}
                className="w-12 h-8 bg-[#1a1a1a] border-2 border-[#0d0d0d] rounded flex flex-col justify-end items-center p-0.5 active:bg-[#151515] shadow-inner cursor-pointer"
              >
                <div className="w-8 h-4 bg-[#252525] border border-[#333] shadow-sm flex items-center justify-center transform active:translate-y-0.5 transition-transform">
                  <span className="text-[7px] text-neutral-500 font-bold uppercase">ON</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ─── CASE B: Booting Sequence ──────────────────────────────────
  if (booting) {
    return (
      <main className="min-h-screen bg-[#060606] flex items-center justify-center p-4 font-mono">
        <div className="relative w-full max-w-4xl aspect-[4/3] bg-[#171717] border-[16px] border-[#222] rounded-3xl overflow-hidden crt-bezel border-t-[#333] border-l-[#333]">
          <div className="w-full h-full bg-black relative flex items-center justify-center">
            <div className="static-overlay opacity-90" />
            <div className="w-[85%] h-[3px] bg-white crt-booting shadow-[0_0_12px_#fff]" />
          </div>
        </div>
      </main>
    );
  }

  // ─── CASE C: Active Simulation Screen ──────────────────────────
  return (
    <div className={`min-h-screen w-full relative overflow-hidden bg-black text-white ${settings.crtEnabled ? "crt-active" : ""} ${glitchClass}`}>
      {/* Persistent subtle grainy static noise overlay throughout gameplay */}
      {settings.grainEnabled && (
        <div className="static-overlay opacity-[0.035] pointer-events-none" />
      )}

      {/* CRT screen corner shadow border overlay */}
      {settings.crtEnabled && (
        <div className="absolute inset-0 pointer-events-none z-50 rounded-none border-[4px] border-black/10 box-border shadow-[inset_0_0_80px_rgba(0,0,0,0.85)]" />
      )}

      {/* Main App content */}
      <div className="relative z-10 w-full min-h-screen">
        {children}
      </div>
    </div>
  );
}
