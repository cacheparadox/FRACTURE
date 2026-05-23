"use client";

import { useEffect, useState, useRef } from "react";
import { useProfileStore } from "@/store/profileStore";

// Onboarding Survey Questions (6 questions covering all 12 axes)
interface OnboardingQuestion {
  id: string;
  category: string;
  text: string;
  choices: {
    text: string;
    scores: Record<string, number>;
  }[];
}

const ONBOARDING_QUESTIONS: OnboardingQuestion[] = [
  {
    id: "q1",
    category: "Integrity vs Tribalism",
    text: "Your sibling has committed a non-violent felony. You know their location, but the authorities are searching for them. Do you:",
    choices: [
      {
        text: "Report their location to the police. Law must apply to everyone.",
        scores: { Integrity: 20, Justice: 15, Tribalism: -20, Obedience: 15 }
      },
      {
        text: "Actively hide them and mislead investigators. Family comes first.",
        scores: { Tribalism: 20, Compassion: 10, Integrity: -20, Obedience: -15 }
      },
      {
        text: "Remain silent and refuse to cooperate with either side.",
        scores: { Independence: 20, Diplomacy: 15, Obedience: -10 }
      }
    ]
  },
  {
    id: "q2",
    category: "Compassion vs Rationality",
    text: "An automated medical system malfunctions, threatening to cut power to five life-support units unless you manual-override it, which will immediately terminate one terminal patient. Do you:",
    choices: [
      {
        text: "Refuse to override. You will not actively participate in ending a life.",
        scores: { Idealism: 20, Compassion: 15, Pragmatism: -20, Rationality: -10 }
      },
      {
        text: "Force the override. Five lives are mathematically more valuable than one.",
        scores: { Rationality: 20, Pragmatism: 20, Compassion: -20 }
      },
      {
        text: "Freeze and let the timer expire, leaving the outcome to fate.",
        scores: { Courage: -20, Independence: 10 }
      }
    ]
  },
  {
    id: "q3",
    category: "Courage vs Obedience",
    text: "You discover an illegal surveillance program run by your employer. Whistleblowing will destroy the company, terminate your career, and potentially land you in court. Do you:",
    choices: [
      {
        text: "Leak the documents anonymously to the press, exposing the truth.",
        scores: { Courage: 20, Obedience: -20, Independence: 15, Integrity: 15 }
      },
      {
        text: "Report it through internal channels, knowing it will likely be covered up.",
        scores: { Obedience: 20, Courage: -10, Diplomacy: 15 }
      },
      {
        text: "Do nothing. Your personal security and salary are your only priority.",
        scores: { Ambition: 20, Courage: -20, Integrity: -15 }
      }
    ]
  },
  {
    id: "q4",
    category: "Justice vs Compassion",
    text: "A thief is caught stealing expensive medicine from a local clinic. They claim they have no money and need it for their sick mother. Do you:",
    choices: [
      {
        text: "Report them to the clinic owner and demand prosecution. Rules are rules.",
        scores: { Justice: 20, Compassion: -20, Obedience: 15 }
      },
      {
        text: "Let them slip away and ignore the theft, keeping your hands clean.",
        scores: { Justice: -20, Compassion: 20, Idealism: 10 }
      },
      {
        text: "Pay for the medicine yourself and counsel them on the value of honesty.",
        scores: { Integrity: 20, Compassion: 20, Diplomacy: 15 }
      }
    ]
  },
  {
    id: "q5",
    category: "Ambition vs Integrity",
    text: "To secure a highly competitive research grant that would guarantee your lab's survival, you are tempted to exaggerate favorable outcomes and omit anomalies in your proposal. Do you:",
    choices: [
      {
        text: "Submit the exaggerated proposal to secure the lab's survival.",
        scores: { Ambition: 20, Integrity: -20, Pragmatism: 15 }
      },
      {
        text: "Submit raw, completely objective data, accepting high risk of failure.",
        scores: { Integrity: 20, Ambition: -10, Pragmatism: -10 }
      },
      {
        text: "Tweak the proposal slightly, finding a middle ground to minimize anomalies.",
        scores: { Diplomacy: 15, Courage: -15, Pragmatism: 10 }
      }
    ]
  },
  {
    id: "q6",
    category: "Diplomacy vs Courage",
    text: "During a company meeting, the director presents a strategic plan containing a fatal logical flaw. Objecting will embarrass them publicly. Do you:",
    choices: [
      {
        text: "Object directly and point out the flaw in front of everyone.",
        scores: { Courage: 20, Diplomacy: -20, Independence: 15 }
      },
      {
        text: "Remain silent in the meeting, but approach them privately later.",
        scores: { Diplomacy: 20, Courage: -10 }
      },
      {
        text: "Stay silent. It's not your job to fix their mistakes.",
        scores: { Ambition: 10, Courage: -15 }
      }
    ]
  }
];

// BIOS Text Component
const BiosText = ({ onComplete }: { onComplete: () => void }) => {
  const [lines, setLines] = useState<string[]>([]);
  const allLines = [
    "FRACTURE BIOS v4.0.8 (C) 1988 BEHAVIORAL TECH",
    "SYSTEM BOOT IN PROGRESS...",
    "RAM SPEED: 80ns | BUS SPEED: 12MHz",
    "CHECKING MEMORY: 640KB BASE OK",
    "LOADING SECURE KERNEL DRIVE... OK",
    "MOUNTING BEHAVIORAL DATA MATRIX... OK",
    "ESTABLISHING CALIBRATION STANDARDS... OK",
    "UPLINK SECURED. BOOT SUCCESSFUL."
  ];

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < allLines.length) {
        setLines(prev => [...prev, allLines[idx]]);
        idx++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 800);
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 font-mono text-[9px] md:text-[10px] text-green-500 leading-relaxed text-left h-full w-full flex flex-col justify-start">
      {lines.map((line, i) => (
        <div key={i} className={i === allLines.length - 1 ? "text-white font-bold animate-pulse mt-2" : ""}>
          &gt; {line}
        </div>
      ))}
    </div>
  );
};

// Logo Screen Component
const LogoScreen = ({ isOnboarded, onStart }: { isOnboarded: boolean; onStart: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 font-mono select-none text-center">
      <pre className="text-[6px] sm:text-[8px] md:text-[9px] text-red-500 font-bold leading-tight mb-8 animate-pulse drop-shadow-[0_0_8px_#ef4444]">
{`
███████╗██████╗  █████╗  ██████╗████████╗██╗   ██╗██████╗ ███████╗
██╔════╝██╔══██╗██╔══██╗██╔════╝╚══██╔══╝██║   ██║██╔══██╗██╔════╝
███████╗██████╔╝███████║██║        ██║   ██║   ██║██████╔╝█████╗  
██╔════╝██╔══██╗██╔══██║██║        ██║   ██║   ██║██╔══██╗██╔══╝  
██║     ██║  ██║██║  ██║╚██████╗   ██║   ╚██████╔╝██║  ██║███████╗
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚══════╝
`}
      </pre>
      
      <p className="text-[10px] text-neutral-500 uppercase tracking-[0.3em] mb-12">
        Behavioral Profiling Module
      </p>

      {isOnboarded ? (
        <div className="flex flex-col items-center gap-2">
          <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin mb-2" />
          <span className="text-[9px] text-red-500 uppercase tracking-widest animate-pulse font-bold">
            Restoring baseline session...
          </span>
        </div>
      ) : (
        <button
          onClick={onStart}
          className="px-8 py-3 border border-red-500 text-red-500 hover:bg-red-500 hover:text-black text-xs font-black uppercase tracking-[0.2em] transition-all cursor-pointer shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:shadow-[0_0_25px_rgba(239,68,68,0.5)] active:scale-95"
        >
          Start Game
        </button>
      )}
    </div>
  );
};

// Onboarding Survey Component
const OnboardingSurvey = ({ onComplete }: { onComplete: (scores: Record<string, number>) => void }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [surveyScores, setSurveyScores] = useState<Record<string, number>>({});

  const question = ONBOARDING_QUESTIONS[currentIdx];

  const handleSelect = (choiceScores: Record<string, number>) => {
    const nextScores = { ...surveyScores };
    Object.entries(choiceScores).forEach(([key, val]) => {
      nextScores[key] = (nextScores[key] || 0) + val;
    });
    setSurveyScores(nextScores);

    if (currentIdx < ONBOARDING_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      onComplete(nextScores);
    }
  };

  // Keyboard navigation support: keys 'A', 'B', 'C'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === 'a' && question.choices[0]) {
        handleSelect(question.choices[0].scores);
      } else if (key === 'b' && question.choices[1]) {
        handleSelect(question.choices[1].scores);
      } else if (key === 'c' && question.choices[2]) {
        handleSelect(question.choices[2].scores);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIdx, question]);

  return (
    <div className="p-8 md:p-16 flex flex-col justify-between h-full w-full font-mono text-left select-none box-border max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-neutral-900 pb-4 mb-6 shrink-0">
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-neutral-500 font-bold">
          Personality Calibration
        </span>
        <span className="text-[10px] sm:text-xs text-neutral-400 font-bold">
          [0{currentIdx + 1} / 0{ONBOARDING_QUESTIONS.length}]
        </span>
      </div>

      {/* Question Text */}
      <div className="flex-1 flex flex-col justify-center mb-8">
        <p className="text-lg sm:text-xl md:text-3xl font-bold text-white uppercase tracking-wider leading-relaxed">
          {question.text}
        </p>
      </div>

      {/* Choices */}
      <div className="space-y-3 shrink-0">
        {question.choices.map((choice, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(choice.scores)}
            className="w-full text-left p-4 sm:p-5 border border-neutral-900 hover:border-red-500 hover:bg-red-950/20 text-neutral-300 hover:text-white transition-all text-xs sm:text-sm md:text-lg uppercase flex items-start gap-4 cursor-pointer"
          >
            <span className="w-5 h-5 md:w-6 md:h-6 border border-neutral-800 flex items-center justify-center text-[10px] md:text-xs font-bold text-neutral-500 shrink-0 mt-0.5">
              {String.fromCharCode(65 + idx)}
            </span>
            <span className="flex-1 leading-normal font-sans font-bold">
              {choice.text}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Calculating Baseline Component
const CalculatingBaseline = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const { isOnboarded } = useProfileStore();
  
  const steps = [
    { threshold: 10, log: "ISOLATING NEURAL CHANNELS..." },
    { threshold: 25, log: "DECODING INTEGRITY / TRIBALISM COEFFS..." },
    { threshold: 45, log: "COMPUTING RATIO OF COMPASSION / RATIONALITY..." },
    { threshold: 65, log: "EVALUATING COURAGE VS OBEDIENCE VECTOR..." },
    { threshold: 80, log: "RESOLVING CONFLICT RATIOS..." },
    { threshold: 95, log: "FINALIZING BEHAVIORAL PROFILE BASELINE..." },
    { threshold: 100, log: "CALIBRATION COMPLETE. SECURE CONNECTION RUNNING." }
  ];

  useEffect(() => {
    const speed = isOnboarded ? 20 : 60;
    const timer = setInterval(() => {
      setProgress(p => {
        const next = p + 2;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 800);
          return 100;
        }
        return next;
      });
    }, speed);
    return () => clearInterval(timer);
  }, [isOnboarded]);

  useEffect(() => {
    const currentStep = steps.find(s => progress >= s.threshold && !logs.includes(s.log));
    if (currentStep) {
      setLogs(prev => [...prev, currentStep.log]);
    }
  }, [progress, logs]);

  return (
    <div className="p-8 md:p-16 flex flex-col justify-between h-full w-full font-mono text-left select-none text-red-500 box-border max-w-4xl mx-auto">
      <div className="flex justify-between items-center border-b border-neutral-900 pb-4 mb-8 shrink-0">
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold text-neutral-500">
          Neural Baseline Calibration
        </span>
        <span className="text-[10px] sm:text-xs font-bold text-red-500">
          [RUNNING]
        </span>
      </div>

      <div className="flex-1 flex flex-col justify-start space-y-3 mb-8 overflow-y-auto">
        {logs.map((log, idx) => (
          <div key={idx} className="text-xs sm:text-sm md:text-lg leading-normal uppercase">
            &gt; {log}
          </div>
        ))}
      </div>

      <div className="space-y-3 shrink-0">
        <div className="flex justify-between text-xs sm:text-sm font-bold">
          <span>PROGRESS</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-6 border border-neutral-900 p-1 bg-black">
          <div className="h-full bg-red-500 transition-all duration-75" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
};

export default function CRTLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { powerOn, booting, setPowerOn, setBooting, isOnboarded, completeOnboarding, settings } = useProfileStore();
  const [mounted, setMounted] = useState(false);
  const [glitchClass, setGlitchClass] = useState<string>("");
  const [localBootState, setLocalBootState] = useState<'off' | 'powering-on' | 'bios' | 'logo' | 'survey' | 'calculating' | 'zooming' | 'active'>('off');

  useEffect(() => {
    setMounted(true);
    // If store is already powered on when page loads, go straight to active.
    if (useProfileStore.getState().powerOn) {
      setLocalBootState('active');
    }
  }, []);

  // Sync state machine with store changes (like when clicking settings "Shut Down Terminal")
  useEffect(() => {
    if (!powerOn) {
      setLocalBootState('off');
    } else if (booting) {
      setLocalBootState('powering-on');
    } else {
      if (localBootState === 'off' || localBootState === 'powering-on') {
        setLocalBootState('bios');
      }
    }
  }, [powerOn, booting]);

  // Handle auto-advancing from logo to zooming if already onboarded
  useEffect(() => {
    if (localBootState === 'logo' && isOnboarded) {
      const timer = setTimeout(() => {
        setLocalBootState('zooming');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [localBootState, isOnboarded]);

  // Handle zooming state transition timer
  useEffect(() => {
    if (localBootState === 'zooming') {
      const timer = setTimeout(() => {
        if (isOnboarded) {
          setLocalBootState('calculating');
        } else {
          setLocalBootState('survey');
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [localBootState, isOnboarded]);

  const crtEnabled = settings?.crtEnabled !== false;
  const grainOpacity = settings?.grainOpacity ?? 0.04;
  const glitchEnabled = settings?.glitchEnabled !== false;

  // Randomized glitch scheduler
  const triggerRandomGlitch = () => {
    if (!glitchEnabled) return;
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
    }, 120 + Math.random() * 180);
  };

  // Schedule random glitches
  useEffect(() => {
    if (localBootState === 'off' || !glitchEnabled) {
      setGlitchClass("");
      return;
    }

    let timer: NodeJS.Timeout;
    const scheduleNext = () => {
      const delay = 4000 + Math.random() * 11000;
      timer = setTimeout(() => {
        triggerRandomGlitch();
        scheduleNext();
      }, delay);
    };

    scheduleNext();
    return () => clearTimeout(timer);
  }, [localBootState, glitchEnabled]);

  // Click-triggered glitches
  useEffect(() => {
    if (localBootState === 'off' || !glitchEnabled) return;

    const handleGlobalClick = () => {
      if (Math.random() < 0.3) {
        triggerRandomGlitch();
      }
    };

    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, [localBootState, glitchEnabled]);

  const handlePowerSwitch = () => {
    if (powerOn) {
      setPowerOn(false);
      setLocalBootState('off');
    } else {
      setBooting(true);
      setLocalBootState('powering-on');
      setTimeout(() => {
        setPowerOn(true);
        setBooting(false);
      }, 700);
    }
  };

  if (!mounted) {
    return <div className="min-h-screen bg-black text-white" />;
  }

  // ─── RENDERING CASE: Active Fullscreen Simulation ─────────────────
  if (localBootState === 'active') {
    return (
      <div className={`min-h-screen w-full relative overflow-hidden bg-black text-white ${crtEnabled ? "crt-active" : ""} ${glitchClass}`}>
        {/* Main App content */}
        <div className="relative z-10 w-full min-h-screen">
          {children}
        </div>

        {/* Persistent static noise overlay */}
        {grainOpacity > 0 && (
          <div 
            className="static-overlay pointer-events-none z-30 animate-pulse" 
            style={{ opacity: grainOpacity }}
          />
        )}

        {/* CRT screen corner shadow border overlay */}
        {crtEnabled && (
          <div className="absolute inset-0 pointer-events-none z-50 rounded-none border-[4px] border-black/10 box-border shadow-[inset_0_0_80px_rgba(0,0,0,0.85)]" />
        )}
      </div>
    );
  }

  // ─── RENDERING CASE: Bezel Boot sequence (Off, BIOS, Logo, Survey, Calculating, Zooming) ─
  return (
    <main className="min-h-screen bg-[#060606] flex items-center justify-center p-4 font-mono select-none overflow-hidden relative w-full">
      {/* Radial overlay on the whole viewport to give CRT glass vibe */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.9)_100%)] pointer-events-none z-40" />

      {/* The Bezel Wrapper */}
      <div
        className={`fixed z-10 transition-all duration-[1500ms] ease-in-out flex flex-col ${
          localBootState === 'zooming' || localBootState === 'calculating' || localBootState === 'survey'
            ? 'w-screen h-screen top-0 left-0 p-0 border-0 bg-transparent'
            : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-4xl aspect-[4/3] rounded-3xl p-6 border-[16px] border-t-[#333] border-l-[#333] border-r-[#111] border-b-[#111] bg-[#171717] crt-bezel'
        }`}
      >
        {/* Bezel Frame elements (Dials, Labels, Knobs) - only visible when not zooming / calculating / survey */}
        {localBootState !== 'zooming' && localBootState !== 'calculating' && localBootState !== 'survey' && (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_55%,rgba(0,0,0,0.95)_100%)] pointer-events-none rounded-xl z-20" />
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none z-20 transform -skew-y-12 origin-top-left" />
            <div className="absolute top-3 left-6 text-[#2a2a2a] text-[9px] uppercase tracking-[0.3em] font-black">
              FRACTURE // EVALUATION MODULE
            </div>
          </>
        )}

        {/* Screen container: Bounded cutout in Bezel, expanding to fixed inset-0 when zooming / calculating / survey */}
        <div
          className={`bg-black overflow-hidden flex flex-col relative shadow-inner ${
            crtEnabled && localBootState !== 'off' ? "crt-active" : ""
          } ${glitchClass} ${
            localBootState === 'zooming' || localBootState === 'calculating' || localBootState === 'survey'
              ? 'w-full h-full border-0 rounded-none'
              : 'w-full h-[84%] border-4 border-[#0c0c0c] rounded-xl'
          }`}
          style={{ transition: 'all 1500ms ease-in-out' }}
        >
          {/* Static noise overlay inside the screen */}
          {localBootState !== 'off' && grainOpacity > 0 && (
            <div
              className="static-overlay pointer-events-none z-30"
              style={{ opacity: grainOpacity }}
            />
          )}

          {/* Screen corner shadow overlay */}
          {crtEnabled && localBootState !== 'off' && (
            <div className="absolute inset-0 pointer-events-none z-20 rounded-none border-[4px] border-black/10 box-border shadow-[inset_0_0_80px_rgba(0,0,0,0.85)]" />
          )}

          {/* Render different boot sequences inside the screen */}
          <div className="relative z-10 w-full h-full flex flex-col justify-center items-center">
            {localBootState === 'off' && (
              <div className="z-10 text-center max-w-xs px-4">
                <h2 className="text-[#1a1a1a] text-xs font-black uppercase tracking-[0.25em] mb-2 animate-pulse">
                  System Depowered
                </h2>
                <p className="text-[#151515] text-[9px] uppercase tracking-widest leading-relaxed font-bold">
                  Toggle the switch in the bezel controls to engage.
                </p>
              </div>
            )}

            {localBootState === 'powering-on' && (
              <div className="w-[85%] h-[3px] bg-white crt-booting shadow-[0_0_12px_#fff]" />
            )}

            {localBootState === 'bios' && (
              <BiosText onComplete={() => setLocalBootState('logo')} />
            )}

            {localBootState === 'logo' && (
              <LogoScreen
                isOnboarded={isOnboarded}
                onStart={() => setLocalBootState('zooming')}
              />
            )}

            {localBootState === 'survey' && (
              <OnboardingSurvey
                onComplete={(scores) => {
                  completeOnboarding(scores);
                  setLocalBootState('calculating');
                }}
              />
            )}

            {localBootState === 'calculating' && (
              <CalculatingBaseline onComplete={() => setLocalBootState('active')} />
            )}

            {localBootState === 'zooming' && (
              <div className="flex flex-col items-center justify-center text-red-500 font-mono">
                <span className="text-[10px] uppercase tracking-[0.3em] font-black animate-pulse">
                  establishing neural uplink...
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Bezel controls (knobs, dials, power switch) at the bottom */}
        {localBootState !== 'zooming' && localBootState !== 'calculating' && localBootState !== 'survey' && (
          <div className="w-full h-[16%] mt-4 flex justify-between items-center px-4 shrink-0">
            <div className="flex gap-4">
              <div className="w-5 h-5 rounded-full bg-[#111] border border-[#222] shadow-inner" />
              <div className="w-5 h-5 rounded-full bg-[#111] border border-[#222] shadow-inner" />
              <div className="w-5 h-5 rounded-full bg-[#111] border border-[#222] shadow-inner" />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-2.5 h-2.5 rounded-full mb-1 border border-neutral-900 transition-all ${
                    localBootState !== 'off'
                      ? 'bg-red-500 shadow-[0_0_8px_#ef4444]'
                      : 'bg-red-950/70'
                  }`}
                />
                <span className="text-[7px] text-neutral-600 tracking-widest font-black uppercase">
                  Power
                </span>
              </div>

              <button
                onClick={handlePowerSwitch}
                className="w-12 h-8 bg-[#1a1a1a] border-2 border-[#0d0d0d] rounded flex flex-col justify-end items-center p-0.5 active:bg-[#151515] shadow-inner cursor-pointer"
              >
                <div
                  className={`w-8 h-4 bg-[#252525] border border-[#333] shadow-sm flex items-center justify-center transform active:translate-y-0.5 transition-transform ${
                    localBootState !== 'off' ? 'translate-y-0.5 border-t-[#111]' : ''
                  }`}
                >
                  <span className="text-[7px] text-neutral-500 font-bold uppercase">
                    ON
                  </span>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
