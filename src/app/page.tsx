"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import scenariosData from "@/data/scenarios.json";
import { Scenario, Ending } from "@/types/scenario";
import ScenarioPlayer from "@/components/ScenarioPlayer";
import { Play, Lock, User, Settings } from "lucide-react";
import { useProfileStore } from "@/store/profileStore";
import { motion, AnimatePresence } from "framer-motion";


export default function Home() {
  const [activeScenario, setActiveScenario] = useState<Scenario | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  


  // Challenge comparison states
  const [challengeData, setChallengeData] = useState<{
    scenarioId: string;
    endingId: string;
    path: string[];
    scores: Record<string, number>;
  } | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [myScenarioResult, setMyScenarioResult] = useState<{
    ending: Ending;
    scores: Record<string, number>;
  } | null>(null);

  const {
    completedScenarios,
    isOnboarded,
    settings,
    setSetting,
    setPowerOn
  } = useProfileStore();

  const scenarios = scenariosData as unknown as Scenario[];

  // Sort scenarios: completed ones go to the bottom
  const sortedScenarios = [...scenarios].sort((a, b) => {
    const aCompleted = completedScenarios.includes(a.scenario_id);
    const bCompleted = completedScenarios.includes(b.scenario_id);
    if (aCompleted && !bCompleted) return 1;
    if (!aCompleted && bCompleted) return -1;
    return 0;
  });

  // Decode challenge hash from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const compareParam = params.get("compare");
    if (compareParam) {
      try {
        const decoded = JSON.parse(atob(compareParam));
        setChallengeData(decoded);
      } catch (e) {
        console.error("Failed to decode challenge payload", e);
      }
    }
  }, []);


  const handleScenarioReset = () => {
    setActiveScenario(null);
    setShowComparison(false);
    setMyScenarioResult(null);
  };

  const handleScenarioComplete = (results: { ending: Ending; scores: Record<string, number> }) => {
    if (challengeData && challengeData.scenarioId === activeScenario?.scenario_id) {
      setMyScenarioResult(results);
      setShowComparison(true);
    }
  };

  return (
    <div className="w-full min-h-screen relative">
      {/* Settings Modal overlay */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-md w-full border border-white bg-black p-8 shadow-2xl relative"
            >
              <button
                onClick={() => setShowSettings(false)}
                className="absolute top-6 right-6 border border-neutral-800 hover:border-white px-3 py-1 text-xs uppercase tracking-wider font-bold transition-all"
              >
                Close
              </button>
              
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-8 border-b border-neutral-800 pb-4">
                Settings
              </h3>

              <div className="space-y-6">
                {/* CRT Toggle */}
                <div className="flex justify-between items-center border-b border-neutral-900 pb-4">
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider mb-1">CRT Screen Filter</h4>
                    <p className="text-[10px] text-neutral-500">Scanlines, curved glass, and phosphor flicker</p>
                  </div>
                  <button
                    onClick={() => setSetting("crtEnabled", !settings.crtEnabled)}
                    className={`px-4 py-2 border text-xs font-bold uppercase tracking-wider transition-all ${
                      settings.crtEnabled ? "border-white bg-white text-black" : "border-neutral-700 text-neutral-400"
                    }`}
                  >
                    {settings.crtEnabled ? "ON" : "OFF"}
                  </button>
                </div>

                {/* Drone Audio Toggle */}
                <div className="flex justify-between items-center border-b border-neutral-900 pb-4">
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider mb-1">Ambient Synth Drone</h4>
                    <p className="text-[10px] text-neutral-500">Low industrial drone during evaluations</p>
                  </div>
                  <button
                    onClick={() => setSetting("audioEnabled", !settings.audioEnabled)}
                    className={`px-4 py-2 border text-xs font-bold uppercase tracking-wider transition-all ${
                      settings.audioEnabled ? "border-white bg-white text-black" : "border-neutral-700 text-neutral-400"
                    }`}
                  >
                    {settings.audioEnabled ? "ON" : "OFF"}
                  </button>
                </div>

                {/* Intros Toggle */}
                <div className="flex justify-between items-center border-b border-neutral-900 pb-4">
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider mb-1">Cinematic Intros</h4>
                    <p className="text-[10px] text-neutral-500">Slow chapter titles before scenarios start</p>
                  </div>
                  <button
                    onClick={() => setSetting("introsEnabled", !settings.introsEnabled)}
                    className={`px-4 py-2 border text-xs font-bold uppercase tracking-wider transition-all ${
                      settings.introsEnabled ? "border-white bg-white text-black" : "border-neutral-700 text-neutral-400"
                    }`}
                  >
                    {settings.introsEnabled ? "ON" : "OFF"}
                  </button>
                </div>

                {/* Glitch Toggle */}
                <div className="flex justify-between items-center border-b border-neutral-900 pb-4">
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider mb-1">Visual Glitches</h4>
                    <p className="text-[10px] text-neutral-500">Randomized retro signal interference</p>
                  </div>
                  <button
                    onClick={() => setSetting("glitchEnabled", settings.glitchEnabled === false)}
                    className={`px-4 py-2 border text-xs font-bold uppercase tracking-wider transition-all ${
                      settings.glitchEnabled !== false ? "border-white bg-white text-black" : "border-neutral-700 text-neutral-400"
                    }`}
                  >
                    {settings.glitchEnabled !== false ? "ON" : "OFF"}
                  </button>
                </div>

                {/* Grain Toggle - Replaced with opacity slider */}
                <div className="border-b border-neutral-900 pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider mb-1">Static Grain</h4>
                      <p className="text-[10px] text-neutral-500">Persistent grainy analog static noise opacity</p>
                    </div>
                    <span className="text-xs font-mono text-neutral-400">
                      {Math.round((settings.grainOpacity ?? 0.04) * 500)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={Math.round((settings.grainOpacity ?? 0.04) * 500)}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value) / 500;
                      setSetting("grainOpacity", val);
                    }}
                    className="w-full h-1 bg-neutral-800 appearance-none cursor-pointer accent-white hover:bg-neutral-700 focus:outline-none"
                  />
                </div>

                {/* Power Down Terminal */}
                <div className="pt-6">
                  <button
                    onClick={() => {
                      setPowerOn(false);
                      setShowSettings(false);
                    }}
                    className="w-full py-3 border border-red-500 hover:bg-red-500 hover:text-black text-red-500 font-bold uppercase text-xs tracking-widest transition-all"
                  >
                    Shut Down Terminal
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── SCENARIO PLAYER ACTIVE ────────────────────────────────── */}
      {activeScenario && (
        <main className="min-h-screen py-24 px-6 flex flex-col items-center justify-center">
          {showComparison && challengeData && myScenarioResult ? (
            /* CHALLENGE SIDE-BY-SIDE COMPARISON */
            <div className="max-w-4xl w-full border border-white bg-black p-8 md:p-12 relative shadow-2xl z-20">
              <h2 className="text-4xl font-black uppercase tracking-tighter border-b border-neutral-800 pb-6 mb-8 text-center">
                Challenge Outcome
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12">
                {/* My ending summary */}
                <div className="p-6 border border-neutral-800 bg-[#030303]">
                  <h3 className="text-xs uppercase tracking-widest text-neutral-500 font-bold border-l-4 border-white pl-3 mb-4">
                    Your Ending
                  </h3>
                  <p className="text-lg font-bold leading-relaxed mb-4">
                    {myScenarioResult.ending.summary}
                  </p>
                </div>

                {/* Friend's ending summary */}
                <div className="p-6 border border-neutral-800 bg-[#030303]">
                  <h3 className="text-xs uppercase tracking-widest text-neutral-500 font-bold border-l-4 border-neutral-600 pl-3 mb-4">
                    Friend's Ending
                  </h3>
                  <p className="text-lg font-bold leading-relaxed mb-4 text-neutral-400">
                    {scenarios
                      .find((s) => s.scenario_id === challengeData.scenarioId)
                      ?.endings.find((e) => e.ending_id === challengeData.endingId)?.summary || "Received a unique outcome."}
                  </p>
                </div>
              </div>

              {/* Side-by-Side Decision Trail */}
              <div className="mb-12">
                <h3 className="text-xs uppercase tracking-widest text-neutral-500 font-bold border-l-4 border-white pl-3 mb-8">
                  Decision Paths Compared
                </h3>
                <div className="space-y-8 max-h-[40vh] overflow-y-auto pr-4">
                  {activeScenario.nodes.map((node, nodeIdx) => {
                    const iVisited = activeScenario.nodes.findIndex((n) => n.node_id === node.node_id) !== -1;
                    if (!iVisited) return null;

                    const myNextNode = activeScenario.nodes[nodeIdx + 1]?.node_id;
                    const myChoice = node.choices.find((c) => c.next_node === myNextNode)?.text || "N/A";
                    
                    const friendNextNodeIndex = challengeData.path.indexOf(node.node_id);
                    const friendNextNode = friendNextNodeIndex !== -1 ? challengeData.path[friendNextNodeIndex + 1] : null;
                    const friendChoice = friendNextNode ? node.choices.find((c) => c.next_node === friendNextNode)?.text || "N/A" : "Not Visited";

                    return (
                      <div key={node.node_id} className="border-b border-neutral-900 pb-6">
                        <p className="text-xs text-neutral-500 uppercase tracking-wider mb-2 font-mono">
                          Layer {nodeIdx + 1} node
                        </p>
                        <p className="text-sm text-neutral-300 mb-4">{node.text}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                          <div className="p-3 border border-neutral-800">
                            <span className="text-neutral-500 font-bold">YOU CHOSE:</span>
                            <p className="text-white mt-1 uppercase font-bold">{myChoice}</p>
                          </div>
                          <div className="p-3 border border-neutral-800">
                            <span className="text-neutral-500 font-bold">FRIEND CHOSE:</span>
                            <p className="text-neutral-400 mt-1 uppercase font-bold">{friendChoice}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={handleScenarioReset}
                className="w-full py-4 border border-white text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
              >
                Return to Menu
              </button>
            </div>
          ) : (
            <ScenarioPlayer
              scenario={activeScenario}
              onComplete={handleScenarioComplete}
              onReset={handleScenarioReset}
            />
          )}
        </main>
      )}


        {!activeScenario && isOnboarded && (
        <main className="max-w-6xl mx-auto py-24 px-6 relative z-20">
          <header className="mb-16 md:mb-24 flex flex-wrap justify-between items-start gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-white to-red-600 leading-none uppercase drop-shadow-[0_0_15px_rgba(239,68,68,0.35)] relative group select-none">
                Fracture
                {/* Visual scanline stripe overlay on text */}
                <span className="absolute left-0 top-1/2 w-full h-[2px] bg-red-500/30 opacity-70 blur-[1px] animate-pulse" />
              </h1>
              <p className="text-sm md:text-xl text-neutral-400 font-medium tracking-widest max-w-xl uppercase leading-relaxed">
                Deterministic behavioral simulation.
              </p>
            </motion.div>
 
            {/* System Diagnostics HUD */}
            <div className="hidden lg:flex flex-col gap-1 border border-neutral-900 bg-neutral-950 p-4 font-mono text-[9px] uppercase tracking-wider text-neutral-500 w-64 border-dashed rounded relative">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-red-500/40" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-red-500/40" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-red-500/40" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-red-500/40" />
              <div className="flex justify-between border-b border-neutral-900 pb-1">
                <span>Completed</span>
                <span className="text-white font-bold">{completedScenarios.length} / {scenarios.length}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-900 pb-1">
                <span>Neural Sync</span>
                <span className="text-green-500 font-bold">100% Stable</span>
              </div>
              <div className="flex justify-between">
                <span>Module Link</span>
                <span className="text-red-500 font-bold">Active_Uplink</span>
              </div>
            </div>

            {/* Controls: Settings, Profile */}
            <div className="flex items-center gap-4">
              {challengeData && (
                <div className="hidden md:flex items-center bg-red-950/40 border border-red-900/60 px-4 py-2 text-[10px] text-red-400 uppercase tracking-widest font-black">
                  Challenge Loaded
                </div>
              )}
              
              <button
                onClick={() => setShowSettings(true)}
                className="p-4 border border-neutral-800 hover:border-white hover:bg-neutral-900 transition-all text-neutral-400 hover:text-white"
                title="Settings"
              >
                <Settings className="w-6 h-6" />
              </button>
 
              <Link
                href="/profile"
                className="p-4 border border-neutral-800 hover:border-white hover:bg-neutral-900 transition-all text-neutral-400 hover:text-white"
                title="Profile"
              >
                <User className="w-6 h-6" />
              </Link>
            </div>
          </header>
 
          {/* Scenario Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {sortedScenarios.map((scenario) => {
              const originalIndex = scenarios.findIndex((s) => s.scenario_id === scenario.scenario_id);
              const isCompleted = completedScenarios.includes(scenario.scenario_id);
              const isChallengeTarget = challengeData?.scenarioId === scenario.scenario_id;
 
              return (
                <button
                  key={scenario.scenario_id}
                  onClick={() => !isCompleted && setActiveScenario(scenario)}
                  disabled={isCompleted}
                  className={`relative p-8 md:p-12 border text-left flex flex-col justify-between aspect-[1.8/1] transition-all group overflow-hidden ${
                    isCompleted
                      ? "border-neutral-900 bg-neutral-950/40 text-neutral-600 cursor-not-allowed"
                      : isChallengeTarget
                      ? "border-red-900 bg-black hover:border-red-500 hover:bg-[#080101] shadow-[0_0_15px_rgba(239,68,68,0.05)] hover:shadow-[0_0_20px_rgba(239,68,68,0.15)]"
                      : "border-neutral-800 bg-[#020202] hover:border-white hover:bg-white hover:text-black hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                  }`}
                >
                  {/* Tactical corner brackets */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-neutral-800 group-hover:border-red-500 transition-colors duration-300" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-neutral-800 group-hover:border-red-500 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-neutral-800 group-hover:border-red-500 transition-colors duration-300" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-neutral-800 group-hover:border-red-500 transition-colors duration-300" />

                  {/* Pulsing scanline overlay on hover */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[size:100%_4px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10 w-full">
                    {/* Top row */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-mono tracking-widest text-neutral-500 group-hover:text-neutral-800 transition-colors">
                          [{originalIndex.toString().padStart(2, "0")}]
                        </span>
                        <span
                          className={`text-[10px] uppercase tracking-widest px-2 py-1 border font-bold transition-colors ${
                            isCompleted
                              ? "border-neutral-800 text-neutral-700"
                              : isChallengeTarget
                              ? "border-red-800 text-red-500"
                              : "border-white/30 text-white/50 group-hover:border-black group-hover:text-black"
                          }`}
                        >
                          {scenario.stakes_type} STAKES
                        </span>
                      </div>
                      
                      {/* Blinking status dot indicator */}
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          isCompleted 
                            ? "bg-neutral-700" 
                            : isChallengeTarget 
                            ? "bg-red-500 animate-ping" 
                            : "bg-green-500 animate-pulse"
                        }`} />
                        <span className="text-[8px] font-mono tracking-widest text-neutral-500 group-hover:text-neutral-800 transition-colors">
                          {isCompleted ? "COMPLETED" : isChallengeTarget ? "CHALLENGE" : "AVAILABLE"}
                        </span>
                      </div>
                    </div>
 
                    <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter mb-2 transition-colors">
                      {scenario.title}
                    </h3>
                    <p
                      className={`text-sm font-medium tracking-wide uppercase transition-colors ${
                        isCompleted
                          ? "text-neutral-600"
                          : isChallengeTarget
                          ? "text-red-700 group-hover:text-red-400"
                          : "text-neutral-400 group-hover:text-black"
                      }`}
                    >
                      {scenario.core_conflict}
                    </p>
                  </div>
 
                  {/* Play / Lock Indicator */}
                  <div className="flex justify-end relative z-10 w-full mt-6">
                    <div
                      className={`w-12 h-12 flex items-center justify-center border transition-all ${
                        isCompleted
                          ? "border-neutral-800 text-neutral-800"
                          : isChallengeTarget
                          ? "border-red-900 text-red-500 group-hover:border-red-500 group-hover:bg-red-500 group-hover:text-black"
                          : "border-white/20 text-white group-hover:border-black group-hover:bg-black group-hover:text-white"
                      }`}
                    >
                      {isCompleted ? <Lock className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
                    </div>
                  </div>
                </button>
              );
            })}
          </motion.div>
        </main>
      )}
    </div>
  );
}
