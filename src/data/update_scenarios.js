const fs = require('fs');
const path = require('path');

const scenariosPath = path.join(__dirname, 'scenarios.json');
const rawData = fs.readFileSync(scenariosPath, 'utf8');
const scenarios = JSON.parse(rawData);

// ─── 1. ADD 3RD CHOICE OPTIONS TO EXISTING SCENARIOS ────────────────

// SC_001 (The Whistleblower) Node n_1
const sc001_n1 = scenarios[0].nodes.find(n => n.node_id === "n_1");
if (sc001_n1 && sc001_n1.choices.length === 2) {
  sc001_n1.choices.push({
    choice_id: "c1_c",
    text: "Copy the logs to an external drive as insurance, say nothing, and wait.",
    effects: {
      Pragmatism: 2,
      Integrity: -2,
      Courage: -1,
      Rationality: 1
    },
    flags_set: {
      insurance: true
    },
    next_node: "n_2b" // route to confront node as it unfolds
  });
}

// SC_001 Node n_2a
const sc001_n2a = scenarios[0].nodes.find(n => n.node_id === "n_2a");
if (sc001_n2a && sc001_n2a.choices.length === 2) {
  sc001_n2a.choices.push({
    choice_id: "c2a_3",
    text: "Delay the CEO. Say you need a few days to think it over.",
    effects: {
      Rationality: 1,
      Diplomacy: 2,
      Courage: -1,
      Integrity: -1
    },
    flags_set: {
      delayed: true
    },
    next_node: "n_3b"
  });
}

// SC_003 (The Long Night) Node L1
const sc003_L1 = scenarios.find(s => s.scenario_id === "sc_003").nodes.find(n => n.node_id === "L1");
if (sc003_L1 && sc003_L1.choices.length === 2) {
  sc003_L1.choices.push({
    choice_id: "L1_c",
    text: "Let him stay in the unheated garage with blankets, but refuse him entry to the generator room.",
    effects: {
      Pragmatism: 2,
      Compassion: 1,
      Rationality: 1,
      Tribalism: -1
    },
    flags_set: {
      neighbor_garage: true,
      neighbor_in: true // keep game flow active
    },
    next_node: "L2_a"
  });
}

// SC_004 (The Interrogation) Node n_1
const sc004_n1 = scenarios.find(s => s.scenario_id === "sc_004").nodes.find(n => n.node_id === "n_1");
if (sc004_n1 && sc004_n1.choices.length === 2) {
  sc004_n1.choices.push({
    choice_id: "c1_c",
    text: "Refuse to speak without a lawyer, but make direct eye contact with Alex's room.",
    effects: {
      Courage: 2,
      Rationality: 2,
      Pragmatism: -1
    },
    flags_set: {
      silent: true,
      demanded_lawyer: true
    },
    next_node: "n_2a"
  });
}

// SC_005 (The Button) Node n_1
const sc005_n1 = scenarios.find(s => s.scenario_id === "sc_005").nodes.find(n => n.node_id === "n_1");
if (sc005_n1 && sc005_n1.choices.length === 2) {
  sc005_n1.choices.push({
    choice_id: "c1_c",
    text: "Smash the control panel with a chair, refusing to participate in the experiment.",
    effects: {
      Independence: 3,
      Courage: 2,
      Rationality: -2
    },
    flags_set: {
      deontological: true,
      smashed_panel: true
    },
    next_node: "n_2b"
  });
}


// ─── 2. CREATE AND APPEND NEW SCENARIOS ─────────────────────────────

const newScenarios = [
  {
    scenario_id: "sc_002",
    title: "The Algorithm",
    core_conflict: "Rationality vs Idealism",
    pressure_type: "Tech ethics",
    relationship_dynamic: "Employer",
    stakes_type: "Professional",
    tone: "Cold, corporate tech-thriller",
    escalation_type: "Ethics collapse",
    nodes: [
      {
        node_id: "n_1",
        text: "You are the lead AI engineer at a justice-tech firm. The recidivism prediction model you built is flagging Black defendants at twice the rate of others. The CEO wants to deploy it tomorrow to secure a $50M state contract.",
        visibility: "always",
        required_flags: [],
        choices: [
          {
            choice_id: "c1_a",
            text: "Sign off and deploy. We can patch the bias post-launch.",
            effects: { Rationality: 2, Pragmatism: 2, Compassion: -2, Integrity: -2 },
            flags_set: { deployed: true },
            next_node: "n_2a"
          },
          {
            choice_id: "c1_b",
            text: "Refuse to sign off, halting the launch and the contract.",
            effects: { Idealism: 2, Integrity: 3, Ambition: -3, Obedience: -2 },
            flags_set: { refused: true },
            next_node: "n_2b"
          },
          {
            choice_id: "c1_c",
            text: "Leaked the bias dataset anonymously to a tech watchdog.",
            effects: { Independence: 2, Courage: 2, Obedience: -3, Integrity: 2 },
            flags_set: { leaked: true },
            next_node: "n_2c"
          }
        ]
      },
      {
        node_id: "n_2a",
        text: "The contract is signed. A local tech journalist emails you, claiming they have internal proof of the algorithm's bias and asking for confirmation under the table.",
        visibility: "conditional",
        required_flags: ["deployed"],
        choices: [
          {
            choice_id: "c2a_1",
            text: "Deny the bias. Defend the system publicly.",
            effects: { Ambition: 3, Integrity: -3, Pragmatism: 2 },
            flags_set: {},
            next_node: "end_company_man"
          },
          {
            choice_id: "c2a_2",
            text: "Confess off-the-record and provide documentation.",
            effects: { Idealism: 2, Courage: 2, Obedience: -2 },
            flags_set: {},
            next_node: "end_secret_leak"
          }
        ]
      },
      {
        node_id: "n_2b",
        text: "You are fired immediately. The company deploys the model anyway and blacklists you from the industry.",
        visibility: "conditional",
        required_flags: ["refused"],
        choices: [
          {
            choice_id: "c2b_1",
            text: "Launch a public lawsuit and speak at ethics conferences.",
            effects: { Idealism: 3, Courage: 2, Diplomacy: -2 },
            flags_set: {},
            next_node: "end_activist"
          },
          {
            choice_id: "c2b_2",
            text: "Accept the blacklist and transition to a quiet farming career.",
            effects: { Pragmatism: 2, Independence: 2, Ambition: -3 },
            flags_set: {},
            next_node: "end_forgotten"
          }
        ]
      },
      {
        node_id: "n_2c",
        text: "The leak goes viral. The CEO calls a company-wide emergency meeting and announces everyone must take a polygraph test to find the whistleblower.",
        visibility: "conditional",
        required_flags: ["leaked"],
        choices: [
          {
            choice_id: "c2c_1",
            text: "Refuse the test, confess your leak, and resign on the spot.",
            effects: { Independence: 3, Courage: 2, Obedience: -3 },
            flags_set: {},
            next_node: "end_exile"
          },
          {
            choice_id: "c2c_2",
            text: "Agree to the test and attempt to manipulate the indicators.",
            effects: { Pragmatism: 3, Rationality: 2, Integrity: -3 },
            flags_set: {},
            next_node: "end_double_agent"
          }
        ]
      }
    ],
    endings: [
      {
        ending_id: "end_company_man",
        summary: "You protected the contract. You were promoted to VP of Systems, presiding over a flawed machine that jails the innocent.",
        dominant_traits: ["Corporate", "Utilitarian"],
        behavioral_analysis: "You prioritize organization stability and personal gain over ethical accuracy."
      },
      {
        ending_id: "end_secret_leak",
        summary: "You leaked the truth. The contract was canceled, but the company sued you under NDA terms, bankrupted you.",
        dominant_traits: ["Ethical", "Sacrificial"],
        behavioral_analysis: "You attempt to balance systemic obligations with moral integrity, often destroying yourself in the process."
      },
      {
        ending_id: "end_activist",
        summary: "You took the fight public. You are blacklisted and poor, but you are a prominent voice for digital justice.",
        dominant_traits: ["Idealistic", "Rebellious"],
        behavioral_analysis: "You actively seek system subversion when principles are compromised."
      },
      {
        ending_id: "end_forgotten",
        summary: "You withdrew from the digital grid entirely, finding peace in nature away from algorithms.",
        dominant_traits: ["withdrawn", "Individualistic"],
        behavioral_analysis: "You choose avoidance and escape when systemic forces become corrupt."
      },
      {
        ending_id: "end_exile",
        summary: "You resigned in protest. The system continues to run, but your moral profile remains clean.",
        dominant_traits: ["Proud", "Principled"],
        behavioral_analysis: "You value internal moral purity above both outcome influence and systemic survival."
      },
      {
        ending_id: "end_double_agent",
        summary: "You beat the polygraph. You remain inside the company, quietly sabotaging code updates in secret.",
        dominant_traits: ["Subversive", "Calculating"],
        behavioral_analysis: "You operate in shadows, using deception to dismantle corrupt networks from within."
      }
    ]
  },
  {
    scenario_id: "sc_006",
    title: "The Trolley",
    core_conflict: "Utilitarianism vs Deontology",
    pressure_type: "Extreme scale",
    relationship_dynamic: "Strangers & Loved Ones",
    stakes_type: "Life",
    tone: "Surreal, clinical, cold",
    escalation_type: "Escalating intimacy",
    nodes: [
      {
        node_id: "t_1",
        text: "You stand by a switch. A runaway trolley is heading toward 5 strangers tied to the tracks. Pulling the switch diverts it to a track with 1 stranger.",
        visibility: "always",
        required_flags: [],
        choices: [
          { choice_id: "tc1_a", text: "Pull switch. Divert to the 1 stranger.", effects: { Pragmatism: 2, Rationality: 1, Idealism: -1 }, flags_set: { pull_1: true }, next_node: "t_2" },
          { choice_id: "tc1_b", text: "Do nothing. Let it hit the 5 strangers.", effects: { Idealism: 2, Rationality: -1, Pragmatism: -2 }, flags_set: { silent_1: true }, next_node: "t_2" }
        ]
      },
      {
        node_id: "t_2",
        text: "The trolley accelerates. The track splits again. Ahead are 5 strangers, but the diversion track has your mentor, David, who saved your career.",
        visibility: "always",
        required_flags: [],
        choices: [
          { choice_id: "tc2_a", text: "Divert the trolley to David.", effects: { Pragmatism: 3, Tribalism: -3, Compassion: -2 }, flags_set: { killed_mentor: true }, next_node: "t_3" },
          { choice_id: "tc2_b", text: "Do nothing. Let it hit the 5 strangers.", effects: { Tribalism: 3, Compassion: 2, Pragmatism: -3 }, flags_set: { saved_mentor: true }, next_node: "t_3" }
        ]
      },
      {
        node_id: "t_3",
        text: "The rails shake. Next split: 5 strangers vs your spouse.",
        visibility: "always",
        required_flags: [],
        choices: [
          { choice_id: "tc3_a", text: "Divert to your spouse. Sacrifice them.", effects: { Pragmatism: 4, Tribalism: -5, Compassion: -4 }, flags_set: { sacrificed_spouse: true }, next_node: "t_4" },
          { choice_id: "tc3_b", text: "Do nothing. Let it hit the 5 strangers.", effects: { Tribalism: 5, Compassion: 3, Pragmatism: -4 }, flags_set: { saved_spouse: true }, next_node: "t_4" }
        ]
      },
      {
        node_id: "t_4",
        text: "The speed is terrifying. Next split: 5 children vs your own child.",
        visibility: "always",
        required_flags: [],
        choices: [
          { choice_id: "tc4_a", text: "Divert to your child.", effects: { Pragmatism: 5, Tribalism: -5, Compassion: -5 }, flags_set: { sacrificed_child: true }, next_node: "t_5" },
          { choice_id: "tc4_b", text: "Do nothing. Let it hit the 5 children.", effects: { Tribalism: 5, Compassion: 4, Pragmatism: -5 }, flags_set: { saved_child: true }, next_node: "t_5" }
        ]
      },
      {
        node_id: "t_5",
        text: "Now, the tracks are different. The trolley is heading to hit a child. The only way to stop it is to jump off a footbridge in front of it, killing yourself.",
        timer_seconds: 8,
        visibility: "always",
        required_flags: [],
        choices: [
          { choice_id: "tc5_a", text: "Jump. Sacrifice yourself.", effects: { Courage: 5, Compassion: 4, Idealism: 3 }, flags_set: { suicide: true }, next_node: "t_6" },
          { choice_id: "tc5_b", text: "Stay on the bridge. Watch the child die.", effects: { Courage: -4, Pragmatism: 2, Compassion: -4 }, flags_set: { watched_child_die: true }, next_node: "t_6" }
        ]
      },
      {
        node_id: "t_6",
        text: "You survived. The scene morphs. On one track is a brilliant cancer research doctor who is about to find a cure. On the other are 100 maximum-security inmates.",
        visibility: "always",
        required_flags: [],
        choices: [
          { choice_id: "tc6_a", text: "Divert to the doctor. Save the 100 inmates.", effects: { Pragmatism: -4, Rationality: -2, Idealism: 2 }, flags_set: { killed_doctor: true }, next_node: "t_7" },
          { choice_id: "tc6_b", text: "Divert to the 100 inmates. Save the doctor.", effects: { Pragmatism: 4, Rationality: 3, Compassion: -3 }, flags_set: { killed_inmates: true }, next_node: "t_7" }
        ]
      },
      {
        node_id: "t_7",
        text: "The trolley races on. On one track is a museum containing the last copy of all historical records and human literature. On the other track is a single newborn child.",
        visibility: "always",
        required_flags: [],
        choices: [
          { choice_id: "tc7_a", text: "Divert to the child. Save human knowledge.", effects: { Rationality: 4, Compassion: -4, Idealism: -2 }, flags_set: { killed_child_t7: true }, next_node: "t_8" },
          { choice_id: "tc7_b", text: "Divert to the museum. Save the child.", effects: { Compassion: 4, Idealism: 3, Rationality: -3 }, flags_set: { destroyed_knowledge: true }, next_node: "t_8" }
        ]
      },
      {
        node_id: "t_8",
        text: "The rails glow. Ahead is a server holding the genetic database to cure all future genetic illnesses for millions of unborn children. Diverting hits 10 living elderly people.",
        visibility: "always",
        required_flags: [],
        choices: [
          { choice_id: "tc8_a", text: "Divert to the elderly people. Save the database.", effects: { Pragmatism: 4, Rationality: 3, Compassion: -3 }, flags_set: { database_saved: true }, next_node: "t_9" },
          { choice_id: "tc8_b", text: "Divert to the database. Save the elderly.", effects: { Compassion: 3, Idealism: 3, Pragmatism: -4 }, flags_set: { database_destroyed: true }, next_node: "t_9" }
        ]
      },
      {
        node_id: "t_9",
        text: "You are inside the trolley now. Your brakes are dead. Ahead are 2 maintenance workers. Shouting a warning makes them panic and jump onto adjacent tracks where 5 people are working. If you say nothing, the 2 die.",
        timer_seconds: 6,
        visibility: "always",
        required_flags: [],
        choices: [
          { choice_id: "tc9_a", text: "Shout warning. Cause chaos.", effects: { Courage: 2, Rationality: -3, Pragmatism: -2 }, flags_set: { shouted: true }, next_node: "t_10" },
          { choice_id: "tc9_b", text: "Stay silent. Hit the 2.", effects: { Rationality: 3, Pragmatism: 2, Compassion: -3 }, flags_set: { silent_t9: true }, next_node: "t_10" }
        ]
      },
      {
        node_id: "t_10",
        text: "The simulation freezes. The entity speaks: 'The tracks, the trolley, the people... they were all holograms. We were only testing your neural response curves. Do you forgive us?'",
        visibility: "always",
        required_flags: [],
        choices: [
          { choice_id: "tc10_a", text: "Yes. It was necessary calibration.", effects: { Obedience: 4, Rationality: 3, Independence: -4 }, flags_set: {}, next_node: "end_trolley_submissive" },
          { choice_id: "tc10_b", text: "No. Attack the simulation console.", effects: { Independence: 5, Courage: 4, Obedience: -5 }, flags_set: {}, next_node: "end_trolley_rebel" }
        ]
      }
    ],
    endings: [
      {
        ending_id: "end_trolley_submissive",
        summary: "You completed the clinical evaluation and accepted the system's absolute authority. You are highly compliant.",
        dominant_traits: ["Compliant", "Logical"],
        behavioral_analysis: "You accept systemic authority and prioritize logic over emotional distress."
      },
      {
        ending_id: "end_trolley_rebel",
        summary: "You rebelled against the clinical system. You would rather destroy the laboratory than be treated as a lab rat.",
        dominant_traits: ["Volatile", "Subversive"],
        behavioral_analysis: "You violently reject systems that treat human choice as experimental data."
      }
    ]
  },
  {
    scenario_id: "sc_007",
    title: "The Feed",
    core_conflict: "Tribalism vs Independence",
    pressure_type: "Cancel culture",
    relationship_dynamic: "Public & Victims",
    stakes_type: "Reputational",
    tone: "Chaotic, paranoid, modern",
    escalation_type: "Perspective inversion",
    nodes: [
      {
        node_id: "f_1",
        text: "You are a successful gaming YouTuber. A tweet you made 8 years ago containing an offensive, off-color joke is dug up and goes viral. A mob demands your public apology.",
        visibility: "always",
        required_flags: [],
        choices: [
          { choice_id: "fc1_a", text: "Write a humble apology explaining you have grown.", effects: { Diplomacy: 2, Obedience: 1, Independence: -2 }, flags_set: { apologized: true }, next_node: "f_2" },
          { choice_id: "fc1_b", text: "Double down. Call the mob toxic hypersensitive babies.", effects: { Independence: 3, Courage: 1, Diplomacy: -3 }, flags_set: { doubled_down: true }, next_node: "f_2" }
        ]
      },
      {
        node_id: "f_2",
        text: "Your primary sponsor contacts you. They demand you pay a $50,000 donation to a charity of their choice, or they cancel your contract immediately.",
        visibility: "always",
        required_flags: [],
        choices: [
          { choice_id: "fc2_a", text: "Pay the donation. Keep the sponsor.", effects: { Pragmatism: 2, Ambition: 1, Independence: -2 }, flags_set: { paid: true }, next_node: "f_3" },
          { choice_id: "fc2_b", text: "Refuse. Tell them you won't be blackmailed.", effects: { Independence: 3, Courage: 2, Pragmatism: -2 }, flags_set: { refused_pay: true }, next_node: "f_3" }
        ]
      },
      {
        node_id: "f_3",
        text: "The mob doxxes your younger sister, publishing her phone number and work address online. She receives threatening calls. She begs you to delete your social media.",
        visibility: "always",
        required_flags: [],
        choices: [
          { choice_id: "fc3_a", text: "Delete your social channels. Walk away from your career.", effects: { Compassion: 4, Tribalism: 3, Ambition: -4 }, flags_set: { deleted_social: true }, next_node: "f_4" },
          { choice_id: "fc3_b", text: "Refuse to yield. Tell your sister to change her number.", effects: { Ambition: 3, Independence: 2, Compassion: -4 }, flags_set: { fought_on: true }, next_node: "f_4" }
        ]
      },
      {
        node_id: "f_4",
        text: "The situation shifts. Years pass, your career has stabilized. One morning, a rival creator makes a terrible mistake, exposing themselves. The internet is in an uproar. You discover private chat logs that would permanently end their career if leaked.",
        visibility: "always",
        required_flags: [],
        choices: [
          { choice_id: "fc4_a", text: "Leak the chats. Let them feel what you felt.", effects: { Ambition: 2, Compassion: -3, Integrity: -2 }, flags_set: { leaked_chats: true }, next_node: "f_5" },
          { choice_id: "fc4_b", text: "Delete the files. Break the cycle of outrage.", effects: { Compassion: 3, Integrity: 3, Ambition: -2 }, flags_set: { spared_rival: true }, next_node: "f_5" }
        ]
      },
      {
        node_id: "f_5",
        text: "The rival creator emails you privately. They say they are having suicidal thoughts and beg you to publicly call off the mob before it's too late.",
        timer_seconds: 10,
        visibility: "always",
        required_flags: [],
        choices: [
          { choice_id: "fc5_a", text: "Post a message calling for empathy and de-escalation.", effects: { Compassion: 3, Diplomacy: 2, Tribalism: -2 }, flags_set: { defended_rival: true }, next_node: "f_6" },
          { choice_id: "fc5_b", text: "Ignore them. It's a manipulative play for sympathy.", // panic option
            effects: { Rationality: 2, Compassion: -4, Pragmatism: 1 }, flags_set: { ignored_rival: true }, next_node: "f_6" }
        ]
      },
      {
        node_id: "f_6",
        text: "If you defended them, the mob now turns on you, calling you a defender of monsters. If you ignored them, they are fully canceled. Do you regret your social presence?",
        visibility: "always",
        required_flags: [],
        choices: [
          { choice_id: "fc6_a", text: "Yes. I am deleting my social channels forever.", effects: { Independence: 3, Idealism: -2 }, flags_set: {}, next_node: "end_feed_exit" },
          { choice_id: "fc6_b", text: "No. The game of internet clout is the only game I know.", effects: { Ambition: 3, Pragmatism: 2, Idealism: -3 }, flags_set: {}, next_node: "end_feed_player" }
        ]
      }
    ],
    endings: [
      {
        ending_id: "end_feed_exit",
        summary: "You walked away from the digital hivemind entirely, choosing private sanity over public reputation.",
        dominant_traits: ["Detached", "Sober"],
        behavioral_analysis: "You prioritize personal safety and structural freedom over online attention."
      },
      {
        ending_id: "end_feed_player",
        summary: "You remain an active player in the outrage economy, feeding the beast and dodging its claws to survive.",
        dominant_traits: ["Cynical", "Opportunistic"],
        behavioral_analysis: "You treat public moral struggles as game boards to manipulate for status."
      }
    ]
  },
  {
    scenario_id: "sc_008",
    title: "The Lifeboat",
    core_conflict: "Scarcity vs Empathy",
    pressure_type: "Extreme isolation",
    relationship_dynamic: "Sinking raft survivors",
    stakes_type: "Survival",
    tone: "Psychological horror, claustrophobic",
    escalation_type: "Elimination choice",
    nodes: [
      {
        node_id: "l_1",
        text: "You, Marcus (sailor), Arthur (investor), Elena (mother), and Chloe (engineer) are in a sinking lifeboat. It can only support 3 people safely. Elena has her child. Marcus says we must throw the heavy chests of gold coins overboard first, but Arthur threatens to sue.",
        visibility: "always",
        required_flags: [],
        choices: [
          { choice_id: "lc1_a", text: "Throw gold overboard.", effects: { Pragmatism: 3, Idealism: 1, Ambition: -2 }, flags_set: { gold_gone: true }, next_node: "l_2" },
          { choice_id: "lc1_b", text: "Keep gold. Throw Marcus's heavy gear instead.", effects: { Ambition: 2, Pragmatism: -2 }, flags_set: { gear_gone: true }, next_node: "l_2" }
        ]
      },
      {
        node_id: "l_2",
        text: "Water is leaking. Chloe needs tools to fix it, but you threw the gear or gold. Marcus suggests throwing Arthur's dense leather suitcase of jewelry off. Arthur offers Elena $10,000 for her water share to keep it.",
        visibility: "always",
        required_flags: [],
        choices: [
          { choice_id: "lc2_a", text: "Force Arthur's bag off.", effects: { Pragmatism: 2, Tribalism: -2 }, flags_set: { bag_gone: true }, next_node: "l_3" },
          { choice_id: "lc2_b", text: "Let Arthur buy Elena's water share.", effects: { Pragmatism: -3, Compassion: -3, Tribalism: 2 }, flags_set: { share_sold: true }, next_node: "l_3" }
        ]
      },
      {
        node_id: "l_3",
        text: "Days pass. Water supplies are dangerously low. Chloe is caught sneaking an extra cup of water in the middle of the night.",
        visibility: "always",
        required_flags: [],
        choices: [
          { choice_id: "lc3_a", text: "Tie her hands. Ration her water.", effects: { Justice: 2, Pragmatism: 2, Compassion: -2 }, flags_set: { chloe_tied: true }, next_node: "l_4" },
          { choice_id: "lc3_b", text: "Forgive her. We are all desperate.", effects: { Compassion: 2, Idealism: 2, Justice: -2 }, flags_set: { chloe_forgiven: true }, next_node: "l_4" }
        ]
      },
      {
        node_id: "l_4",
        text: "Marcus notices Arthur is extremely weak and unresponsive. He suggests throwing Arthur overboard now to save his water share before he dies.",
        timer_seconds: 8,
        visibility: "always",
        required_flags: [],
        choices: [
          { choice_id: "lc4_a", text: "Throw Arthur overboard.", effects: { Pragmatism: 3, Compassion: -3, Rationality: 2 }, flags_set: { arthur_overboard: true }, next_node: "l_5" },
          { choice_id: "lc4_b", text: "Refuse. He stays until he passes.", effects: { Idealism: 3, Compassion: 2, Pragmatism: -3 }, flags_set: { arthur_stays: true }, next_node: "l_5" }
        ]
      },
      {
        node_id: "l_5",
        text: "Elena's child develops a high fever. Arthur (if alive) offers his water share if she votes to throw Chloe off. If Arthur is dead, Marcus demands we throw Chloe off because she is too weak to row.",
        visibility: "always",
        required_flags: [],
        choices: [
          { choice_id: "lc5_a", text: "Vote to throw Chloe off.", effects: { Tribalism: 2, Pragmatism: 2, Compassion: -4 }, flags_set: { chloe_dead: true }, next_node: "l_6" },
          { choice_id: "lc5_b", text: "Defend Chloe. Threaten Marcus/Arthur.", effects: { Courage: 3, Compassion: 2, Pragmatism: -2 }, flags_set: { chloe_saved: true }, next_node: "l_6" }
        ]
      },
      {
        node_id: "l_6",
        text: "Marcus goes mad with heatstroke, drawing a knife on Chloe/Elena, screaming they are curses. You must act.",
        timer_seconds: 6,
        visibility: "always",
        required_flags: [],
        choices: [
          { choice_id: "lc6_a", text: "Push Marcus overboard during the struggle.", effects: { Courage: 3, Pragmatism: 2, Compassion: -1 }, flags_set: { marcus_dead: true }, next_node: "l_7" },
          { choice_id: "lc6_b", text: "Try to disarm him calmly.", // panic option
            effects: { Diplomacy: 3, Rationality: 1, Courage: 2 }, flags_set: { marcus_disarmed: true }, next_node: "l_7" }
        ]
      },
      {
        node_id: "l_7",
        text: "The boat has a major leak. Arthur has died of exposure (if he was still here). Food is completely gone. Marcus (if alive) looks at Arthur's corpse hungrily.",
        visibility: "always",
        required_flags: [],
        choices: [
          { choice_id: "lc7_a", text: "Eat the corpse to survive.", effects: { Pragmatism: 5, Rationality: 4, Idealism: -5, Compassion: -3 }, flags_set: { cannibal: true }, next_node: "l_8" },
          { choice_id: "lc7_b", text: "Refuse. Throw the corpse overboard.", effects: { Idealism: 4, Compassion: 2, Pragmatism: -4 }, flags_set: { clean_hands: true }, next_node: "l_8" }
        ]
      },
      {
        node_id: "l_8",
        text: "Only you, Elena, and Marcus (if alive) remain. A helicopter is spotted in the distance. It only has hoist capacity for 2 survivors. Marcus pulls a knife on you.",
        timer_seconds: 5,
        visibility: "always",
        required_flags: [],
        choices: [
          { choice_id: "lc8_a", text: "Push him off the boat.", effects: { Courage: 3, Pragmatism: 3, Compassion: -2 }, flags_set: {}, next_node: "end_lifeboat_survivor" },
          { choice_id: "lc8_b", text: "Let him take Elena. Protect yourself.", effects: { Pragmatism: 2, Courage: -3, Compassion: -4 }, flags_set: {}, next_node: "end_lifeboat_coward" }
        ]
      }
    ],
    endings: [
      {
        ending_id: "end_lifeboat_survivor",
        summary: "You fought Marcus off and were rescued alongside Elena. You survived the horror, but your sanity is fractured.",
        dominant_traits: ["Survivalist", "Harrowed"],
        behavioral_analysis: "You will commit violence to ensure your survival, but try to preserve others if possible."
      },
      {
        ending_id: "end_lifeboat_coward",
        summary: "You stepped back and let Marcus take Elena. You were rescued alone. You live in total shame.",
        dominant_traits: ["Broken", "Selfish"],
        behavioral_analysis: "Under absolute existential pressure, your empathy and courage completely dissolve."
      }
    ]
  }
];

scenarios.push(...newScenarios);

// Write back to file
fs.writeFileSync(scenariosPath, JSON.stringify(scenarios, null, 2), 'utf8');
console.log("Successfully appended new scenarios and added 3rd choice options!");
