import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AxisScores {
  Integrity: number;
  Courage: number;
  Compassion: number;
  Rationality: number;
  Tribalism: number;
  Independence: number;
  Diplomacy: number;
  Justice: number;
  Ambition: number;
  Pragmatism: number;
  Idealism: number;
  Obedience: number;
}

export interface ScenarioResult {
  scenarioId: string;
  scenarioTitle: string;
  endingId: string;
  endingSummary: string;
  scores: Record<string, number>;
  timestamp: number;
  pathTaken?: string[];
}

export interface AppSettings {
  crtEnabled: boolean;
  audioEnabled: boolean;
  introsEnabled: boolean;
  grainOpacity: number; // 0 to 0.2
  glitchEnabled: boolean;
}

const initialScores: AxisScores = {
  Integrity: 0,
  Courage: 0,
  Compassion: 0,
  Rationality: 0,
  Tribalism: 0,
  Independence: 0,
  Diplomacy: 0,
  Justice: 0,
  Ambition: 0,
  Pragmatism: 0,
  Idealism: 0,
  Obedience: 0,
};

interface ProfileState {
  scores: AxisScores;
  completedScenarios: string[];
  scenarioHistory: ScenarioResult[];
  isOnboarded: boolean;
  calibrationScores: Record<string, number>;
  powerOn: boolean;
  booting: boolean;
  settings: AppSettings;
  addScores: (
    newScores: Record<string, number>,
    scenarioId: string,
    scenarioTitle?: string,
    endingId?: string,
    endingSummary?: string,
    pathTaken?: string[]
  ) => void;
  completeOnboarding: (calibrationScores: Record<string, number>) => void;
  setSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;
  setPowerOn: (value: boolean) => void;
  setBooting: (value: boolean) => void;
  purgeData: () => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      scores: { ...initialScores },
      completedScenarios: [],
      scenarioHistory: [],
      isOnboarded: false,
      calibrationScores: {},
      powerOn: false,
      booting: false,
      settings: {
        crtEnabled: true,
        audioEnabled: true,
        introsEnabled: true,
        grainOpacity: 0.04,
        glitchEnabled: true,
      },
      addScores: (newScores, scenarioId, scenarioTitle = "", endingId = "", endingSummary = "", pathTaken = []) => set((state) => {
        const updatedScores = { ...state.scores };
        const MAX_SCORE = 100;
        const IMPACT_FACTOR = 0.05; // 5% pull per point

        Object.entries(newScores).forEach(([axis, value]) => {
          if (axis in updatedScores) {
            const currentScore = updatedScores[axis as keyof AxisScores] || 0;
            if (value > 0) {
              updatedScores[axis as keyof AxisScores] = currentScore + (value * IMPACT_FACTOR * (MAX_SCORE - currentScore));
            } else if (value < 0) {
              updatedScores[axis as keyof AxisScores] = currentScore + (value * IMPACT_FACTOR * (currentScore + MAX_SCORE));
            }
            updatedScores[axis as keyof AxisScores] = Math.max(-MAX_SCORE, Math.min(MAX_SCORE, updatedScores[axis as keyof AxisScores]));
          }
        });

        const historyEntry: ScenarioResult = {
          scenarioId,
          scenarioTitle,
          endingId,
          endingSummary,
          scores: newScores,
          timestamp: Date.now(),
          pathTaken,
        };

        return {
          scores: updatedScores,
          completedScenarios: [...state.completedScenarios, scenarioId],
          scenarioHistory: [...state.scenarioHistory, historyEntry],
        };
      }),
      completeOnboarding: (calibrationScores) => set(() => ({
        calibrationScores,
        isOnboarded: true,
      })),
      setSetting: (key, value) => set((state) => ({
        settings: {
          ...state.settings,
          [key]: value,
        },
      })),
      setPowerOn: (value) => set({ powerOn: value }),
      setBooting: (value) => set({ booting: value }),
      purgeData: () => set({
        scores: { ...initialScores },
        completedScenarios: [],
        scenarioHistory: [],
        isOnboarded: false,
        calibrationScores: {},
        powerOn: false,
        booting: false,
        settings: {
          crtEnabled: true,
          audioEnabled: true,
          introsEnabled: true,
          grainOpacity: 0.04,
          glitchEnabled: true,
        },
      }),
    }),
    {
      name: 'fracture-profile-storage',
    }
  )
);
