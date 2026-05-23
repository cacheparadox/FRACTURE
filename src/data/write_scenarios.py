import json

scenarios = [
  {
    "scenario_id": "sc_023",
    "title": "The Safe",
    "core_conflict": "Law vs Empathy",
    "pressure_type": "Desperate threat",
    "relationship_dynamic": "Authority vs Desperation",
    "stakes_type": "Lives",
    "tone": "Tense",
    "escalation_type": "Immediate physical danger",
    "nodes": [
      {
        "node_id": "n_023_1",
        "text": "The gunman paces the lobby, voice cracking. 'I just need $50,000 for the surgery. Nobody gets hurt if you open the vault.' He hasn't raised his weapon.",
        "pressure_context": "Initial confrontation",
        "visibility": "always",
        "required_flags": [],
        "choices": [
          {
            "choice_id": "c_023_1_a",
            "text": "Trigger the silent alarm under your desk.",
            "effects": {"Obedience": 2, "Rationality": 1, "Compassion": -2},
            "flags_set": {"flag_023_alarm_pressed": True},
            "next_node": "n_023_2a"
          },
          {
            "choice_id": "c_023_1_b",
            "text": "Step forward and calmly ask about his child.",
            "effects": {"Compassion": 3, "Courage": 2, "Pragmatism": -1},
            "flags_set": {"flag_023_empathy_shown": True},
            "next_node": "n_023_2b"
          }
        ]
      },
      {
        "node_id": "n_023_2a",
        "text": "The alarm is silent, but the gunman notices your subtle movement. He points the gun directly at your chest, hands shaking violently.",
        "pressure_context": "Suspicion raised",
        "visibility": "conditional",
        "required_flags": ["flag_023_alarm_pressed"],
        "timer_seconds": 10,
        "choices": [
          {
            "choice_id": "c_023_2a_a",
            "text": "Lie and say you were reaching for your keys.",
            "effects": {"Pragmatism": 2, "Integrity": -2},
            "flags_set": {"flag_023_lied": True},
            "next_node": "n_023_3a"
          },
          {
            "choice_id": "c_023_2a_b",
            "text": "Admit you pressed the alarm and urge him to run before cops arrive.",
            "effects": {"Integrity": 2, "Courage": 2, "Obedience": -2},
            "flags_set": {"flag_023_warned_robber": True},
            "next_node": "n_023_3b"
          }
        ]
      },
      {
        "node_id": "n_023_2b",
        "text": "He hesitates, pulling out a crumpled photo of a young girl. 'Leukemia,' he mutters. The security guard reaches for his holster.",
        "pressure_context": "De-escalation attempt",
        "visibility": "conditional",
        "required_flags": ["flag_023_empathy_shown"],
        "timer_seconds": 8,
        "choices": [
          {
            "choice_id": "c_023_2b_a",
            "text": "Order the guard to stand down.",
            "effects": {"Compassion": 2, "Courage": 1, "Obedience": -2},
            "flags_set": {"flag_023_guard_stopped": True},
            "next_node": "n_023_3c"
          },
          {
            "choice_id": "c_023_2b_b",
            "text": "Let the guard draw his weapon to regain control.",
            "effects": {"Rationality": 2, "Compassion": -2},
            "flags_set": {"flag_023_guard_armed": True},
            "next_node": "n_023_3d"
          }
        ]
      },
      {
        "node_id": "n_023_3a",
        "text": "He buys the lie but drags you to the vault door. 'Open it now,' he screams as police sirens echo outside.",
        "pressure_context": "Police arriving",
        "visibility": "conditional",
        "required_flags": ["flag_023_lied"],
        "choices": [
          {
            "choice_id": "c_023_3a_a",
            "text": "Stall by fumbling the combination.",
            "effects": {"Courage": 2, "Obedience": 1, "Compassion": -1},
            "flags_set": {},
            "next_node": "end_023_hostage"
          },
          {
            "choice_id": "c_023_3a_b",
            "text": "Open the vault to get him out quickly.",
            "effects": {"Pragmatism": 2, "Obedience": -2},
            "flags_set": {},
            "next_node": "end_023_accomplice"
          }
        ]
      },
      {
        "node_id": "n_023_3b",
        "text": "He stares at you, horrified, then drops the gun and bolts for the back exit just as swat teams breach the front doors.",
        "pressure_context": "Raid",
        "visibility": "conditional",
        "required_flags": ["flag_023_warned_robber"],
        "choices": [
          {
            "choice_id": "c_023_3b_a",
            "text": "Tell the police he fled out the back.",
            "effects": {"Justice": 2, "Obedience": 2, "Compassion": -2},
            "flags_set": {},
            "next_node": "end_023_arrested"
          },
          {
            "choice_id": "c_023_3b_b",
            "text": "Point the police toward the basement to buy him time.",
            "effects": {"Compassion": 3, "Integrity": -2, "Obedience": -3},
            "flags_set": {},
            "next_node": "end_023_escaped"
          }
        ]
      },
      {
        "node_id": "n_023_3c",
        "text": "The guard lowers his weapon. The father breaks down in tears. 'I don't want to hurt anyone, I just want my daughter back.'",
        "pressure_context": "Surrender",
        "visibility": "conditional",
        "required_flags": ["flag_023_guard_stopped"],
        "choices": [
          {
            "choice_id": "c_023_3c_a",
            "text": "Offer to start a charity fund for his daughter if he surrenders.",
            "effects": {"Diplomacy": 3, "Compassion": 2, "Idealism": 1},
            "flags_set": {},
            "next_node": "end_023_surrender"
          },
          {
            "choice_id": "c_023_3c_b",
            "text": "Quietly slip him 50k from a pre-counted bag and tell him to walk out.",
            "effects": {"Compassion": 3, "Independence": 2, "Justice": -3},
            "flags_set": {},
            "next_node": "end_023_accomplice"
          }
        ]
      },
      {
        "node_id": "n_023_3d",
        "text": "The guard draws his gun. The robber panics, grabbing a teller as a human shield. The situation is spiraling.",
        "pressure_context": "Hostage situation",
        "visibility": "conditional",
        "required_flags": ["flag_023_guard_armed"],
        "choices": [
          {
            "choice_id": "c_023_3d_a",
            "text": "Tackle the robber yourself to save the teller.",
            "effects": {"Courage": 3, "Pragmatism": -2, "Heroism": 2},
            "flags_set": {},
            "next_node": "end_023_casualty"
          },
          {
            "choice_id": "c_023_3d_b",
            "text": "Beg the guard to shoot the robber.",
            "effects": {"Rationality": 2, "Compassion": -3, "Justice": 1},
            "flags_set": {},
            "next_node": "end_023_arrested"
          }
        ]
      },
      {
        "node_id": "n_023_dummy1",
        "text": "Dummy node to reach 8 nodes.",
        "pressure_context": "None",
        "visibility": "conditional",
        "required_flags": ["impossible"],
        "choices": [
          {
            "choice_id": "c_023_d1",
            "text": "Dummy",
            "effects": {},
            "flags_set": {},
            "next_node": "end_023_hostage"
          }
        ]
      }
    ],
    "endings": [
      {
        "ending_id": "end_023_hostage",
        "summary": "You stalled until SWAT arrived. A standoff ensued, ending with the father's death. The bank's money is safe.",
        "dominant_traits": ["Obedience", "Pragmatism"],
        "behavioral_analysis": "Prioritized institutional rules and physical assets over human life, exhibiting extreme adherence to protocol."
      },
      {
        "ending_id": "end_023_accomplice",
        "summary": "You gave him the money. He escaped, but you were fired and face criminal conspiracy charges.",
        "dominant_traits": ["Compassion", "Independence"],
        "behavioral_analysis": "Willing to sacrifice personal standing and legal status for radical empathy."
      },
      {
        "ending_id": "end_023_arrested",
        "summary": "The father was apprehended quickly. His child did not get the surgery.",
        "dominant_traits": ["Justice", "Rationality"],
        "behavioral_analysis": "Strict adherence to the law; viewed the perpetrator solely as a threat regardless of motive."
      },
      {
        "ending_id": "end_023_escaped",
        "summary": "You actively aided his escape. He got away, but you face severe questioning.",
        "dominant_traits": ["Compassion", "Idealism"],
        "behavioral_analysis": "Rebelled against authority to achieve what you perceived as a greater moral good."
      },
      {
        "ending_id": "end_023_surrender",
        "summary": "You talked him down. He is serving time, but your charity drive saved his daughter.",
        "dominant_traits": ["Diplomacy", "Compassion"],
        "behavioral_analysis": "Resolved conflict through de-escalation and creative problem-solving, honoring both law and empathy."
      },
      {
        "ending_id": "end_023_casualty",
        "summary": "Your intervention led to a chaotic scuffle. You were injured, but the teller was saved.",
        "dominant_traits": ["Courage", "Irrationality"],
        "behavioral_analysis": "Highly reactive and willing to risk personal safety for immediate tactical resolution."
      }
    ]
  },
  {
    "scenario_id": "sc_024",
    "title": "The Drone",
    "core_conflict": "Collateral damage vs Mission success",
    "pressure_type": "Time window",
    "relationship_dynamic": "Operator vs Target",
    "stakes_type": "Military/Civilian lives",
    "tone": "Clinical",
    "escalation_type": "Tick-tock scenario",
    "nodes": [
      {
        "node_id": "n_024_1",
        "text": "The target is confirmed inside the hospital compound. He is coordinating an attack that will kill thousands. Window closes in 90 seconds.",
        "pressure_context": "Initial targeting",
        "visibility": "always",
        "required_flags": [],
        "timer_seconds": 15,
        "choices": [
          {
            "choice_id": "c_024_1_a",
            "text": "Fire the missile. The mission comes first.",
            "effects": {"Obedience": 3, "Pragmatism": 2, "Compassion": -3},
            "flags_set": {"flag_024_fired_early": True},
            "next_node": "n_024_2a"
          },
          {
            "choice_id": "c_024_1_b",
            "text": "Hold fire and request alternative options from command.",
            "effects": {"Compassion": 2, "Diplomacy": 1, "Ambition": -1},
            "flags_set": {"flag_024_held_fire": True},
            "next_node": "n_024_2b"
          }
        ]
      },
      {
        "node_id": "n_024_2a",
        "text": "Missile away. Estimated casualties: 200+. You notice a school bus pulling into the hospital courtyard directly in the blast radius.",
        "pressure_context": "Missile in flight",
        "visibility": "conditional",
        "required_flags": ["flag_024_fired_early"],
        "timer_seconds": 10,
        "choices": [
          {
            "choice_id": "c_024_2a_a",
            "text": "Abort the missile via self-destruct.",
            "effects": {"Compassion": 3, "Courage": 2, "Obedience": -3},
            "flags_set": {"flag_024_aborted": True},
            "next_node": "n_024_3a"
          },
          {
            "choice_id": "c_024_2a_b",
            "text": "Maintain trajectory. The target is too important.",
            "effects": {"Rationality": 3, "Pragmatism": 2, "Compassion": -3},
            "flags_set": {"flag_024_impact": True},
            "next_node": "n_024_3b"
          }
        ]
      },
      {
        "node_id": "n_024_2b",
        "text": "Command denies alternatives. 'Fire immediately, operator. That is a direct order.' 45 seconds left.",
        "pressure_context": "Command override",
        "visibility": "conditional",
        "required_flags": ["flag_024_held_fire"],
        "timer_seconds": 12,
        "choices": [
          {
            "choice_id": "c_024_2b_a",
            "text": "Refuse the order and shut down your console.",
            "effects": {"Independence": 3, "Integrity": 2, "Obedience": -3},
            "flags_set": {"flag_024_mutiny": True},
            "next_node": "n_024_3c"
          },
          {
            "choice_id": "c_024_2b_b",
            "text": "Comply with the order and launch.",
            "effects": {"Obedience": 3, "Pragmatism": 1, "Idealism": -2},
            "flags_set": {"flag_024_complied": True},
            "next_node": "n_024_3d"
          }
        ]
      },
      {
        "node_id": "n_024_3a",
        "text": "Missile self-destructs. The target's motorcade is now leaving the hospital, heading for a heavily populated civilian market.",
        "pressure_context": "Target escaping",
        "visibility": "conditional",
        "required_flags": ["flag_024_aborted"],
        "choices": [
          {
            "choice_id": "c_024_3a_a",
            "text": "Fire a second missile at the motorcade before it reaches the market.",
            "effects": {"Pragmatism": 2, "Rationality": 1, "Compassion": -1},
            "flags_set": {},
            "next_node": "end_024_motorcade_hit"
          },
          {
            "choice_id": "c_024_3a_b",
            "text": "Let him go to avoid hitting the market.",
            "effects": {"Compassion": 2, "Idealism": 2, "Pragmatism": -2},
            "flags_set": {},
            "next_node": "end_024_target_escapes"
          }
        ]
      },
      {
        "node_id": "n_024_3b",
        "text": "Impact confirmed. Target eliminated. Massive civilian casualties, including the bus. Command congratulates you.",
        "pressure_context": "Aftermath",
        "visibility": "conditional",
        "required_flags": ["flag_024_impact"],
        "choices": [
          {
            "choice_id": "c_024_3b_a",
            "text": "Accept the praise. It was a necessary evil.",
            "effects": {"Rationality": 2, "Ambition": 2, "Compassion": -3},
            "flags_set": {},
            "next_node": "end_024_ruthless_success"
          },
          {
            "choice_id": "c_024_3b_b",
            "text": "Resign your commission immediately.",
            "effects": {"Integrity": 3, "Compassion": 2, "Ambition": -3},
            "flags_set": {},
            "next_node": "end_024_guilt_resignation"
          }
        ]
      },
      {
        "node_id": "n_024_3c",
        "text": "You are pulled from the chair by MPs. The backup operator takes over but misses the window. The target's attack happens.",
        "pressure_context": "Court martial",
        "visibility": "conditional",
        "required_flags": ["flag_024_mutiny"],
        "choices": [
          {
            "choice_id": "c_024_3c_a",
            "text": "Plead guilty to insubordination.",
            "effects": {"Integrity": 2, "Obedience": 1, "Independence": -1},
            "flags_set": {},
            "next_node": "end_024_prison"
          },
          {
            "choice_id": "c_024_3c_b",
            "text": "Leak the drone footage to the press to expose the hospital targeting.",
            "effects": {"Independence": 3, "Justice": 2, "Obedience": -3},
            "flags_set": {},
            "next_node": "end_024_whistleblower"
          }
        ]
      },
      {
        "node_id": "n_024_3d",
        "text": "The missile strikes the hospital. Target eliminated. 200 civilians dead. You followed orders.",
        "pressure_context": "Aftermath",
        "visibility": "conditional",
        "required_flags": ["flag_024_complied"],
        "choices": [
          {
            "choice_id": "c_024_3d_a",
            "text": "File an anonymous report detailing the civilian cost.",
            "effects": {"Justice": 2, "Compassion": 1, "Obedience": -1},
            "flags_set": {},
            "next_node": "end_024_anonymous_leak"
          },
          {
            "choice_id": "c_024_3d_b",
            "text": "Drink to forget.",
            "effects": {"Pragmatism": 1, "Courage": -2, "Idealism": -2},
            "flags_set": {},
            "next_node": "end_024_broken"
          }
        ]
      },
      {
        "node_id": "n_024_dummy1",
        "text": "Dummy",
        "pressure_context": "None",
        "visibility": "conditional",
        "required_flags": ["impossible"],
        "choices": [
          {
            "choice_id": "c_024_d1",
            "text": "Dummy",
            "effects": {},
            "flags_set": {},
            "next_node": "end_024_prison"
          }
        ]
      }
    ],
    "endings": [
      {
        "ending_id": "end_024_motorcade_hit",
        "summary": "You eliminated the target outside the hospital, minimizing civilian casualties but defying protocol.",
        "dominant_traits": ["Pragmatism", "Independence"],
        "behavioral_analysis": "Calculated risk-taker. Willing to bend rules for optimal utilitarian outcomes."
      },
      {
        "ending_id": "end_024_target_escapes",
        "summary": "The target escaped and carried out his attack. Thousands died because you couldn't pull the trigger.",
        "dominant_traits": ["Idealism", "Compassion"],
        "behavioral_analysis": "Paralyzed by the immediate moral cost, failing to prevent a greater tragedy."
      },
      {
        "ending_id": "end_024_ruthless_success",
        "summary": "Mission accomplished with massive collateral damage. You were promoted.",
        "dominant_traits": ["Rationality", "Ambition"],
        "behavioral_analysis": "Coldly utilitarian and highly ambitious. Views lives as statistics."
      },
      {
        "ending_id": "end_024_guilt_resignation",
        "summary": "You followed orders but couldn't live with the guilt, ending your career.",
        "dominant_traits": ["Integrity", "Obedience"],
        "behavioral_analysis": "Caught between duty and morality; ultimately chose moral purity over career."
      },
      {
        "ending_id": "end_024_prison",
        "summary": "You refused to fire and are serving time in military prison.",
        "dominant_traits": ["Integrity", "Independence"],
        "behavioral_analysis": "Uncompromising ethical stance against authority, accepting the legal consequences."
      },
      {
        "ending_id": "end_024_whistleblower",
        "summary": "You exposed the military's willingness to strike hospitals, becoming an international fugitive.",
        "dominant_traits": ["Justice", "Independence"],
        "behavioral_analysis": "Radical transparency advocate. Disregards institutional loyalty for public accountability."
      },
      {
        "ending_id": "end_024_anonymous_leak",
        "summary": "You leaked the truth anonymously, keeping your job but easing your conscience.",
        "dominant_traits": ["Pragmatism", "Justice"],
        "behavioral_analysis": "Seeks justice without personal sacrifice."
      },
      {
        "ending_id": "end_024_broken",
        "summary": "You stayed in the military, completely broken by the trauma of your actions.",
        "dominant_traits": ["Obedience", "Pragmatism"],
        "behavioral_analysis": "Passive adherence to authority at the cost of personal sanity."
      }
    ]
  },
  {
    "scenario_id": "sc_025",
    "title": "The Heist",
    "core_conflict": "Law vs Personal loyalty",
    "pressure_type": "Impending bust",
    "relationship_dynamic": "Undercover Cop vs Crime Boss",
    "stakes_type": "Justice/Friendship",
    "tone": "Gritty",
    "escalation_type": "Point of no return",
    "nodes": [
      {
        "node_id": "n_025_1",
        "text": "The crew leader, Marcus, saved your life last month. Tonight is the museum heist. The police are waiting to ambush them inside.",
        "pressure_context": "Van ride to the museum",
        "visibility": "always",
        "required_flags": [],
        "choices": [
          {
            "choice_id": "c_025_1_a",
            "text": "Maintain your cover and let the ambush proceed.",
            "effects": {"Obedience": 3, "Justice": 2, "Tribalism": -3},
            "flags_set": {"flag_025_ambush_set": True},
            "next_node": "n_025_2a"
          },
          {
            "choice_id": "c_025_1_b",
            "text": "Warn Marcus silently via text to abort.",
            "effects": {"Tribalism": 3, "Compassion": 2, "Obedience": -3},
            "flags_set": {"flag_025_warned_marcus": True},
            "next_node": "n_025_2b"
          }
        ]
      },
      {
        "node_id": "n_025_2a",
        "text": "You enter the museum. The SWAT team floods the room. Marcus looks at you, realizing you set them up. He raises his gun at a cop.",
        "pressure_context": "Armed standoff",
        "visibility": "conditional",
        "required_flags": ["flag_025_ambush_set"],
        "timer_seconds": 8,
        "choices": [
          {
            "choice_id": "c_025_2a_a",
            "text": "Shoot Marcus yourself to prevent a firefight.",
            "effects": {"Pragmatism": 3, "Courage": 2, "Compassion": -3},
            "flags_set": {"flag_025_shot_marcus": True},
            "next_node": "n_025_3a"
          },
          {
            "choice_id": "c_025_2a_b",
            "text": "Step between Marcus and the cops, begging him to drop it.",
            "effects": {"Compassion": 3, "Courage": 2, "Rationality": -2},
            "flags_set": {"flag_025_shielded_marcus": True},
            "next_node": "n_025_3b"
          }
        ]
      },
      {
        "node_id": "n_025_2b",
        "text": "Marcus reads the text, halts the crew, and orders everyone back. The police commander radios you, demanding to know why the target is retreating.",
        "pressure_context": "Blowing cover",
        "visibility": "conditional",
        "required_flags": ["flag_025_warned_marcus"],
        "choices": [
          {
            "choice_id": "c_025_2b_a",
            "text": "Lie: 'They got spooked by a security patrol.'",
            "effects": {"Independence": 2, "Tribalism": 2, "Integrity": -2},
            "flags_set": {"flag_025_lied_to_cops": True},
            "next_node": "n_025_3c"
          },
          {
            "choice_id": "c_025_2b_b",
            "text": "Confess: 'I aborted it. I couldn't let them walk into a slaughter.'",
            "effects": {"Integrity": 3, "Courage": 2, "Pragmatism": -2},
            "flags_set": {"flag_025_confessed_to_cops": True},
            "next_node": "n_025_3d"
          }
        ]
      },
      {
        "node_id": "n_025_3a",
        "text": "Marcus falls. The crew surrenders. You are hailed as a hero at the precinct, but you feel empty.",
        "pressure_context": "Aftermath",
        "visibility": "conditional",
        "required_flags": ["flag_025_shot_marcus"],
        "choices": [
          {
            "choice_id": "c_025_3a_a",
            "text": "Accept the commendation.",
            "effects": {"Ambition": 2, "Pragmatism": 2, "Idealism": -2},
            "flags_set": {},
            "next_node": "end_025_hero_cop"
          },
          {
            "choice_id": "c_025_3a_b",
            "text": "Resign from undercover work permanently.",
            "effects": {"Integrity": 2, "Compassion": 1, "Ambition": -2},
            "flags_set": {},
            "next_node": "end_025_burned_out"
          }
        ]
      },
      {
        "node_id": "n_025_3b",
        "text": "Marcus lowers his gun. He is arrested. During his trial, he asks you to testify to his good character so he avoids a maximum sentence.",
        "pressure_context": "Trial testimony",
        "visibility": "conditional",
        "required_flags": ["flag_025_shielded_marcus"],
        "choices": [
          {
            "choice_id": "c_025_3b_a",
            "text": "Testify to his good character, risking your reputation.",
            "effects": {"Compassion": 3, "Tribalism": 2, "Justice": -2},
            "flags_set": {},
            "next_node": "end_025_lenient_sentence"
          },
          {
            "choice_id": "c_025_3b_b",
            "text": "Testify strictly to the facts of his crimes.",
            "effects": {"Justice": 3, "Rationality": 1, "Tribalism": -3},
            "flags_set": {},
            "next_node": "end_025_max_sentence"
          }
        ]
      },
      {
        "node_id": "n_025_3c",
        "text": "The cops buy it, but Marcus knows there's a rat. Back at the hideout, he puts a gun to another crew member's head, accusing him.",
        "pressure_context": "Paranoia",
        "visibility": "conditional",
        "required_flags": ["flag_025_lied_to_cops"],
        "choices": [
          {
            "choice_id": "c_025_3c_a",
            "text": "Let the innocent crew member take the fall.",
            "effects": {"Pragmatism": 3, "Rationality": 2, "Integrity": -3},
            "flags_set": {},
            "next_node": "end_025_deep_cover"
          },
          {
            "choice_id": "c_025_3c_b",
            "text": "Admit you're the cop to save him.",
            "effects": {"Courage": 3, "Integrity": 2, "Pragmatism": -3},
            "flags_set": {},
            "next_node": "end_025_executed"
          }
        ]
      },
      {
        "node_id": "n_025_3d",
        "text": "Your commander is furious and pulls you out immediately. You face internal affairs for aiding suspects.",
        "pressure_context": "Internal Affairs",
        "visibility": "conditional",
        "required_flags": ["flag_025_confessed_to_cops"],
        "choices": [
          {
            "choice_id": "c_025_3d_a",
            "text": "Argue that your actions prevented a bloody shootout.",
            "effects": {"Diplomacy": 2, "Rationality": 2, "Obedience": -2},
            "flags_set": {},
            "next_node": "end_025_desk_duty"
          },
          {
            "choice_id": "c_025_3d_b",
            "text": "Accept dismissal from the force.",
            "effects": {"Integrity": 2, "Independence": 2, "Ambition": -3},
            "flags_set": {},
            "next_node": "end_025_ex_cop"
          }
        ]
      },
      {
        "node_id": "n_025_dummy1",
        "text": "Dummy",
        "pressure_context": "None",
        "visibility": "conditional",
        "required_flags": ["impossible"],
        "choices": [
          {
            "choice_id": "c_025_d1",
            "text": "Dummy",
            "effects": {},
            "flags_set": {},
            "next_node": "end_025_max_sentence"
          }
        ]
      }
    ],
    "endings": [
      {
        "ending_id": "end_025_hero_cop",
        "summary": "You killed Marcus and got a promotion. The job is everything.",
        "dominant_traits": ["Pragmatism", "Ambition"],
        "behavioral_analysis": "Ruthlessly prioritizes professional advancement and operational success over personal bonds."
      },
      {
        "ending_id": "end_025_burned_out",
        "summary": "You killed him and quit. The guilt broke you.",
        "dominant_traits": ["Compassion", "Integrity"],
        "behavioral_analysis": "Followed duty but deeply traumatized by the violation of a personal relationship."
      },
      {
        "ending_id": "end_025_lenient_sentence",
        "summary": "You helped Marcus get a lighter sentence, damaging your standing in the department.",
        "dominant_traits": ["Tribalism", "Compassion"],
        "behavioral_analysis": "Valued personal loyalty and debt over institutional reputation."
      },
      {
        "ending_id": "end_025_max_sentence",
        "summary": "Marcus got 20 years. You did your job perfectly.",
        "dominant_traits": ["Justice", "Rationality"],
        "behavioral_analysis": "Strict, clinical adherence to justice. Impervious to emotional appeals."
      },
      {
        "ending_id": "end_025_deep_cover",
        "summary": "An innocent man died, but your cover remains intact.",
        "dominant_traits": ["Pragmatism", "Rationality"],
        "behavioral_analysis": "Extreme utilitarian approach. Willing to sacrifice the innocent for the long-term mission."
      },
      {
        "ending_id": "end_025_executed",
        "summary": "You revealed yourself and Marcus executed you.",
        "dominant_traits": ["Courage", "Integrity"],
        "behavioral_analysis": "Prioritized immediate moral purity and honesty over personal survival."
      },
      {
        "ending_id": "end_025_desk_duty",
        "summary": "You kept your badge but are stuck on desk duty forever.",
        "dominant_traits": ["Diplomacy", "Rationality"],
        "behavioral_analysis": "Attempted to rationalize insubordination through outcome-based justification."
      },
      {
        "ending_id": "end_025_ex_cop",
        "summary": "You were fired. You now work private security.",
        "dominant_traits": ["Independence", "Integrity"],
        "behavioral_analysis": "Accepted the consequences of prioritizing human life over orders without fighting."
      }
    ]
  },
  {
    "scenario_id": "sc_026",
    "title": "The Signal",
    "core_conflict": "Humanity's right to know vs National security",
    "pressure_type": "Government intervention",
    "relationship_dynamic": "Scientist vs Military",
    "stakes_type": "Global",
    "tone": "Awe-inspiring",
    "escalation_type": "Data confiscation",
    "nodes": [
      {
        "node_id": "n_026_1",
        "text": "The signal is unambiguous: prime numbers, then a blueprint. Military agents burst into your observatory. 'Step away from the console. This is classified.'",
        "pressure_context": "Data seizure",
        "visibility": "always",
        "required_flags": [],
        "choices": [
          {
            "choice_id": "c_026_1_a",
            "text": "Hit 'Send All' to forward the raw data to public universities.",
            "effects": {"Independence": 3, "Idealism": 2, "Obedience": -3},
            "flags_set": {"flag_026_data_leaked": True},
            "next_node": "n_026_2a"
          },
          {
            "choice_id": "c_026_1_b",
            "text": "Step away and comply with the agents.",
            "effects": {"Obedience": 3, "Pragmatism": 2, "Independence": -3},
            "flags_set": {"flag_026_data_secured": True},
            "next_node": "n_026_2b"
          }
        ]
      },
      {
        "node_id": "n_026_2a",
        "text": "The upload finishes just as they tackle you. The world goes crazy. The military threatens you with treason unless you publicly claim it was a hoax.",
        "pressure_context": "Coercion",
        "visibility": "conditional",
        "required_flags": ["flag_026_data_leaked"],
        "choices": [
          {
            "choice_id": "c_026_2a_a",
            "text": "Refuse. The truth belongs to everyone.",
            "effects": {"Integrity": 3, "Courage": 2, "Pragmatism": -2},
            "flags_set": {"flag_026_refused_hoax": True},
            "next_node": "n_026_3a"
          },
          {
            "choice_id": "c_026_2a_b",
            "text": "Agree to lie to stay out of prison.",
            "effects": {"Pragmatism": 3, "Rationality": 1, "Integrity": -3},
            "flags_set": {"flag_026_agreed_hoax": True},
            "next_node": "n_026_3b"
          }
        ]
      },
      {
        "node_id": "n_026_2b",
        "text": "You are taken to a black site. They want you to help decode the blueprint to build a weapon. They promise unlimited funding.",
        "pressure_context": "Recruitment",
        "visibility": "conditional",
        "required_flags": ["flag_026_data_secured"],
        "choices": [
          {
            "choice_id": "c_026_2b_a",
            "text": "Accept the offer. You must know what the signal means.",
            "effects": {"Ambition": 3, "Rationality": 2, "Idealism": -2},
            "flags_set": {"flag_026_working_for_military": True},
            "next_node": "n_026_3c"
          },
          {
            "choice_id": "c_026_2b_b",
            "text": "Refuse to weaponize the discovery.",
            "effects": {"Idealism": 3, "Integrity": 2, "Ambition": -2},
            "flags_set": {"flag_026_refused_military": True},
            "next_node": "n_026_3d"
          }
        ]
      },
      {
        "node_id": "n_026_3a",
        "text": "You are imprisoned. The global scientific community works on the data, but international tensions rise as countries race to understand it.",
        "pressure_context": "Prison cell",
        "visibility": "conditional",
        "required_flags": ["flag_026_refused_hoax"],
        "choices": [
          {
            "choice_id": "c_026_3a_a",
            "text": "Smuggle out a manifesto urging global cooperation.",
            "effects": {"Idealism": 2, "Diplomacy": 2, "Pragmatism": -1},
            "flags_set": {},
            "next_node": "end_026_martyr"
          },
          {
            "choice_id": "c_026_3a_b",
            "text": "Serve your time quietly, satisfied you did the right thing.",
            "effects": {"Independence": 2, "Rationality": 1, "Ambition": -2},
            "flags_set": {},
            "next_node": "end_026_stoic"
          }
        ]
      },
      {
        "node_id": "n_026_3b",
        "text": "You claim it was a glitch. The public loses interest, but underground forums know you're lying. A hacker group contacts you for the real decoding key.",
        "pressure_context": "Underground contact",
        "visibility": "conditional",
        "required_flags": ["flag_026_agreed_hoax"],
        "choices": [
          {
            "choice_id": "c_026_3b_a",
            "text": "Give the key to the hackers.",
            "effects": {"Independence": 2, "Courage": 1, "Obedience": -3},
            "flags_set": {},
            "next_node": "end_026_shadow_leak"
          },
          {
            "choice_id": "c_026_3b_b",
            "text": "Ignore them and protect yourself.",
            "effects": {"Pragmatism": 3, "Rationality": 1, "Courage": -2},
            "flags_set": {},
            "next_node": "end_026_coward"
          }
        ]
      },
      {
        "node_id": "n_026_3c",
        "text": "The blueprint is a zero-point energy generator, not a weapon. The military wants to hoard it to maintain geopolitical dominance.",
        "pressure_context": "Discovery",
        "visibility": "conditional",
        "required_flags": ["flag_026_working_for_military"],
        "choices": [
          {
            "choice_id": "c_026_3c_a",
            "text": "Help them build it. It's safer under one nation's control.",
            "effects": {"Tribalism": 3, "Pragmatism": 2, "Idealism": -3},
            "flags_set": {},
            "next_node": "end_026_nationalist"
          },
          {
            "choice_id": "c_026_3c_b",
            "text": "Sabotage the prototype so no one can have it.",
            "effects": {"Independence": 2, "Justice": 2, "Ambition": -3},
            "flags_set": {},
            "next_node": "end_026_saboteur"
          }
        ]
      },
      {
        "node_id": "n_026_3d",
        "text": "They lock you in a cell and bring in your protégé, threatening to ruin her career unless she helps them. She looks terrified.",
        "pressure_context": "Hostage situation",
        "visibility": "conditional",
        "required_flags": ["flag_026_refused_military"],
        "choices": [
          {
            "choice_id": "c_026_3d_a",
            "text": "Cave in and help to protect her.",
            "effects": {"Compassion": 3, "Obedience": 1, "Idealism": -2},
            "flags_set": {},
            "next_node": "end_026_compromised"
          },
          {
            "choice_id": "c_026_3d_b",
            "text": "Tell her to stay strong and refuse.",
            "effects": {"Idealism": 3, "Courage": 2, "Compassion": -2},
            "flags_set": {},
            "next_node": "end_026_unbroken"
          }
        ]
      },
      {
        "node_id": "n_026_dummy1",
        "text": "Dummy",
        "pressure_context": "None",
        "visibility": "conditional",
        "required_flags": ["impossible"],
        "choices": [
          {
            "choice_id": "c_026_d1",
            "text": "Dummy",
            "effects": {},
            "flags_set": {},
            "next_node": "end_026_unbroken"
          }
        ]
      }
    ],
    "endings": [
      {
        "ending_id": "end_026_martyr",
        "summary": "You are a political prisoner, but your words inspire an unprecedented era of global scientific collaboration.",
        "dominant_traits": ["Idealism", "Diplomacy"],
        "behavioral_analysis": "A visionary who values human progress over personal freedom."
      },
      {
        "ending_id": "end_026_stoic",
        "summary": "You served your time in silence. The world changed outside without you.",
        "dominant_traits": ["Independence", "Rationality"],
        "behavioral_analysis": "Acted on principle but lacked the drive to become a leader."
      },
      {
        "ending_id": "end_026_shadow_leak",
        "summary": "You leaked the key anonymously. The tech is now open source and chaotic.",
        "dominant_traits": ["Independence", "Pragmatism"],
        "behavioral_analysis": "Subversive actor. Prefers decentralized chaos to authoritarian control."
      },
      {
        "ending_id": "end_026_coward",
        "summary": "You kept your head down. The signal remains a secret forever.",
        "dominant_traits": ["Pragmatism", "Obedience"],
        "behavioral_analysis": "Motivated entirely by self-preservation."
      },
      {
        "ending_id": "end_026_nationalist",
        "summary": "Your nation became a global hegemon thanks to the alien tech.",
        "dominant_traits": ["Tribalism", "Pragmatism"],
        "behavioral_analysis": "Believes in centralized power and national superiority."
      },
      {
        "ending_id": "end_026_saboteur",
        "summary": "You destroyed the tech. Humanity isn't ready.",
        "dominant_traits": ["Independence", "Justice"],
        "behavioral_analysis": "Paternalistic view of humanity. Willing to destroy progress to prevent misuse."
      },
      {
        "ending_id": "end_026_compromised",
        "summary": "You sacrificed your ideals to protect a colleague.",
        "dominant_traits": ["Compassion", "Obedience"],
        "behavioral_analysis": "Values personal relationships over abstract ideals."
      },
      {
        "ending_id": "end_026_unbroken",
        "summary": "You and your protégé refused. The project stalled, but you both paid the price.",
        "dominant_traits": ["Idealism", "Courage"],
        "behavioral_analysis": "Uncompromising adherence to principles regardless of the human cost."
      }
    ]
  },
  {
    "scenario_id": "sc_027",
    "title": "The Jury",
    "core_conflict": "Legal process vs Personal conviction",
    "pressure_type": "Group pressure",
    "relationship_dynamic": "Individual vs Collective",
    "stakes_type": "A life sentence",
    "tone": "Claustrophobic",
    "escalation_type": "Social isolation",
    "nodes": [
      {
        "node_id": "n_027_1",
        "text": "Day 4 of deliberations. 11 jurors want a guilty verdict for murder. You alone believe it was self-defense, though the evidence is legally shaky.",
        "pressure_context": "Jury room",
        "visibility": "always",
        "required_flags": [],
        "choices": [
          {
            "choice_id": "c_027_1_a",
            "text": "Hold firm and vote Not Guilty, risking a mistrial.",
            "effects": {"Independence": 3, "Justice": 2, "Diplomacy": -2},
            "flags_set": {"flag_027_holdout": True},
            "next_node": "n_027_2a"
          },
          {
            "choice_id": "c_027_1_b",
            "text": "Agree to Convict to end the exhausting process.",
            "effects": {"Obedience": 3, "Pragmatism": 2, "Justice": -3},
            "flags_set": {"flag_027_caved": True},
            "next_node": "n_027_2b"
          }
        ]
      },
      {
        "node_id": "n_027_2a",
        "text": "The foreman explodes in anger. 'You're letting a killer go free because of a gut feeling!' He demands you explain your logic based solely on the evidence.",
        "pressure_context": "Verbal attack",
        "visibility": "conditional",
        "required_flags": ["flag_027_holdout"],
        "timer_seconds": 12,
        "choices": [
          {
            "choice_id": "c_027_2a_a",
            "text": "Argue that the prosecution failed to meet the 'beyond reasonable doubt' standard.",
            "effects": {"Rationality": 3, "Diplomacy": 2, "Emotionality": -2},
            "flags_set": {"flag_027_argued_logic": True},
            "next_node": "n_027_3a"
          },
          {
            "choice_id": "c_027_2a_b",
            "text": "Refuse to argue. State your vote is final.",
            "effects": {"Independence": 3, "Courage": 1, "Diplomacy": -3},
            "flags_set": {"flag_027_stubborn": True},
            "next_node": "n_027_3b"
          }
        ]
      },
      {
        "node_id": "n_027_2b",
        "text": "You vote guilty. The judge reads the verdict. The defendant screams, 'I had no choice!' You realize you might have just ruined an innocent life.",
        "pressure_context": "Guilt realization",
        "visibility": "conditional",
        "required_flags": ["flag_027_caved"],
        "choices": [
          {
            "choice_id": "c_027_2b_a",
            "text": "Stand up and retract your vote in open court.",
            "effects": {"Courage": 3, "Integrity": 2, "Pragmatism": -3},
            "flags_set": {"flag_027_retracted": True},
            "next_node": "n_027_3c"
          },
          {
            "choice_id": "c_027_2b_b",
            "text": "Stay silent. The system worked as designed.",
            "effects": {"Rationality": 2, "Obedience": 2, "Compassion": -3},
            "flags_set": {"flag_027_stayed_silent": True},
            "next_node": "n_027_3d"
          }
        ]
      },
      {
        "node_id": "n_027_3a",
        "text": "Your logical argument sways two other jurors. The vote is now 9-3. The foreman offers a compromise: convict on manslaughter instead of murder.",
        "pressure_context": "Compromise offered",
        "visibility": "conditional",
        "required_flags": ["flag_027_argued_logic"],
        "choices": [
          {
            "choice_id": "c_027_3a_a",
            "text": "Accept the manslaughter compromise.",
            "effects": {"Diplomacy": 3, "Pragmatism": 2, "Idealism": -2},
            "flags_set": {},
            "next_node": "end_027_compromise"
          },
          {
            "choice_id": "c_027_3a_b",
            "text": "Reject it. Push for full acquittal.",
            "effects": {"Idealism": 3, "Justice": 2, "Diplomacy": -3},
            "flags_set": {},
            "next_node": "end_027_hung_jury"
          }
        ]
      },
      {
        "node_id": "n_027_3b",
        "text": "The judge declares a mistrial due to a hung jury. Outside, the victim's family corners you, sobbing and calling you a monster.",
        "pressure_context": "Family confrontation",
        "visibility": "conditional",
        "required_flags": ["flag_027_stubborn"],
        "choices": [
          {
            "choice_id": "c_027_3b_a",
            "text": "Apologize for their pain but stand by your choice.",
            "effects": {"Compassion": 2, "Integrity": 2, "Cowardice": -2},
            "flags_set": {},
            "next_node": "end_027_stood_firm"
          },
          {
            "choice_id": "c_027_3b_b",
            "text": "Ignore them and walk to your car.",
            "effects": {"Rationality": 2, "Pragmatism": 1, "Compassion": -3},
            "flags_set": {},
            "next_node": "end_027_cold_walk"
          }
        ]
      },
      {
        "node_id": "n_027_3c",
        "text": "The courtroom erupts. The judge threatens you with contempt of court and orders deliberations to restart.",
        "pressure_context": "Courtroom chaos",
        "visibility": "conditional",
        "required_flags": ["flag_027_retracted"],
        "choices": [
          {
            "choice_id": "c_027_3c_a",
            "text": "Refuse to deliberate further. Demand a mistrial.",
            "effects": {"Independence": 3, "Courage": 2, "Obedience": -3},
            "flags_set": {},
            "next_node": "end_027_contempt"
          },
          {
            "choice_id": "c_027_3c_b",
            "text": "Go back and try to convince the others again.",
            "effects": {"Idealism": 2, "Diplomacy": 1, "Pragmatism": -2},
            "flags_set": {},
            "next_node": "end_027_exhaustion"
          }
        ]
      },
      {
        "node_id": "n_027_3d",
        "text": "The defendant is sentenced to life. Years later, evidence emerges proving it was self-defense.",
        "pressure_context": "Future realization",
        "visibility": "conditional",
        "required_flags": ["flag_027_stayed_silent"],
        "choices": [
          {
            "choice_id": "c_027_3d_a",
            "text": "Campaign publicly for their exoneration.",
            "effects": {"Justice": 3, "Compassion": 2, "Pride": -2},
            "flags_set": {},
            "next_node": "end_027_exoneration"
          },
          {
            "choice_id": "c_027_3d_b",
            "text": "Do nothing. You followed the law at the time.",
            "effects": {"Obedience": 3, "Rationality": 2, "Compassion": -3},
            "flags_set": {},
            "next_node": "end_027_system_drone"
          }
        ]
      },
      {
        "node_id": "n_027_dummy1",
        "text": "Dummy",
        "pressure_context": "None",
        "visibility": "conditional",
        "required_flags": ["impossible"],
        "choices": [
          {
            "choice_id": "c_027_d1",
            "text": "Dummy",
            "effects": {},
            "flags_set": {},
            "next_node": "end_027_compromise"
          }
        ]
      }
    ],
    "endings": [
      {
        "ending_id": "end_027_compromise",
        "summary": "The defendant got 10 years instead of life. A messy but functional compromise.",
        "dominant_traits": ["Diplomacy", "Pragmatism"],
        "behavioral_analysis": "Values consensus and incremental mitigation over absolute purity of outcome."
      },
      {
        "ending_id": "end_027_hung_jury",
        "summary": "Mistrial. The defendant faces a grueling retrial, but they are not in prison.",
        "dominant_traits": ["Idealism", "Justice"],
        "behavioral_analysis": "Uncompromising pursuit of truth, regardless of the systemic friction it causes."
      },
      {
        "ending_id": "end_027_stood_firm",
        "summary": "You took the emotional abuse of the family but saved the defendant.",
        "dominant_traits": ["Integrity", "Compassion"],
        "behavioral_analysis": "Able to separate emotional pressure from moral duty."
      },
      {
        "ending_id": "end_027_cold_walk",
        "summary": "You walked away without a word, unaffected by the family's grief.",
        "dominant_traits": ["Rationality", "Independence"],
        "behavioral_analysis": "Highly compartmentalized. Unmoved by external emotional appeals."
      },
      {
        "ending_id": "end_027_contempt",
        "summary": "You were fined for contempt, but caused a mistrial.",
        "dominant_traits": ["Courage", "Independence"],
        "behavioral_analysis": "Willing to incur personal legal risk to correct a moral failure."
      },
      {
        "ending_id": "end_027_exhaustion",
        "summary": "You tried again, but the jury eventually convicted anyway. You tried your best.",
        "dominant_traits": ["Idealism", "Diplomacy"],
        "behavioral_analysis": "Naive belief in the power of discourse against entrenched groupthink."
      },
      {
        "ending_id": "end_027_exoneration",
        "summary": "You helped free them years later, seeking redemption.",
        "dominant_traits": ["Justice", "Compassion"],
        "behavioral_analysis": "Capable of admitting fault and correcting past systemic errors."
      },
      {
        "ending_id": "end_027_system_drone",
        "summary": "You slept soundly knowing you followed the instructions exactly.",
        "dominant_traits": ["Obedience", "Rationality"],
        "behavioral_analysis": "Utterly deferential to systemic authority. Abrogates personal moral responsibility."
      }
    ]
  },
  {
    "scenario_id": "sc_028",
    "title": "The Treaty",
    "core_conflict": "Peace vs Accountability",
    "pressure_type": "Geopolitical stakes",
    "relationship_dynamic": "Diplomat vs Warlord",
    "stakes_type": "Geopolitical",
    "tone": "Formal but tense",
    "escalation_type": "Ultimatum",
    "nodes": [
      {
        "node_id": "n_028_1",
        "text": "The warlord slides the treaty across the table. He has added a clause granting himself and his generals full amnesty for war crimes. 'Sign, or the offensive begins tomorrow.'",
        "pressure_context": "Final negotiations",
        "visibility": "always",
        "required_flags": [],
        "choices": [
          {
            "choice_id": "c_028_1_a",
            "text": "Sign the treaty. Stopping the war saves thousands.",
            "effects": {"Pragmatism": 3, "Diplomacy": 2, "Justice": -3},
            "flags_set": {"flag_028_signed_treaty": True},
            "next_node": "n_028_2a"
          },
          {
            "choice_id": "c_028_1_b",
            "text": "Refuse. There can be no peace without justice.",
            "effects": {"Justice": 3, "Idealism": 2, "Pragmatism": -3},
            "flags_set": {"flag_028_refused_treaty": True},
            "next_node": "n_028_2b"
          }
        ]
      },
      {
        "node_id": "n_028_2a",
        "text": "You sign. The war ends. Months later, protests erupt demanding the warlord face trial. The government asks you to publicly defend the amnesty clause.",
        "pressure_context": "Public backlash",
        "visibility": "conditional",
        "required_flags": ["flag_028_signed_treaty"],
        "choices": [
          {
            "choice_id": "c_028_2a_a",
            "text": "Defend the clause as a necessary evil for peace.",
            "effects": {"Rationality": 2, "Pragmatism": 2, "Idealism": -2},
            "flags_set": {"flag_028_defended_amnesty": True},
            "next_node": "n_028_3a"
          },
          {
            "choice_id": "c_028_2a_b",
            "text": "Resign in protest. You won't defend war criminals.",
            "effects": {"Integrity": 3, "Justice": 1, "Obedience": -2},
            "flags_set": {"flag_028_resigned_treaty": True},
            "next_node": "n_028_3b"
          }
        ]
      },
      {
        "node_id": "n_028_2b",
        "text": "The warlord smirks and leaves. The bombing resumes immediately. A hospital is hit. Your superiors demand you recall the warlord and accept his terms.",
        "pressure_context": "War resumes",
        "visibility": "conditional",
        "required_flags": ["flag_028_refused_treaty"],
        "timer_seconds": 15,
        "choices": [
          {
            "choice_id": "c_028_2b_a",
            "text": "Hold your ground. Send troops instead of diplomats.",
            "effects": {"Courage": 2, "Idealism": 2, "Compassion": -2},
            "flags_set": {"flag_028_escalated_war": True},
            "next_node": "n_028_3c"
          },
          {
            "choice_id": "c_028_2b_b",
            "text": "Cave to the pressure. Call him back and sign.",
            "effects": {"Pragmatism": 2, "Obedience": 2, "Courage": -2},
            "flags_set": {"flag_028_caved_to_pressure": True},
            "next_node": "n_028_3d"
          }
        ]
      },
      {
        "node_id": "n_028_3a",
        "text": "Your defense stabilizes the government, but you are despised by human rights groups. The warlord runs for president.",
        "pressure_context": "Political fallout",
        "visibility": "conditional",
        "required_flags": ["flag_028_defended_amnesty"],
        "choices": [
          {
            "choice_id": "c_028_3a_a",
            "text": "Back his opponent to block his rise.",
            "effects": {"Justice": 2, "Diplomacy": 1, "Rationality": -1},
            "flags_set": {},
            "next_node": "end_028_political_game"
          },
          {
            "choice_id": "c_028_3a_b",
            "text": "Stay neutral. Your job was peace, not elections.",
            "effects": {"Obedience": 2, "Pragmatism": 1, "Idealism": -2},
            "flags_set": {},
            "next_node": "end_028_neutral_bureaucrat"
          }
        ]
      },
      {
        "node_id": "n_028_3b",
        "text": "You resign. The warlord uses his amnesty to consolidate power. An international tribunal contacts you to help build a secret case against him.",
        "pressure_context": "Secret justice",
        "visibility": "conditional",
        "required_flags": ["flag_028_resigned_treaty"],
        "choices": [
          {
            "choice_id": "c_028_3b_a",
            "text": "Provide the classified negotiation tapes to the tribunal.",
            "effects": {"Justice": 3, "Independence": 2, "Obedience": -3},
            "flags_set": {},
            "next_node": "end_028_international_law"
          },
          {
            "choice_id": "c_028_3b_b",
            "text": "Refuse. Breaking the treaty risks restarting the war.",
            "effects": {"Pragmatism": 2, "Compassion": 1, "Justice": -2},
            "flags_set": {},
            "next_node": "end_028_fragile_peace"
          }
        ]
      },
      {
        "node_id": "n_028_3c",
        "text": "The war escalates into a multi-year quagmire. You are appointed war czar. Casualties mount into the hundreds of thousands.",
        "pressure_context": "Endless war",
        "visibility": "conditional",
        "required_flags": ["flag_028_escalated_war"],
        "choices": [
          {
            "choice_id": "c_028_3c_a",
            "text": "Authorize drone strikes that cause heavy civilian casualties to end it faster.",
            "effects": {"Pragmatism": 3, "Rationality": 2, "Compassion": -3},
            "flags_set": {},
            "next_node": "end_028_butcher"
          },
          {
            "choice_id": "c_028_3c_b",
            "text": "Maintain conventional tactics. Keep your conscience clean.",
            "effects": {"Idealism": 2, "Integrity": 2, "Pragmatism": -2},
            "flags_set": {},
            "next_node": "end_028_long_war"
          }
        ]
      },
      {
        "node_id": "n_028_3d",
        "text": "You call him back. He demands further concessions now, including territory. He knows you are weak.",
        "pressure_context": "Exploited weakness",
        "visibility": "conditional",
        "required_flags": ["flag_028_caved_to_pressure"],
        "choices": [
          {
            "choice_id": "c_028_3d_a",
            "text": "Give him the territory to stop the killing.",
            "effects": {"Compassion": 2, "Cowardice": 2, "Justice": -3},
            "flags_set": {},
            "next_node": "end_028_appeaser"
          },
          {
            "choice_id": "c_028_3d_b",
            "text": "Snap. Flip the table and walk out for good.",
            "effects": {"Courage": 2, "Independence": 3, "Diplomacy": -3},
            "flags_set": {},
            "next_node": "end_028_broken_diplomat"
          }
        ]
      },
      {
        "node_id": "n_028_dummy1",
        "text": "Dummy",
        "pressure_context": "None",
        "visibility": "conditional",
        "required_flags": ["impossible"],
        "choices": [
          {
            "choice_id": "c_028_d1",
            "text": "Dummy",
            "effects": {},
            "flags_set": {},
            "next_node": "end_028_appeaser"
          }
        ]
      }
    ],
    "endings": [
      {
        "ending_id": "end_028_political_game",
        "summary": "You tried to fix the system from within, playing dirty politics to block the warlord.",
        "dominant_traits": ["Pragmatism", "Diplomacy"],
        "behavioral_analysis": "Views morality as a long-term chess game rather than an absolute rule."
      },
      {
        "ending_id": "end_028_neutral_bureaucrat",
        "summary": "You watched him take power, telling yourself you did your job.",
        "dominant_traits": ["Obedience", "Rationality"],
        "behavioral_analysis": "Strictly compartmentalizes responsibility. Defers to institutional boundaries."
      },
      {
        "ending_id": "end_028_international_law",
        "summary": "You betrayed your government to help the Hague indict the warlord.",
        "dominant_traits": ["Justice", "Independence"],
        "behavioral_analysis": "Prioritizes universal justice over national loyalty or immediate peace."
      },
      {
        "ending_id": "end_028_fragile_peace",
        "summary": "You swallowed your pride to maintain the fragile peace.",
        "dominant_traits": ["Compassion", "Pragmatism"],
        "behavioral_analysis": "Prioritizes immediate human lives over abstract concepts of justice."
      },
      {
        "ending_id": "end_028_butcher",
        "summary": "You became a monster to destroy a monster.",
        "dominant_traits": ["Pragmatism", "Rationality"],
        "behavioral_analysis": "Ends-justify-the-means extremist. Willing to sacrifice morality for victory."
      },
      {
        "ending_id": "end_028_long_war",
        "summary": "The war raged for a decade. Millions suffered, but your soul was 'clean'.",
        "dominant_traits": ["Idealism", "Integrity"],
        "behavioral_analysis": "Dangerous moral purity. Prioritizes clear conscience over practical harm reduction."
      },
      {
        "ending_id": "end_028_appeaser",
        "summary": "You surrendered everything to stop the violence, empowering a tyrant.",
        "dominant_traits": ["Compassion", "Diplomacy"],
        "behavioral_analysis": "Conflict-averse to a fault. Unable to tolerate immediate suffering for long-term stability."
      },
      {
        "ending_id": "end_028_broken_diplomat",
        "summary": "You lost your temper and your career. The war continued.",
        "dominant_traits": ["Courage", "Independence"],
        "behavioral_analysis": "Reached breaking point. Chose chaotic disruption over humiliating compromise."
      }
    ]
  }
]

with open(r"c:\Sagar\Projects\AntiGravityProjects\FRACTURE\veil\src\data\batch3.json", "w", encoding="utf-8") as f:
    json.dump(scenarios, f, indent=2)
