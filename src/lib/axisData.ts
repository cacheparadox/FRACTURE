export interface AxisMeta {
  name: string;
  leftLabel: string;
  rightLabel: string;
  leftDescription: string;
  rightDescription: string;
  description: string;
}

export const AXIS_DATA: Record<string, AxisMeta> = {
  Integrity: {
    name: "Integrity",
    leftLabel: "Deceptive",
    rightLabel: "Righteous",
    leftDescription: "You bend truth to serve your goals. Honesty is a tool, not a virtue.",
    rightDescription: "You hold to principles even when it costs you. Truth is non-negotiable.",
    description: "Measures your relationship with truth and moral consistency under pressure.",
  },
  Courage: {
    name: "Courage",
    leftLabel: "Cautious",
    rightLabel: "Reckless",
    leftDescription: "You calculate risk carefully. Self-preservation guides your choices.",
    rightDescription: "You charge into danger without hesitation. Fear doesn't control you.",
    description: "Measures your willingness to face danger, pain, or social consequences.",
  },
  Compassion: {
    name: "Compassion",
    leftLabel: "Callous",
    rightLabel: "Empathetic",
    leftDescription: "You make decisions without emotional interference. Feelings are noise.",
    rightDescription: "You absorb others' pain as your own. Human suffering moves you to action.",
    description: "Measures how strongly others' emotions influence your decisions.",
  },
  Rationality: {
    name: "Rationality",
    leftLabel: "Emotional",
    rightLabel: "Calculating",
    leftDescription: "Your gut drives your choices. Instinct and feeling are your compass.",
    rightDescription: "You strip emotion from logic. Every decision is an equation.",
    description: "Measures the balance between emotional instinct and analytical reasoning.",
  },
  Tribalism: {
    name: "Tribalism",
    leftLabel: "Individualistic",
    rightLabel: "Loyal",
    leftDescription: "You prioritize universal fairness over personal bonds.",
    rightDescription: "Your people come first, always. Outsiders are not your responsibility.",
    description: "Measures how strongly in-group bonds influence your moral calculus.",
  },
  Independence: {
    name: "Independence",
    leftLabel: "Compliant",
    rightLabel: "Rebellious",
    leftDescription: "You follow systems and authority. Structure provides safety.",
    rightDescription: "You reject imposed rules. Your own judgment is the only authority.",
    description: "Measures your relationship with authority, systems, and external control.",
  },
  Diplomacy: {
    name: "Diplomacy",
    leftLabel: "Confrontational",
    rightLabel: "Pacifist",
    leftDescription: "You face conflict head-on. Directness is efficiency.",
    rightDescription: "You seek compromise and de-escalation. Peace has value.",
    description: "Measures your approach to interpersonal and systemic conflict.",
  },
  Justice: {
    name: "Justice",
    leftLabel: "Merciful",
    rightLabel: "Punitive",
    leftDescription: "You believe in second chances and human fallibility.",
    rightDescription: "You believe in consequences. Actions must have proportional responses.",
    description: "Measures your philosophy on punishment, forgiveness, and accountability.",
  },
  Ambition: {
    name: "Ambition",
    leftLabel: "Content",
    rightLabel: "Ruthless",
    leftDescription: "You accept your current position. Striving is exhausting.",
    rightDescription: "You will climb at any cost. Status and power are the goal.",
    description: "Measures how aggressively you pursue personal advancement.",
  },
  Pragmatism: {
    name: "Pragmatism",
    leftLabel: "Idealistic",
    rightLabel: "Utilitarian",
    leftDescription: "You choose based on principle, even when the outcome is worse.",
    rightDescription: "You choose the option that produces the best measurable outcome.",
    description: "Measures whether you optimize for principles or outcomes.",
  },
  Idealism: {
    name: "Idealism",
    leftLabel: "Cynical",
    rightLabel: "Zealous",
    leftDescription: "You believe systems are broken and people are selfish by default.",
    rightDescription: "You believe in a better world and will fight to create it.",
    description: "Measures your faith in humanity and systemic improvement.",
  },
  Obedience: {
    name: "Obedience",
    leftLabel: "Subversive",
    rightLabel: "Institutional",
    leftDescription: "You work against systems you disagree with. Rules are suggestions.",
    rightDescription: "You trust established systems. Order requires compliance.",
    description: "Measures your compliance with established rules and hierarchies.",
  },
};

export interface Archetype {
  name: string;
  description: string;
  conditions: (scores: Record<string, number>) => boolean;
}

export const ARCHETYPES: Archetype[] = [
  {
    name: "The Surgeon",
    description: "You cut cleanly. Emotion is a contaminant you remove from every incision.",
    conditions: (s) => s.Rationality > 20 && s.Compassion < -10 && s.Pragmatism > 15,
  },
  {
    name: "The Zealot",
    description: "You burn bright for a cause. Compromise is a word for the defeated.",
    conditions: (s) => s.Idealism > 25 && s.Courage > 15 && s.Diplomacy < -10,
  },
  {
    name: "The Ghost",
    description: "You drift through conflict untouched. No bonds, no debts, no traces.",
    conditions: (s) => s.Independence > 25 && s.Tribalism < -15 && s.Ambition < 0,
  },
  {
    name: "The Politician",
    description: "You say what needs to be said. Everyone is a constituent.",
    conditions: (s) => s.Diplomacy > 20 && s.Ambition > 15 && s.Integrity < -10,
  },
  {
    name: "The Martyr",
    description: "You throw yourself on every grenade. Your pain gives your life meaning.",
    conditions: (s) => s.Compassion > 25 && s.Courage > 15 && s.Pragmatism < -15,
  },
  {
    name: "The Warden",
    description: "Rules exist for a reason. You are that reason.",
    conditions: (s) => s.Obedience > 20 && s.Justice > 15 && s.Independence < -10,
  },
  {
    name: "The Nihilist",
    description: "Nothing matters. You've seen behind the curtain and found nothing.",
    conditions: (s) => s.Idealism < -25 && s.Ambition < -10 && s.Pragmatism > 10,
  },
  {
    name: "The Wolf",
    description: "Your pack is sacred. Everyone outside it is prey or irrelevant.",
    conditions: (s) => s.Tribalism > 30 && s.Compassion < 0 && s.Courage > 10,
  },
  {
    name: "The Torch",
    description: "You illuminate corruption wherever you find it, even if the light burns you.",
    conditions: (s) => s.Integrity > 25 && s.Courage > 20 && s.Obedience < -10,
  },
  {
    name: "The Architect",
    description: "You build systems. People are components. The structure must hold.",
    conditions: (s) => s.Rationality > 20 && s.Pragmatism > 20 && s.Compassion < 0,
  },
  {
    name: "The Shepherd",
    description: "You guide, protect, and carry others. Even when they don't deserve it.",
    conditions: (s) => s.Compassion > 20 && s.Tribalism > 15 && s.Justice < 0,
  },
  {
    name: "The Outlaw",
    description: "You live by your own code outside the boundary of rules and societal judgment.",
    conditions: (s) => s.Independence > 20 && s.Obedience < -15 && s.Justice < 0,
  },
  {
    name: "The Arbitrator",
    description: "You resolve conflicts through detached, neutral, and fair reasoning.",
    conditions: (s) => s.Diplomacy > 15 && s.Rationality > 15 && s.Tribalism < 0,
  },
  {
    name: "The Devotee",
    description: "You lose yourself in a group or cause, obeying rules to protect your own.",
    conditions: (s) => s.Tribalism > 20 && s.Obedience > 15 && s.Independence < -10,
  },
  {
    name: "The Rebel",
    description: "You fight authority and tear down oppressive systems head-on.",
    conditions: (s) => s.Independence > 20 && s.Courage > 15 && s.Obedience < -15,
  },
  {
    name: "The Mirror",
    description: "You reflect the expectations of whoever stands before you. Adaptable. Unknowable.",
    conditions: (s) => {
      const values = Object.values(s);
      const max = Math.max(...values.map(Math.abs));
      return max < 15; // No strong convictions
    },
  },
];

export function calculateArchetype(scores: Record<string, number>): Archetype | null {
  for (const archetype of ARCHETYPES) {
    if (archetype.conditions(scores)) {
      return archetype;
    }
  }
  return null;
}

export function calculateConsistency(decisionHistory: Array<Record<string, number>>): number {
  if (decisionHistory.length < 2) return 100;

  // Calculate the standard deviation of each axis across scenarios
  const axisNames = Object.keys(AXIS_DATA);
  let totalVariance = 0;

  for (const axis of axisNames) {
    const values = decisionHistory.map(d => d[axis] || 0);
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const variance = values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / values.length;
    totalVariance += variance;
  }

  // Normalize: low variance = high consistency
  const avgVariance = totalVariance / axisNames.length;
  const consistency = Math.max(0, Math.min(100, 100 - (avgVariance * 2)));
  return Math.round(consistency);
}
