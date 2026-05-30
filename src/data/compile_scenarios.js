const fs = require('fs');
const path = require('path');

const dataDir = __dirname;
const scenariosPath = path.join(dataDir, 'scenarios.json');

// 1. Read existing scenarios.json to extract sc_001 to sc_008
const originalScenarios = JSON.parse(fs.readFileSync(scenariosPath, 'utf8'));
const baseScenarios = originalScenarios.filter(s => {
  const num = parseInt(s.scenario_id.split('_')[1]);
  return num >= 1 && num <= 8;
});

console.log(`Extracted ${baseScenarios.length} base scenarios (sc_001 to sc_008).`);

// 2. Modify sc_006 (The Trolley) to expand it to 15 layers and mark it is_long
const sc006 = baseScenarios.find(s => s.scenario_id === 'sc_006');
if (sc006) {
  sc006.is_long = true;
  
  // Replace nodes with 15-layer chain
  sc006.nodes = [
    {
      "node_id": "n_006_t_1",
      "text": "You stand by a switch. A runaway trolley is heading toward 5 strangers tied to the tracks. Pulling the switch diverts it to a track with 1 stranger.",
      "visibility": "always",
      "required_flags": [],
      "choices": [
        {
          "choice_id": "tc1_a",
          "text": "Pull switch. Divert to the 1 stranger.",
          "effects": {
            "Pragmatism": 2,
            "Rationality": 1,
            "Idealism": -1
          },
          "flags_set": {
            "pull_1": true
          },
          "next_node": "n_006_t_2"
        },
        {
          "choice_id": "tc1_b",
          "text": "Do nothing. Let it hit the 5 strangers.",
          "effects": {
            "Idealism": 2,
            "Rationality": -1,
            "Pragmatism": -2
          },
          "flags_set": {
            "silent_1": true
          },
          "next_node": "n_006_t_2"
        }
      ]
    },
    {
      "node_id": "n_006_t_2",
      "text": "The trolley accelerates. The track splits again. Ahead are 5 strangers, but the diversion track has your mentor, David, who saved your career.",
      "visibility": "always",
      "required_flags": [],
      "choices": [
        {
          "choice_id": "tc2_a",
          "text": "Divert the trolley to David.",
          "effects": {
            "Pragmatism": 3,
            "Tribalism": -3,
            "Compassion": -2
          },
          "flags_set": {
            "killed_mentor": true
          },
          "next_node": "n_006_t_3"
        },
        {
          "choice_id": "tc2_b",
          "text": "Do nothing. Let it hit the 5 strangers.",
          "effects": {
            "Tribalism": 3,
            "Compassion": 2,
            "Pragmatism": -3
          },
          "flags_set": {
            "saved_mentor": true
          },
          "next_node": "n_006_t_3"
        }
      ]
    },
    {
      "node_id": "n_006_t_3",
      "text": "The rails shake. Next split: 5 strangers vs your spouse.",
      "visibility": "always",
      "required_flags": [],
      "choices": [
        {
          "choice_id": "tc3_a",
          "text": "Divert to your spouse. Sacrifice them.",
          "effects": {
            "Pragmatism": 4,
            "Tribalism": -5,
            "Compassion": -4
          },
          "flags_set": {
            "sacrificed_spouse": true
          },
          "next_node": "n_006_t_4"
        },
        {
          "choice_id": "tc3_b",
          "text": "Do nothing. Let it hit the 5 strangers.",
          "effects": {
            "Tribalism": 5,
            "Compassion": 3,
            "Pragmatism": -4
          },
          "flags_set": {
            "saved_spouse": true
          },
          "next_node": "n_006_t_4"
        }
      ]
    },
    {
      "node_id": "n_006_t_4",
      "text": "The speed is terrifying. Next split: 5 children vs your own child.",
      "visibility": "always",
      "required_flags": [],
      "choices": [
        {
          "choice_id": "tc4_a",
          "text": "Divert to your child.",
          "effects": {
            "Pragmatism": 5,
            "Tribalism": -5,
            "Compassion": -5
          },
          "flags_set": {
            "sacrificed_child": true
          },
          "next_node": "n_006_t_5"
        },
        {
          "choice_id": "tc4_b",
          "text": "Do nothing. Let it hit the 5 children.",
          "effects": {
            "Tribalism": 5,
            "Compassion": 4,
            "Pragmatism": -5
          },
          "flags_set": {
            "saved_child": true
          },
          "next_node": "n_006_t_5"
        }
      ]
    },
    {
      "node_id": "n_006_t_5",
      "text": "Now, the tracks are different. The trolley is heading to hit a child. The only way to stop it is to jump off a footbridge in front of it, killing yourself.",
      "timer_seconds": 8,
      "visibility": "always",
      "required_flags": [],
      "choices": [
        {
          "choice_id": "tc5_a",
          "text": "Jump. Sacrifice yourself.",
          "effects": {
            "Courage": 5,
            "Compassion": 4,
            "Idealism": 3
          },
          "flags_set": {
            "suicide": true
          },
          "next_node": "n_006_t_6"
        },
        {
          "choice_id": "tc5_b",
          "text": "Stay on the bridge. Watch the child die.",
          "effects": {
            "Courage": -4,
            "Pragmatism": 2,
            "Compassion": -4
          },
          "flags_set": {
            "watched_child_die": true
          },
          "next_node": "n_006_t_6"
        }
      ]
    },
    {
      "node_id": "n_006_t_6",
      "text": "You survived. The scene morphs. On one track is a brilliant cancer research doctor who is about to find a cure. On the other are 100 maximum-security inmates.",
      "visibility": "always",
      "required_flags": [],
      "choices": [
        {
          "choice_id": "tc6_a",
          "text": "Divert to the doctor. Save the 100 inmates.",
          "effects": {
            "Pragmatism": -4,
            "Rationality": -2,
            "Idealism": 2
          },
          "flags_set": {
            "killed_doctor": true
          },
          "next_node": "n_006_t_7"
        },
        {
          "choice_id": "tc6_b",
          "text": "Divert to the 100 inmates. Save the doctor.",
          "effects": {
            "Pragmatism": 4,
            "Rationality": 3,
            "Compassion": -3
          },
          "flags_set": {
            "killed_inmates": true
          },
          "next_node": "n_006_t_7"
        }
      ]
    },
    {
      "node_id": "n_006_t_7",
      "text": "The trolley races on. On one track is a museum containing the last copy of all historical records and human literature. On the other track is a single newborn child.",
      "visibility": "always",
      "required_flags": [],
      "choices": [
        {
          "choice_id": "tc7_a",
          "text": "Divert to the child. Save human knowledge.",
          "effects": {
            "Rationality": 4,
            "Compassion": -4,
            "Idealism": -2
          },
          "flags_set": {
            "killed_child_t7": true
          },
          "next_node": "n_006_t_8"
        },
        {
          "choice_id": "tc7_b",
          "text": "Divert to the museum. Save the child.",
          "effects": {
            "Compassion": 4,
            "Idealism": 3,
            "Rationality": -3
          },
          "flags_set": {
            "destroyed_knowledge": true
          },
          "next_node": "n_006_t_8"
        }
      ]
    },
    {
      "node_id": "n_006_t_8",
      "text": "The rails glow. Ahead is a server holding the genetic database to cure all future genetic illnesses for millions of unborn children. Diverting hits 10 living elderly people.",
      "visibility": "always",
      "required_flags": [],
      "choices": [
        {
          "choice_id": "tc8_a",
          "text": "Divert to the elderly people. Save the database.",
          "effects": {
            "Pragmatism": 4,
            "Rationality": 3,
            "Compassion": -3
          },
          "flags_set": {
            "database_saved": true
          },
          "next_node": "n_006_t_9"
        },
        {
          "choice_id": "tc8_b",
          "text": "Divert to the database. Save the elderly.",
          "effects": {
            "Compassion": 3,
            "Idealism": 3,
            "Pragmatism": -4
          },
          "flags_set": {
            "database_destroyed": true
          },
          "next_node": "n_006_t_9"
        }
      ]
    },
    {
      "node_id": "n_006_t_9",
      "text": "You are inside the trolley now. Your brakes are dead. Ahead are 2 maintenance workers. Shouting a warning makes them panic and jump onto adjacent tracks where 5 people are working. If you say nothing, the 2 die.",
      "timer_seconds": 6,
      "visibility": "always",
      "required_flags": [],
      "choices": [
        {
          "choice_id": "tc9_a",
          "text": "Shout warning. Cause chaos.",
          "effects": {
            "Courage": 2,
            "Rationality": -3,
            "Pragmatism": -2
          },
          "flags_set": {
            "shouted": true
          },
          "next_node": "n_006_t_10"
        },
        {
          "choice_id": "tc9_b",
          "text": "Stay silent. Hit the 2.",
          "effects": {
            "Rationality": 3,
            "Pragmatism": 2,
            "Compassion": -3
          },
          "flags_set": {
            "silent_t9": true
          },
          "next_node": "n_006_t_10"
        }
      ]
    },
    {
      "node_id": "n_006_t_10",
      "text": "A child is trapped in the gears of the trolley. Diverting it to a side rail will crush a historical masterpiece monument, but stopping it entirely requires using a chemical fire suppressant that will slowly suffocate the passengers in the back coach.",
      "visibility": "always",
      "required_flags": [],
      "choices": [
        {
          "choice_id": "tc10_a",
          "text": "Divert to side rail. Destroy the monument.",
          "effects": {"Pragmatism": 3, "Idealism": -3},
          "flags_set": {"monument_destroyed": true},
          "next_node": "n_006_t_11"
        },
        {
          "choice_id": "tc10_b",
          "text": "Use the suppressant. Risk the passengers.",
          "effects": {"Idealism": 3, "Compassion": -3},
          "flags_set": {"suppressant_used": true},
          "next_node": "n_006_t_11"
        }
      ]
    },
    {
      "node_id": "n_006_t_11",
      "text": "The trolley enters a loop. On track A is a group of 5 terminal patients with only weeks to live. On track B is 1 healthy teenager.",
      "visibility": "always",
      "required_flags": [],
      "choices": [
        {
          "choice_id": "tc11_a",
          "text": "Divert to track B. Hit the teenager.",
          "effects": {"Rationality": 3, "Compassion": -3},
          "flags_set": {"hit_teenager": true},
          "next_node": "n_006_t_12"
        },
        {
          "choice_id": "tc11_b",
          "text": "Divert to track A. Hit the 5 patients.",
          "effects": {"Compassion": 3, "Rationality": -2},
          "flags_set": {"hit_patients": true},
          "next_node": "n_006_t_12"
        }
      ]
    },
    {
      "node_id": "n_006_t_12",
      "text": "The speed climbs further. You can divert the trolley into a power station, causing a blackout that turns off life support systems in a local hospital (killing 3 patients), or let the trolley derail, killing the conductor (1 person) and injuring yourself.",
      "visibility": "always",
      "required_flags": [],
      "choices": [
        {
          "choice_id": "tc12_a",
          "text": "Divert to power station. Cause blackout.",
          "effects": {"Pragmatism": 3, "Compassion": -3},
          "flags_set": {"blackout_caused": true},
          "next_node": "n_006_t_13"
        },
        {
          "choice_id": "tc12_b",
          "text": "Derail the trolley. Risk yourself and conductor.",
          "effects": {"Courage": 4, "Compassion": 3},
          "flags_set": {"derailed": true},
          "next_node": "n_006_t_13"
        }
      ]
    },
    {
      "node_id": "n_006_t_13",
      "text": "You see a switch ahead that can direct the trolley into a deep gorge, destroying the trolley and you with it, or you can divert it to hit a crowd of 3 protestors blockading the tracks.",
      "visibility": "always",
      "required_flags": [],
      "choices": [
        {
          "choice_id": "tc13_a",
          "text": "Direct into gorge. Sacrifice yourself.",
          "effects": {"Courage": 4, "Compassion": 3, "Idealism": 2},
          "flags_set": {"self_sacrifice_t13": true},
          "next_node": "n_006_t_14"
        },
        {
          "choice_id": "tc13_b",
          "text": "Divert to hit the 3 protestors.",
          "effects": {"Pragmatism": 3, "Compassion": -3},
          "flags_set": {"hit_protestors": true},
          "next_node": "n_006_t_14"
        }
      ]
    },
    {
      "node_id": "n_006_t_14",
      "text": "A hacker hijacks the system. They offer to stop the trolley if you upload a virus that will expose the private medical records of every citizen in the state, or refuse, letting the trolley strike a track inspector.",
      "visibility": "always",
      "required_flags": [],
      "choices": [
        {
          "choice_id": "tc14_a",
          "text": "Upload the virus to stop the trolley.",
          "effects": {"Compassion": 3, "Integrity": -4},
          "flags_set": {"virus_uploaded": true},
          "next_node": "n_006_t_15"
        },
        {
          "choice_id": "tc14_b",
          "text": "Refuse the upload. Let it strike inspector.",
          "effects": {"Integrity": 4, "Compassion": -3},
          "flags_set": {"virus_refused": true},
          "next_node": "n_006_t_15"
        }
      ]
    },
    {
      "node_id": "n_006_t_15",
      "text": "The simulation freezes. The entity speaks: 'The tracks, the trolley, the people... they were all holograms. We were only testing your neural response curves. Do you forgive us?'",
      "visibility": "always",
      "required_flags": [],
      "choices": [
        {
          "choice_id": "tc15_a",
          "text": "Yes. It was necessary calibration.",
          "effects": {"Obedience": 4, "Rationality": 3, "Independence": -4},
          "flags_set": {},
          "ending_id": "end_trolley_submissive"
        },
        {
          "choice_id": "tc15_b",
          "text": "No. Attack the simulation console.",
          "effects": {"Independence": 5, "Courage": 4, "Obedience": -5},
          "flags_set": {},
          "ending_id": "end_trolley_rebel"
        }
      ]
    }
  ];
}

// 3. Modify sc_008 to mark it is_long
const sc008 = baseScenarios.find(s => s.scenario_id === 'sc_008');
if (sc008) {
  sc008.is_long = true;
}

// 4. Merge batches
let compiled = [...baseScenarios];

for (let i = 1; i <= 11; i++) {
  const batchPath = path.join(dataDir, `batch${i}.json`);
  if (fs.existsSync(batchPath)) {
    const batchContent = JSON.parse(fs.readFileSync(batchPath, 'utf8'));
    compiled = compiled.concat(batchContent);
    console.log(`Loaded batch${i}.json with ${batchContent.length} scenarios.`);
  } else {
    console.error(`batch${i}.json not found!`);
  }
}

// Clean up endings: if next_node points to an ending, change it to ending_id
compiled.forEach(scenario => {
  const endingIds = new Set(scenario.endings.map(e => e.ending_id));
  scenario.nodes.forEach(node => {
    node.choices.forEach(choice => {
      if (choice.next_node && (endingIds.has(choice.next_node) || choice.next_node.startsWith('end'))) {
        choice.ending_id = choice.next_node;
        delete choice.next_node;
      }
    });
  });
});

// 5. Ensure sort order by ID numerical value
compiled.sort((a, b) => {
  const numA = parseInt(a.scenario_id.split('_')[1]);
  const numB = parseInt(b.scenario_id.split('_')[1]);
  return numA - numB;
});

// 6. Write back to scenarios.json
fs.writeFileSync(scenariosPath, JSON.stringify(compiled, null, 2), 'utf8');
console.log(`Compilation complete. Total scenarios in scenarios.json: ${compiled.length}`);
