"use client";

import { useEffect, useRef } from "react";
import { useProfileStore } from "@/store/profileStore";

interface Props {
  depth: number;
  active: boolean;
}

export default function AudioDrone({ depth, active }: Props) {
  const audioEnabled = useProfileStore((state) => state.settings.audioEnabled);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const distortionRef = useRef<WaveShaperNode | null>(null);

  // Helper to make a distortion curve
  const makeDistortionCurve = (amount: number) => {
    const k = typeof amount === "number" ? amount : 50;
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;
    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  };

  useEffect(() => {
    // If Web Audio is not supported, do nothing
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    // Create context and nodes
    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const distortion = ctx.createWaveShaper();
    const gainNode = ctx.createGain();

    osc1Ref.current = osc1;
    osc2Ref.current = osc2;
    filterRef.current = filter;
    distortionRef.current = distortion;
    gainNodeRef.current = gainNode;

    // Frequencies (55Hz and 55.4Hz for binaural beating)
    osc1.type = "sine";
    osc2.type = "sawtooth"; // low sawtooth for buzz

    // Filter settings
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(100, ctx.currentTime);
    filter.Q.setValueAtTime(1, ctx.currentTime);

    // Distortion
    distortion.curve = makeDistortionCurve(5);
    distortion.oversample = "4x";

    // Connections: Osc -> Distortion -> Filter -> Gain -> Destination
    osc1.connect(distortion);
    osc2.connect(distortion);
    distortion.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Start oscillators
    osc1.start();
    osc2.start();

    // Initial state
    gainNode.gain.setValueAtTime(0, ctx.currentTime);

    return () => {
      // Cleanup
      try {
        osc1.stop();
        osc2.stop();
        ctx.close();
      } catch (e) {
        // Ignore errors if context already closed
      }
    };
  }, []);

  // Update parameters based on depth, active, and mute state
  useEffect(() => {
    const ctx = audioCtxRef.current;
    const osc1 = osc1Ref.current;
    const osc2 = osc2Ref.current;
    const filter = filterRef.current;
    const gainNode = gainNodeRef.current;
    const distortion = distortionRef.current;

    if (!ctx || !osc1 || !osc2 || !filter || !gainNode || !distortion) return;

    // Ensure audio context is running (browsers require user interaction)
    if (active && audioEnabled && ctx.state === "suspended") {
      const resume = () => {
        ctx.resume();
        window.removeEventListener("click", resume);
        window.removeEventListener("keydown", resume);
      };
      window.addEventListener("click", resume);
      window.addEventListener("keydown", resume);
    }

    const now = ctx.currentTime;

    if (active && audioEnabled) {
      // Calculate target parameters based on depth (max depth around 12)
      const baseFreq = Math.max(35, 55 - (depth - 1) * 1.5);
      const filterFreq = Math.max(80, 120 + (depth - 1) * 8); // open up filter slightly for harshness
      const distAmount = Math.min(40, 5 + (depth - 1) * 3); // increase distortion with depth

      // Apply frequency changes smoothly
      osc1.frequency.setTargetAtTime(baseFreq, now, 1.5);
      osc2.frequency.setTargetAtTime(baseFreq * 1.01, now, 1.5); // slight detune
      filter.frequency.setTargetAtTime(filterFreq, now, 1.0);

      // Adjust distortion curve dynamically
      distortion.curve = makeDistortionCurve(distAmount);

      // Fade volume in
      gainNode.gain.setTargetAtTime(0.25, now, 2.0);
    } else {
      // Fade out
      gainNode.gain.setTargetAtTime(0, now, 0.8);
    }
  }, [depth, active, audioEnabled]);

  return null;
}
