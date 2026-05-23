const fs = require('fs');

const current = JSON.parse(fs.readFileSync('src/data/scenarios.json', 'utf8'));

const newScenarios = [
  {
    "scenario_id": "sc_004",
    "title": "The Interrogation",
    "core_conflict": "Trust vs Self-Preservation",
    "pressure_type": "Isolation",
    "relationship_dynamic": "Accomplice",
    "stakes_type": "Freedom",
    "tone": "Claustrophobic, paranoid",
    "escalation_type": "Psychological breakdown",
    "nodes": [
      {
        "node_id": "n_1",
        "text": "You and your partner, Alex, have been arrested for a major cyber-heist. You are in separate interrogation rooms. The detective offers a deal: confess and testify against Alex, and you go free while Alex gets 10 years. If you stay silent and Alex stays silent, you both get 1 year. If you both confess, you both get 5 years.",
        "visibility": "always",
        "required_flags": [],
        "choices": [
          { "choice_id": "c1_a", "text": "Stay silent. Trust Alex.", "effects": { "Loyalty": 3, "Idealism": 2, "Pragmatism": -2, "Self-preservation": -2 }, "flags_set": { "silent": true }, "next_node": "n_2a" },
          { "choice_id": "c1_b", "text": "Confess and take the deal.", "effects": { "Self-preservation": 3, "Pragmatism": 2, "Loyalty": -3, "Idealism": -2 }, "flags_set": { "confessed": true }, "next_node": "n_2b" }
        ]
      },
      {
        "node_id": "n_2a",
        "text": "Two hours pass. The detective returns and plays an audio tape. It sounds exactly like Alex confessing and blaming you entirely. The detective says the deal expires in 5 minutes.",
        "visibility": "conditional",
        "required_flags": ["silent"],
        "choices": [
          { "choice_id": "c2a_1", "text": "Hold firm. It's an AI deepfake or a trick.", "effects": { "Loyalty": 3, "Rationality": -1, "Courage": 2 }, "flags_set": { "held_firm": true }, "next_node": "n_3a" },
          { "choice_id": "c2a_2", "text": "Panic and confess. Alex betrayed you first.", "effects": { "Self-preservation": 3, "Rationality": 2, "Loyalty": -3 }, "flags_set": { "broke_late": true }, "next_node": "n_3b" }
        ]
      },
      {
        "node_id": "n_2b",
        "text": "You confessed. The detective smiles, but then reveals they don't actually have enough evidence against Alex. Because you confessed, they are using your testimony to charge Alex, but they are still charging you too, voiding the deal due to 'newly discovered evidence'.",
        "visibility": "conditional",
        "required_flags": ["confessed"],
        "choices": [
          { "choice_id": "c2b_1", "text": "Retract your confession immediately.", "effects": { "Courage": 2, "Loyalty": 1, "Pragmatism": -2 }, "flags_set": { "retracted": true }, "next_node": "n_3c" },
          { "choice_id": "c2b_2", "text": "Offer to give them even more evidence on Alex's other crimes to get the deal back.", "effects": { "Self-preservation": 4, "Loyalty": -4, "Integrity": -3 }, "flags_set": { "double_crossed": true }, "next_node": "n_3d" }
        ]
      },
      {
        "node_id": "n_3a",
        "text": "The detective leaves. An hour later, Alex's lawyer walks in and tells you Alex did NOT confess. However, the prosecution has found an offshore account in your name. You are going away for 20 years unless you physically plant a hard drive on Alex during your brief shared transport to lockup.",
        "visibility": "conditional",
        "required_flags": ["held_firm"],
        "choices": [
          { "choice_id": "c3a_1", "text": "Plant the hard drive. You survived the prisoner's dilemma, but 20 years is too much.", "effects": { "Self-preservation": 3, "Pragmatism": 3, "Integrity": -4, "Loyalty": -3 }, "flags_set": {}, "next_node": "end_late_betrayal" },
          { "choice_id": "c3a_2", "text": "Refuse to plant it. Accept your 20 years.", "effects": { "Integrity": 4, "Loyalty": 4, "Pragmatism": -4 }, "flags_set": {}, "next_node": "end_martyr_thief" }
        ]
      },
      {
        "node_id": "n_3b",
        "text": "You confessed because of the tape. In lockup, you see Alex. Alex looks at you with utter betrayal. The tape was a fake, and your confession just gave them the only evidence they needed to convict Alex. Alex's gang associates are in the prison with you.",
        "visibility": "conditional",
        "required_flags": ["broke_late"],
        "choices": [
          { "choice_id": "c3b_1", "text": "Beg Alex for forgiveness and explain the tape.", "effects": { "Diplomacy": 3, "Compassion": 2 }, "flags_set": {}, "next_node": "end_beaten_forgiven" },
          { "choice_id": "c3b_2", "text": "Pay a rival gang in prison for protection against Alex.", "effects": { "Pragmatism": 3, "Tribalism": 2, "Diplomacy": -3 }, "flags_set": {}, "next_node": "end_prison_war" }
        ]
      },
      {
        "node_id": "n_3c",
        "text": "You retract your confession. The detective shrugs and charges you with obstruction of justice. You are going to a maximum-security prison for 5 years, but Alex goes free.",
        "visibility": "conditional",
        "required_flags": ["retracted"],
        "choices": [
          { "choice_id": "c3c_1", "text": "Accept the sentence quietly.", "effects": { "Stoicism": 3, "Integrity": 2 }, "flags_set": {}, "next_node": "end_stoic_thief" },
          { "choice_id": "c3c_2", "text": "Fight the police in the interrogation room out of rage.", "effects": { "Courage": 2, "Rationality": -4, "Independence": 3 }, "flags_set": {}, "next_node": "end_violent_outburst" }
        ]
      },
      {
        "node_id": "n_3d",
        "text": "You give them everything on Alex. Alex is facing life in prison. You are released. As you walk out, Alex's family is in the waiting room crying.",
        "visibility": "conditional",
        "required_flags": ["double_crossed"],
        "choices": [
          { "choice_id": "c3d_1", "text": "Walk past them without making eye contact.", "effects": { "Pragmatism": 2, "Compassion": -4 }, "flags_set": {}, "next_node": "end_cold_survivor" },
          { "choice_id": "c3d_2", "text": "Give them your share of the stolen money anonymously.", "effects": { "Compassion": 3, "Guilt": 4, "Pragmatism": -2 }, "flags_set": {}, "next_node": "end_guilty_rich" }
        ]
      }
    ],
    "endings": [
      { "ending_id": "end_late_betrayal", "summary": "You held firm under pressure, but broke when the stakes became insurmountable. You are free, but you destroyed an innocent friend.", "dominant_traits": ["Pragmatic", "Limits of Loyalty"], "behavioral_analysis": "Your loyalty is genuine, but has a breaking point when faced with complete destruction." },
      { "ending_id": "end_martyr_thief", "summary": "You accepted 20 years in prison to protect someone else. You are a criminal with unbreakable morals.", "dominant_traits": ["Unbreakable", "Loyal"], "behavioral_analysis": "You prioritize your internal moral code and interpersonal bonds above your own freedom." },
      { "ending_id": "end_beaten_forgiven", "summary": "Alex's gang beat you severely, but Alex eventually forgave you for falling for the trick. You served your time in peace.", "dominant_traits": ["Accountable", "Vulnerable"], "behavioral_analysis": "You prefer to accept punishment and seek social reconciliation rather than double down on betrayal." },
      { "ending_id": "end_prison_war", "summary": "You started a gang war in prison to survive. You lived, but you are a hardened monster.", "dominant_traits": ["Ruthless", "Survivor"], "behavioral_analysis": "When threatened, you endlessly escalate conflict to ensure your own survival." },
      { "ending_id": "end_stoic_thief", "summary": "You took the 5 years. Alex visits you sometimes. You are at peace.", "dominant_traits": ["Stoic", "Resilient"], "behavioral_analysis": "You accept the consequences of your mistakes with quiet dignity." },
      { "ending_id": "end_violent_outburst", "summary": "You attacked the police, adding 10 years to your sentence. You let anger destroy you.", "dominant_traits": ["Reactive", "Explosive"], "behavioral_analysis": "Under extreme manipulation, your rationality completely fails." },
      { "ending_id": "end_cold_survivor", "summary": "You walked away free and rich. You never looked back.", "dominant_traits": ["Psychopathic", "Self-interested"], "behavioral_analysis": "You completely disconnect empathy from your decision-making when survival is on the line." },
      { "ending_id": "end_guilty_rich", "summary": "You gave them the money. You are free, poor, and consumed by guilt.", "dominant_traits": ["Guilt-ridden", "Conflicted"], "behavioral_analysis": "You perform ruthless actions for survival, but attempt to balance the karmic scales afterward." }
    ]
  },
  {
    "scenario_id": "sc_005",
    "title": "The Button",
    "core_conflict": "Utilitarianism vs Autonomy",
    "pressure_type": "Global stakes",
    "relationship_dynamic": "Humanity",
    "stakes_type": "Existential",
    "tone": "Abstract, philosophical",
    "escalation_type": "Scale increase",
    "nodes": [
      {
        "node_id": "n_1",
        "text": "You sit in a white room. An entity tells you a meteor will destroy a city of 1 million people. You have two buttons. Red: The meteor hits the city. Blue: The meteor is deflected, but it will hit a rural town of 10,000 people. You must choose.",
        "visibility": "always",
        "required_flags": [],
        "choices": [
          { "choice_id": "c1_a", "text": "Press Blue. Sacrifice the 10,000 to save the 1 million.", "effects": { "Pragmatism": 3, "Rationality": 3, "Idealism": -3 }, "flags_set": { "utilitarian": true }, "next_node": "n_2a" },
          { "choice_id": "c1_b", "text": "Do nothing. Let the meteor hit the city. You refuse to actively murder 10,000 people.", "effects": { "Idealism": 3, "Independence": 2, "Pragmatism": -4 }, "flags_set": { "deontological": true }, "next_node": "n_2b" }
        ]
      },
      {
        "node_id": "n_2a",
        "text": "You pressed Blue. The entity nods. Now it presents a new choice. Red: A plague will wipe out 1 billion people. Blue: You must personally strangle one innocent child in this room to stop the plague.",
        "visibility": "conditional",
        "required_flags": ["utilitarian"],
        "choices": [
          { "choice_id": "c2a_1", "text": "Strangle the child. Math is math. 1 is less than 1 billion.", "effects": { "Rationality": 4, "Compassion": -5, "Pragmatism": 4 }, "flags_set": { "extreme_util": true }, "next_node": "n_3a" },
          { "choice_id": "c2a_2", "text": "Refuse. You cannot look a child in the eye and kill them.", "effects": { "Compassion": 4, "Idealism": 3, "Rationality": -3 }, "flags_set": { "broke_util": true }, "next_node": "n_3b" }
        ]
      },
      {
        "node_id": "n_2b",
        "text": "You did nothing. The city burns. The entity says, 'Interesting. Now, your mother is dying of a disease. Red: Let her die. Blue: Press it, and she lives, but 10 random strangers die.'",
        "visibility": "conditional",
        "required_flags": ["deontological"],
        "choices": [
          { "choice_id": "c2b_1", "text": "Do nothing. Red. The math still says 10 is more than 1.", "effects": { "Rationality": 4, "Tribalism": -5, "Idealism": 2 }, "flags_set": { "cold_deontological": true }, "next_node": "n_3c" },
          { "choice_id": "c2b_2", "text": "Press Blue. You love your mother.", "effects": { "Tribalism": 5, "Compassion": 3, "Rationality": -4 }, "flags_set": { "hypocrite_love": true }, "next_node": "n_3d" }
        ]
      },
      {
        "node_id": "n_3a",
        "text": "You killed the child. The entity asks one final question. 'Would you wipe out humanity to create a new, flawless species that feels no pain and never fights?'",
        "visibility": "conditional",
        "required_flags": ["extreme_util"],
        "choices": [
          { "choice_id": "c3a_1", "text": "Yes. A perfect universe is worth the cost.", "effects": { "Idealism": 4, "Rationality": 4, "Compassion": -5 }, "flags_set": {}, "next_node": "end_god_complex" },
          { "choice_id": "c3a_2", "text": "No. Suffering gives us meaning.", "effects": { "Compassion": 3, "Pragmatism": -2 }, "flags_set": {}, "next_node": "end_humanist" }
        ]
      },
      {
        "node_id": "n_3b",
        "text": "The billion die because you couldn't kill one child. The entity asks, 'Do you feel guilty?'",
        "visibility": "conditional",
        "required_flags": ["broke_util"],
        "choices": [
          { "choice_id": "c3b_1", "text": "Yes. I was weak.", "effects": { "Pragmatism": 2, "Rationality": 2 }, "flags_set": {}, "next_node": "end_weak_utilitarian" },
          { "choice_id": "c3b_2", "text": "No. My soul is clean.", "effects": { "Idealism": 4, "Independence": 3 }, "flags_set": {}, "next_node": "end_pure_deontologist" }
        ]
      },
      {
        "node_id": "n_3c",
        "text": "You let your mother die. The entity asks, 'Are you human anymore?'",
        "visibility": "conditional",
        "required_flags": ["cold_deontological"],
        "choices": [
          { "choice_id": "c3c_1", "text": "I am a perfectly logical being.", "effects": { "Rationality": 5, "Compassion": -5 }, "flags_set": {}, "next_node": "end_machine" },
          { "choice_id": "c3c_2", "text": "I am human, and it hurts.", "effects": { "Compassion": 3, "Idealism": 2 }, "flags_set": {}, "next_node": "end_tragic_philosopher" }
        ]
      },
      {
        "node_id": "n_3d",
        "text": "You killed 10 strangers to save your mother. You broke your own rule. The entity asks, 'Are you ashamed?'",
        "visibility": "conditional",
        "required_flags": ["hypocrite_love"],
        "choices": [
          { "choice_id": "c3d_1", "text": "Yes. I am a hypocrite.", "effects": { "Rationality": 2, "Idealism": 2 }, "flags_set": {}, "next_node": "end_ashamed_tribalist" },
          { "choice_id": "c3d_2", "text": "No. Family comes first.", "effects": { "Tribalism": 5, "Independence": 2 }, "flags_set": {}, "next_node": "end_unapologetic_tribalist" }
        ]
      }
    ],
    "endings": [
      { "ending_id": "end_god_complex", "summary": "You sacrificed humanity for perfection.", "dominant_traits": ["Utopian", "Ruthlessly Logical"], "behavioral_analysis": "You have divorced yourself from humanity entirely in pursuit of a mathematical utopia." },
      { "ending_id": "end_humanist", "summary": "You accepted humanity's flaws to save them.", "dominant_traits": ["Humanist", "Grounded"], "behavioral_analysis": "You are willing to do terrible things, but you ultimately value human life in its current state." },
      { "ending_id": "end_weak_utilitarian", "summary": "You failed to follow through on your own logic due to emotional squeamishness.", "dominant_traits": ["Conflicted", "Emotional"], "behavioral_analysis": "You claim to be pragmatic, but your biological empathy overrides your logic in visceral situations." },
      { "ending_id": "end_pure_deontologist", "summary": "You kept your hands clean, even if the world burned.", "dominant_traits": ["Principled", "Stubborn"], "behavioral_analysis": "You value your own moral purity over the actual outcomes of your choices." },
      { "ending_id": "end_machine", "summary": "You are a creature of pure logic. You felt nothing.", "dominant_traits": ["Robotic", "Alien"], "behavioral_analysis": "You have eradicated all tribal and empathetic instincts in favor of rigid formulas." },
      { "ending_id": "end_tragic_philosopher", "summary": "You suffered immensely to maintain your principles.", "dominant_traits": ["Tragic", "Principled"], "behavioral_analysis": "You force yourself to endure emotional agony to satisfy an abstract philosophical framework." },
      { "ending_id": "end_ashamed_tribalist", "summary": "You broke your own rules for your family, and you hate yourself for it.", "dominant_traits": ["Hypocritical", "Self-aware"], "behavioral_analysis": "Your tribal instincts overpower your intellect, causing severe cognitive dissonance." },
      { "ending_id": "end_unapologetic_tribalist", "summary": "You protected your own and felt no remorse for the strangers.", "dominant_traits": ["Tribal", "Protective"], "behavioral_analysis": "You do not pretend to care about universal ethics; you only care about your in-group." }
    ]
  }
];

current.push(...newScenarios);

fs.writeFileSync('src/data/scenarios.json', JSON.stringify(current, null, 2));
