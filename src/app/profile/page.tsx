"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useProfileStore, ScenarioResult } from "@/store/profileStore";
import { AXIS_DATA, calculateArchetype, calculateConsistency } from "@/lib/axisData";
import scenariosData from "@/data/scenarios.json";
import ResultsViewer from "@/components/ResultsViewer";
import { Scenario } from "@/types/scenario";

export default function ProfilePage() {
  const router = useRouter();
  const { scores, completedScenarios, scenarioHistory, calibrationScores, purgeData, isOnboarded, powerOn } = useProfileStore();
  const [expandedAxis, setExpandedAxis] = useState<string | null>(null);
  const [confirmPurge, setConfirmPurge] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selectedResult, setSelectedResult] = useState<{ scenario: Scenario; result: ScenarioResult } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && (!isOnboarded || !powerOn)) {
      router.replace("/");
    }
  }, [mounted, isOnboarded, powerOn, router]);

  const archetype = calculateArchetype(scores as unknown as Record<string, number>);
  const consistency = calculateConsistency(
    scenarioHistory.map((s) => s.scores)
  );

  const calculateCalibrationConsistency = (
    calScores: Record<string, number>,
    history: typeof scenarioHistory
  ) => {
    if (history.length === 0) return 100;
    const axes = Object.keys(calScores);
    let matches = 0;
    let activeAxes = 0;
    
    for (const axis of axes) {
      const calVal = calScores[axis] || 0;
      if (Math.abs(calVal) < 5) continue;
      activeAxes++;
      
      const totalScenVal = history.reduce((sum, s) => sum + (s.scores[axis] || 0), 0);
      if ((calVal > 0 && totalScenVal >= 0) || (calVal < 0 && totalScenVal <= 0)) {
        matches++;
      }
    }
    
    if (activeAxes === 0) return 100;
    return Math.round((matches / activeAxes) * 100);
  };

  const calibrationAlignment = calculateCalibrationConsistency(calibrationScores || {}, scenarioHistory);

  const toggleAxis = (axis: string) => {
    setExpandedAxis((prev) => (prev === axis ? null : axis));
  };

  const handlePurge = () => {
    if (confirmPurge) {
      purgeData();
      setConfirmPurge(false);
      router.push("/");
    } else {
      setConfirmPurge(true);
      setTimeout(() => setConfirmPurge(false), 3000);
    }
  };

  if (!mounted || !isOnboarded || !powerOn) {
    return <div className="min-h-screen bg-black text-white" />;
  }

  return (
    <main className="min-h-screen bg-[#000000] text-white font-sans relative overflow-hidden selection:bg-white selection:text-black">
      {/* Brutalist Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-6xl mx-auto py-16 px-6 relative z-20">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-3 text-neutral-400 hover:text-white transition-colors group mb-12"
          >
            <div className="w-10 h-10 border border-neutral-700 group-hover:border-white flex items-center justify-center transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </div>
            <span className="text-xs uppercase tracking-[0.3em] font-bold">
              Return
            </span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="mb-16 flex flex-col md:flex-row justify-between items-start gap-8"
        >
          <div>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white leading-none uppercase mb-4 break-words">
              Psychological
              <br />
              Profile
            </h1>
            <p className="text-sm text-neutral-500 uppercase tracking-[0.3em] font-medium">
              {completedScenarios.length} scenario
              {completedScenarios.length !== 1 ? "s" : ""} completed
            </p>
          </div>

          <motion.button
            onClick={handlePurge}
            whileTap={{ scale: 0.97 }}
            className={`flex items-center px-6 py-3 border uppercase text-xs tracking-[0.2em] font-bold transition-all mt-4 md:mt-2 ${
              confirmPurge
                ? "border-white bg-white text-black"
                : "border-neutral-700 text-neutral-400 hover:border-white hover:text-white"
            }`}
          >
            <Trash2 className="w-4 h-4 mr-3" />
            {confirmPurge ? "Confirm Purge" : "Purge Data"}
          </motion.button>
        </motion.header>

        {/* Archetype Section — only if 3+ scenarios */}
        {completedScenarios.length >= 3 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16 border border-neutral-800 p-8 md:p-12"
          >
            <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-500 font-bold mb-6">
              Archetype Classification
            </p>
            {archetype ? (
              <>
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
                  {archetype.name}
                </h2>
                <p className="text-neutral-400 text-base md:text-lg font-medium leading-relaxed max-w-2xl">
                  {archetype.description}
                </p>
              </>
            ) : (
              <>
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
                  Unclassified
                </h2>
                <p className="text-neutral-400 text-base md:text-lg font-medium leading-relaxed max-w-2xl">
                  Your behavioral pattern does not conform to known archetypes.
                </p>
              </>
            )}
          </motion.section>
        )}

        {/* Alignment & Consistency Scores */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {/* Consistency Score */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="border border-neutral-800 p-6 md:p-8 flex flex-row items-center justify-between gap-6"
          >
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-500 font-bold mb-2">
                Behavioral Stability
              </p>
              <p className="text-xs text-neutral-500 max-w-xs leading-relaxed">
                Measures decision pattern variance across events. High percentage denotes high predictability.
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-4xl md:text-5xl font-black tracking-tighter tabular-nums">
                {consistency}
              </span>
              <span className="text-lg font-bold text-neutral-500 ml-0.5">%</span>
            </div>
          </motion.section>

          {/* Baseline Alignment Score */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="border border-neutral-800 p-6 md:p-8 flex flex-row items-center justify-between gap-6"
          >
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-500 font-bold mb-2">
                Baseline Alignment
              </p>
              <p className="text-xs text-neutral-500 max-w-xs leading-relaxed">
                Measures alignment between initial self-assessment calibration and your actual choices.
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-4xl md:text-5xl font-black tracking-tighter tabular-nums">
                {completedScenarios.length > 0 ? calibrationAlignment : 100}
              </span>
              <span className="text-lg font-bold text-neutral-500 ml-0.5">%</span>
            </div>
          </motion.section>
        </div>

        {/* Axis Grid */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-500 font-bold mb-8">
            Axis Breakdown
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(AXIS_DATA).map(([axis, meta], index) => {
              const score = (scores as unknown as Record<string, number>)[axis] || 0;
              const percent = Math.abs(score);
              const isPositive = score >= 0;
              const isExpanded = expandedAxis === axis;
              const leanLabel = isPositive ? meta.rightLabel : meta.leftLabel;

              return (
                <motion.div
                  key={axis}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 * index }}
                  className={`border transition-colors cursor-pointer ${
                    isExpanded
                      ? "border-white bg-[#060606]"
                      : "border-neutral-800 hover:border-neutral-600"
                  }`}
                  onClick={() => toggleAxis(axis)}
                >
                  {/* Card Header */}
                  <div className="p-6 flex items-start gap-5">
                    {/* Trait Icon */}
                    <div className="flex-shrink-0 w-12 h-12 relative">
                      <Image
                        src={`/traits/trait_${axis.toLowerCase()}.png`}
                        alt={axis}
                        width={48}
                        height={48}
                        className="object-contain invert opacity-60"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-black uppercase tracking-[0.2em]">
                          {meta.name}
                        </h3>
                        <div className="flex items-center gap-3">
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-neutral-500" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-neutral-500" />
                          )}
                        </div>
                      </div>

                      {/* Pole Labels */}
                      <div className="flex justify-between text-[10px] uppercase tracking-[0.15em] text-neutral-600 font-bold mb-2">
                        <span>{meta.leftLabel}</span>
                        <span>{meta.rightLabel}</span>
                      </div>

                      {/* Center-Origin Slider Bar */}
                      <div className="relative h-[3px] bg-neutral-900 w-full">
                        {/* Center tick */}
                        <div className="absolute top-[-4px] left-1/2 w-[2px] h-[11px] bg-neutral-600 -translate-x-1/2 z-10" />
                        {/* Fill bar */}
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percent / 2}%` }}
                          transition={{
                            duration: 1,
                            ease: "easeOut",
                            delay: 0.05 * index,
                          }}
                          className="absolute top-0 h-full bg-white"
                          style={{
                            left: isPositive ? "50%" : undefined,
                            right: !isPositive ? "50%" : undefined,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.4,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-neutral-800">
                          <p className="text-neutral-400 text-xs leading-relaxed mb-5 mt-4">
                            {meta.description}
                          </p>
                          <div className="grid grid-cols-2 gap-4">
                            <div
                              className={`p-4 border ${
                                !isPositive
                                  ? "border-white/30 bg-white/[0.03]"
                                  : "border-neutral-800"
                              }`}
                            >
                              <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-2">
                                ← {meta.leftLabel}
                              </p>
                              <p className="text-xs text-neutral-400 leading-relaxed">
                                {meta.leftDescription}
                              </p>
                            </div>
                            <div
                              className={`p-4 border ${
                                isPositive
                                  ? "border-white/30 bg-white/[0.03]"
                                  : "border-neutral-800"
                              }`}
                            >
                              <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-2">
                                {meta.rightLabel} →
                              </p>
                              <p className="text-xs text-neutral-400 leading-relaxed">
                                {meta.rightDescription}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Scenario History */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-500 font-bold mb-8">
            Scenario History
          </p>

          {scenarioHistory.length === 0 ? (
            <div className="border border-neutral-800 p-12 text-center">
              <p className="text-neutral-600 uppercase tracking-[0.2em] text-sm font-bold">
                No scenarios completed yet.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {scenarioHistory.map((entry, i) => (
                <motion.button
                  key={`${entry.scenarioId}-${entry.timestamp}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 * i }}
                  onClick={() => {
                    const scen = scenariosData.find((s) => s.scenario_id === entry.scenarioId);
                    if (scen) {
                      setSelectedResult({ scenario: scen as any, result: entry });
                    }
                  }}
                  className="border border-neutral-800 hover:border-neutral-600 hover:bg-neutral-950/40 text-left w-full bg-black transition-colors p-6 flex flex-col md:flex-row justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-black uppercase tracking-[0.15em] mb-2">
                      {entry.scenarioTitle || entry.scenarioId}
                    </h4>
                    {entry.endingSummary && (
                      <p className="text-xs text-neutral-500 leading-relaxed">
                        {entry.endingSummary}
                      </p>
                    )}
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="text-[10px] text-neutral-600 font-mono tracking-wider">
                      {new Date(entry.timestamp).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-[10px] text-neutral-700 font-mono tracking-wider">
                      {new Date(entry.timestamp).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </motion.section>

        {/* Results Viewer Modal */}
        <AnimatePresence>
          {selectedResult && (
            <ResultsViewer
              scenario={selectedResult.scenario}
              result={selectedResult.result}
              onClose={() => setSelectedResult(null)}
              onReplay={(scen) => {
                router.push(`/?replay=${scen.scenario_id}`);
              }}
            />
          )}
        </AnimatePresence>

        {/* Footer spacer */}
        <div className="h-24" />
      </div>
    </main>
  );
}
