export interface EffectScores {
  [trait: string]: number;
}

export interface FlagSet {
  [flagName: string]: boolean;
}

export interface Choice {
  choice_id: string;
  text: string;
  effects: EffectScores;
  flags_set: FlagSet;
  next_node: string;
  rationale?: string[];
}

export interface Node {
  node_id: string;
  text: string;
  pressure_context: string;
  visibility: "always" | "conditional";
  required_flags: string[];
  choices: Choice[];
  timer_seconds?: number;
}

export interface Ending {
  ending_id: string;
  summary: string;
  dominant_traits: string[];
  behavioral_analysis: string;
}

export interface Scenario {
  scenario_id: string;
  title: string;
  core_conflict: string;
  pressure_type: string;
  relationship_dynamic: string;
  stakes_type: string;
  tone: string;
  escalation_type: string;
  nodes: Node[];
  endings: Ending[];
  difficulty?: "MILD" | "INTENSE" | "BRUTAL";
}
