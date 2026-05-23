"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scenario, Node, Ending, Choice, FlagSet, EffectScores } from "@/types/scenario";
import { ChevronRight, Home, Volume2, VolumeX } from "lucide-react";
import { useProfileStore } from "@/store/profileStore";
import { AXIS_DATA } from "@/lib/axisData";
import TypewriterText from "./TypewriterText";
import AudioDrone from "./AudioDrone";

// ─── Axis Labels (derived from axisData) ────────────────────────────
const AXIS_LABELS: Record<string, [string, string]> = Object.fromEntries(
  Object.entries(AXIS_DATA).map(([key, meta]) => [key, [meta.leftLabel, meta.rightLabel]])
) as Record<string, [string, string]>;

type Phase = "loading" | "intro" | "playing" | "ending";

interface Props {
  scenario: Scenario;
  onComplete?: (results: { ending: Ending; scores: EffectScores; flags: FlagSet }) => void;
  onReset?: () => void;
}

export default function ScenarioPlayer({ scenario, onComplete, onReset }: Props) {
  // ── Core game state ─────────────────────────────────────────────
  const [currentNodeId, setCurrentNodeId] = useState<string>(scenario.nodes[0]?.node_id);
  const [flags, setFlags] = useState<FlagSet>({});
  const [scores, setScores] = useState<EffectScores>({});
  const [ending, setEnding] = useState<Ending | null>(null);
  const [depth, setDepth] = useState(1);
  const [pathTaken, setPathTaken] = useState<string[]>([scenario.nodes[0]?.node_id]);

  // ── Phase state (loading → intro → playing → ending) ────────────
  const [phase, setPhase] = useState<Phase>("loading");

  // ── Typewriter state ────────────────────────────────────────────
  const [textReady, setTextReady] = useState(false);

  // ── Timer state ─────────────────────────────────────────────────
  const [timerRemaining, setTimerRemaining] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Shake state ─────────────────────────────────────────────────
  const [shaking, setShaking] = useState(false);

  const { addScores, settings, setSetting } = useProfileStore();

  const currentNode = scenario.nodes.find((n) => n.node_id === currentNodeId);

  // ─── Loading → Intro → Playing sequence ────────────────────────
  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setPhase("intro");
    }, 500);

    const introTimer = setTimeout(() => {
      setPhase("playing");
    }, 4500);

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(introTimer);
    };
  }, []);

  // ─── Timer logic for timed choices ─────────────────────────────
  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setTimerRemaining(null);

    if (
      phase !== "playing" ||
      !currentNode?.timer_seconds ||
      !textReady
    ) {
      return;
    }

    const totalMs = currentNode.timer_seconds * 1000;
    const startTime = Date.now();
    setTimerRemaining(100);

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / totalMs) * 100);
      setTimerRemaining(remaining);

      if (remaining <= 0) {
        if (timerRef.current) clearInterval(timerRef.current);
        // Auto-select last choice (the "panic" option)
        if (currentNode.choices.length > 0) {
          handleChoice(currentNode.choices[currentNode.choices.length - 1]);
        }
      }
    }, 50);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [currentNodeId, textReady, phase, currentNode]);

  // ─── Keyboard navigation ───────────────────────────────────────
  useEffect(() => {
    if (phase !== "playing" || !textReady || !currentNode) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const num = parseInt(e.key);
      if (num >= 1 && num <= currentNode.choices.length) {
        handleChoice(currentNode.choices[num - 1]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentNodeId, textReady, phase, currentNode]);

  // ─── Handle choice ─────────────────────────────────────────────
  const handleChoice = useCallback((choice: Choice) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setTimerRemaining(null);
    setTextReady(false);

    // 1. Update flags
    const newFlags = { ...flags, ...choice.flags_set };
    setFlags(newFlags);

    // 2. Accumulate scores
    const newScores = { ...scores };
    Object.entries(choice.effects).forEach(([trait, value]) => {
      newScores[trait] = (newScores[trait] || 0) + value;
    });
    setScores(newScores);

    // 3. Determine next step
    let nextId = choice.next_node;
    const isEnding = scenario.endings.find((e) => e.ending_id === nextId);

    // If it's a node transition (not an ending), check for conditional alternative nodes with matching prefix
    if (!isEnding) {
      // Find any node that shares the base ID name or prefix (e.g. "l_5" matches "l_5" or "l_5_alt")
      const basePrefix = nextId.split("_").slice(0, 2).join("_"); // matches e.g. "l_5"
      const candidateNodes = scenario.nodes.filter(
        (n) => n.node_id === nextId || n.node_id.startsWith(basePrefix + "_")
      );

      if (candidateNodes.length > 1) {
        // Find candidate that matches flags, default to first match
        const matchingNode = candidateNodes.find((n) => {
          if (n.visibility === "always") return false; // prefer conditional nodes first
          return n.required_flags.every((f) => newFlags[f]);
        });
        if (matchingNode) {
          nextId = matchingNode.node_id;
        } else {
          // Fallback to the default "always" node if no conditional ones are met
          const defaultNode = candidateNodes.find((n) => n.visibility === "always" || n.node_id === nextId);
          if (defaultNode) {
            nextId = defaultNode.node_id;
          }
        }
      }
    }

    const nextIsEnding = scenario.endings.find((e) => e.ending_id === nextId);

    // Append to path
    const updatedPath = [...pathTaken, nextId];
    setPathTaken(updatedPath);

    if (nextIsEnding) {
      setEnding(nextIsEnding);
      setPhase("ending");
      setShaking(true);
      setTimeout(() => setShaking(false), 300);

      addScores(
        newScores as Record<string, number>,
        scenario.scenario_id,
        scenario.title,
        nextIsEnding.ending_id,
        nextIsEnding.summary,
        updatedPath
      );
      if (onComplete) {
        onComplete({ ending: nextIsEnding, scores: newScores, flags: newFlags });
      }
    } else {
      setDepth((d) => d + 1);
      setCurrentNodeId(nextId);
    }
  }, [flags, scores, scenario, pathTaken, addScores, onComplete]);

  const toggleMute = () => {
    setSetting("audioEnabled", !settings.audioEnabled);
  };

  return (
    <>
      {/* Dynamic Ambient Synth Drone */}
      <AudioDrone depth={depth} active={phase === "playing" || phase === "intro"} />

      {/* Persistent Audio Toggle & Back controls */}
      <div className="absolute top-6 left-6 z-50 flex items-center gap-4">
        <button
          onClick={toggleMute}
          className="p-3 border border-neutral-800 hover:border-white text-neutral-400 hover:text-white transition-colors"
          title={settings.audioEnabled ? "Mute Ambient Drone" : "Unmute Ambient Drone"}
        >
          {settings.audioEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-red-500" />}
        </button>
        {onReset && (
          <button
            onClick={onReset}
            className="px-4 py-3 border border-neutral-800 hover:border-white text-neutral-400 hover:text-white text-xs uppercase tracking-widest font-bold transition-colors"
          >
            Abort
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {/* PHASE: Loading */}
        {phase === "loading" && (
          <motion.div
            key="loading"
            className="fixed inset-0 bg-black flex items-center justify-center z-40"
            exit={{ opacity: 0 }}
          >
            <div className="w-1/2 h-[2px] bg-neutral-900 relative overflow-hidden">
              <div className="h-full bg-white animate-line-draw" />
            </div>
          </motion.div>
        )}

        {/* PHASE: Intro Title Card */}
        {phase === "intro" && (
          <motion.div
            key="intro"
            className="fixed inset-0 bg-black flex items-center justify-center z-40"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center px-8">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white select-none mb-6"
              >
                {scenario.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="text-xs uppercase tracking-[0.4em] text-neutral-400 font-bold"
              >
                Psychological Evaluation Initiating...
              </motion.p>
            </div>
          </motion.div>
        )}

        {/* PHASE: Playing */}
        {phase === "playing" && currentNode && (
          <motion.div
            key={currentNode.node_id}
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -10 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl mx-auto w-full bg-[#050505] border border-white/20 p-8 md:p-12 shadow-2xl relative overflow-hidden mt-16"
          >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

            {/* Scenario text with typewriter effect */}
            <div className="text-3xl md:text-4xl font-medium leading-snug text-white mb-16 relative z-10 tracking-wide min-h-[160px]">
              <TypewriterText
                text={currentNode.text}
                speed={25}
                onComplete={() => setTextReady(true)}
              />
            </div>

            {/* Choices */}
            <AnimatePresence>
              {textReady && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 relative z-10"
                >
                  {/* Timer bar */}
                  {timerRemaining !== null && (
                    <div className="w-full h-[2px] bg-neutral-900 mb-6 overflow-hidden">
                      <motion.div
                        className="h-full bg-white"
                        initial={false}
                        animate={{ width: `${timerRemaining}%` }}
                        transition={{ duration: 0.05, ease: "linear" }}
                      />
                    </div>
                  )}

                  {currentNode.choices.map((choice, idx) => (
                    <button
                      key={choice.choice_id}
                      onClick={() => handleChoice(choice)}
                      className="w-full text-left p-6 md:p-8 border border-white/20 bg-black hover:bg-white hover:text-black hover:border-white transition-all group flex items-center justify-between"
                    >
                      <div className="flex items-center gap-6">
                        {/* Key indicator */}
                        <span className="w-8 h-8 border border-white/30 flex items-center justify-center text-xs font-bold text-neutral-500 group-hover:border-black group-hover:text-black transition-colors shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-xl md:text-2xl font-bold uppercase tracking-tight text-neutral-300 group-hover:text-black transition-colors">
                          {choice.text}
                        </span>
                      </div>
                      <ChevronRight className="w-6 h-6 text-neutral-600 group-hover:text-black transition-colors shrink-0" />
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* PHASE: Ending */}
        {phase === "ending" && ending && (
          <motion.div
            key="ending"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`max-w-3xl mx-auto w-full p-8 md:p-12 border border-white bg-black text-white shadow-2xl relative overflow-hidden mt-8 ${shaking ? "animate-shake" : ""}`}
          >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black mb-8 text-white tracking-tighter uppercase border-b border-white/20 pb-6">
                Outcome
              </h2>
              <p className="text-xl md:text-2xl mb-12 leading-relaxed text-neutral-300 font-medium tracking-wide">
                {ending.summary}
              </p>

              {/* Slider Breakdown */}
              <div className="mb-16">
                <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-8 font-bold border-l-4 border-white pl-4">
                  Behavioral Shifts
                </h3>
                <div className="space-y-8">
                  {Object.entries(scores)
                    .filter(([_, val]) => val !== 0)
                    .map(([axis, val], i) => {
                      const labels = AXIS_LABELS[axis] || ["Low", "High"];
                      const visualPercent = Math.min(100, (Math.abs(val) / 10) * 100) / 2; // 0 to 50%
                      const isPositive = val >= 0;

                      return (
                        <motion.div
                          key={axis}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.15 + 0.3 }}
                          className="flex flex-col group"
                        >
                          <div className="flex justify-between items-center mb-2 text-xs font-bold uppercase tracking-widest text-neutral-400 group-hover:text-white transition-colors">
                            <span className={!isPositive ? "text-white" : ""}>{labels[0]}</span>
                            <span className="text-white text-sm">{axis}</span>
                            <span className={isPositive ? "text-white" : ""}>{labels[1]}</span>
                          </div>
                          <div className="relative h-[2px] bg-neutral-900 w-full">
                            <div className="absolute top-[-4px] left-1/2 w-[2px] h-[10px] bg-neutral-500 -translate-x-1/2 z-10" />
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${visualPercent}%` }}
                              transition={{ delay: i * 0.15 + 0.6, duration: 1, ease: "easeOut" }}
                              className="absolute top-0 h-full bg-white"
                              style={{
                                left: isPositive ? "50%" : undefined,
                                right: !isPositive ? "50%" : undefined,
                              }}
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                </div>
              </div>

              {/* Decision Replay Ghost Trail */}
              <div className="mb-16">
                <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-8 font-bold border-l-4 border-white pl-4">
                  Decision Trail
                </h3>
                <div className="space-y-6">
                  {pathTaken.map((nodeId, idx) => {
                    const node = scenario.nodes.find((n) => n.node_id === nodeId);
                    if (!node) return null;
                    return (
                      <div key={nodeId} className="flex gap-4 items-start text-neutral-400">
                        <span className="text-neutral-600 font-mono text-xs mt-1">
                          [{idx + 1}]
                        </span>
                        <div className="flex-1 text-sm">
                          <p className="text-neutral-300 leading-relaxed mb-2 font-medium">
                            {node.text}
                          </p>
                          {idx < pathTaken.length - 1 && (() => {
                            const nextNodeId = pathTaken[idx + 1];
                            const chosen = node.choices.find((c) => c.next_node === nextNodeId);
                            return chosen ? (
                              <p className="text-white uppercase tracking-wider font-mono text-xs font-bold border-l border-neutral-700 pl-3 py-1">
                                Chosen: {chosen.text}
                              </p>
                            ) : null;
                          })()}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Compare with Friend Link */}
              <div className="mb-12 p-6 border border-neutral-800 bg-[#030303] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h4 className="text-xs uppercase tracking-[0.15em] font-bold text-neutral-400 mb-1">
                    Compare Decisions
                  </h4>
                  <p className="text-xs text-neutral-500">
                    Generate a challenge link. Your friend can play and see a side-by-side comparison.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const payload = {
                      scenarioId: scenario.scenario_id,
                      endingId: ending.ending_id,
                      path: pathTaken,
                      scores,
                    };
                    const hash = btoa(JSON.stringify(payload));
                    const link = `${window.location.origin}/?compare=${hash}`;
                    navigator.clipboard.writeText(link);
                    alert("Comparison link copied to clipboard!");
                  }}
                  className="px-4 py-2 border border-neutral-700 hover:border-white text-xs uppercase tracking-wider font-bold transition-colors"
                >
                  Copy Challenge Link
                </button>
              </div>

              <button
                onClick={onReset}
                className="flex items-center justify-center w-full py-6 border border-white text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
              >
                <Home className="w-5 h-5 mr-3" />
                Return to Menu
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
