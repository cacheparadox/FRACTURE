"use client";

import { motion } from "framer-motion";
import { X, Share2, Award, RotateCcw } from "lucide-react";
import { Scenario } from "@/types/scenario";
import { ScenarioResult } from "@/store/profileStore";
import { AXIS_DATA } from "@/lib/axisData";

// ─── Axis Labels (derived from axisData) ────────────────────────────
const AXIS_LABELS: Record<string, [string, string]> = Object.fromEntries(
  Object.entries(AXIS_DATA).map(([key, meta]) => [key, [meta.leftLabel, meta.rightLabel]])
) as Record<string, [string, string]>;

interface Props {
  scenario: Scenario;
  result: ScenarioResult;
  onClose: () => void;
  onReplay?: (scenario: Scenario) => void;
}

export default function ResultsViewer({ scenario, result, onClose, onReplay }: Props) {
  const p1 = scenario.core_conflict.split(" vs ")[0];
  const p2 = scenario.core_conflict.split(" vs ")[1];

  const handleCopyLink = () => {
    const payload = {
      scenarioId: scenario.scenario_id,
      endingId: result.endingId,
      path: result.pathTaken || [scenario.nodes[0]?.node_id],
      scores: result.scores,
    };
    const hash = btoa(JSON.stringify(payload));
    const link = `${window.location.origin}/?compare=${hash}`;
    navigator.clipboard.writeText(link);
    alert("Comparison challenge link copied to clipboard!");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl w-full bg-[#050505] border border-white p-6 sm:p-8 md:p-12 shadow-2xl relative my-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 border border-neutral-800 hover:border-white text-neutral-400 hover:text-white transition-colors"
          title="Close Outcome Viewer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tactical Corner Brackets */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white" />
        
        {/* Visual scanline stripe overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        <div className="relative z-10">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-red-500 mb-2 block font-black">
            HISTORICAL DOSSIER // {scenario.scenario_id}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mb-4 text-white leading-none">
            {scenario.title}
          </h2>
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-8 border-b border-neutral-800 pb-4">
            CONSTRAINTS: {scenario.core_conflict}
          </p>

          <div className="mb-10">
            <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-bold mb-4 flex items-center gap-2">
              <Award className="w-4 h-4 text-red-500" />
              Recorded Outcome
            </h3>
            <p className="text-xl sm:text-2xl font-bold leading-snug text-neutral-200 bg-neutral-950 p-6 border border-neutral-900 rounded-sm">
              {result.endingSummary || "Evaluation complete."}
            </p>
          </div>

          {/* Slider Breakdown */}
          <div className="mb-10">
            <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-bold mb-6 border-l-4 border-white pl-4">
              Shift Evaluation
            </h3>
            <div className="space-y-6">
              {Object.entries(result.scores)
                .filter(([_, val]) => val !== 0)
                .map(([axis, val], i) => {
                  const labels = AXIS_LABELS[axis] || ["Low", "High"];
                  const visualPercent = Math.min(100, (Math.abs(val) / 10) * 100) / 2; // 0 to 50%
                  const isPositive = val >= 0;

                  return (
                    <div key={axis} className="flex flex-col group">
                      <div className="flex justify-between items-center mb-1 text-[10px] font-bold uppercase tracking-widest text-neutral-500 group-hover:text-white transition-colors">
                        <span className={!isPositive ? "text-white" : ""}>{labels[0]}</span>
                        <span className="text-neutral-300 font-black">{axis}</span>
                        <span className={isPositive ? "text-white" : ""}>{labels[1]}</span>
                      </div>
                      <div className="relative h-[2px] bg-neutral-900 w-full">
                        <div className="absolute top-[-4px] left-1/2 w-[2px] h-[10px] bg-neutral-600 -translate-x-1/2 z-10" />
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${visualPercent}%` }}
                          transition={{ delay: i * 0.1 + 0.2, duration: 0.8, ease: "easeOut" }}
                          className="absolute top-0 h-full bg-white animate-pulse"
                          style={{
                            left: isPositive ? "50%" : undefined,
                            right: !isPositive ? "50%" : undefined,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            {onReplay && (
              <button
                onClick={() => onReplay(scenario)}
                className="flex-1 py-4 border border-white hover:bg-white hover:text-black text-white font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-colors bg-black cursor-pointer animate-fade-in"
              >
                <RotateCcw className="w-4 h-4" />
                Re-run Simulation
              </button>
            )}
            <button
              onClick={handleCopyLink}
              className="flex-1 py-4 border border-white/40 hover:border-white text-white font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-colors bg-black cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              Copy Share Link
            </button>
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none sm:px-8 py-4 border border-neutral-800 hover:border-white text-neutral-400 hover:text-white font-bold uppercase tracking-widest text-xs transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
