const fs = require('fs');
const path = require('path');

const dataDir = __dirname;
const scenariosPath = path.join(dataDir, 'scenarios.json');

// 1. Load original scenarios and filter for sc_001 to sc_008
let originalScenarios = [];
if (fs.existsSync(scenariosPath)) {
  const rawData = fs.readFileSync(scenariosPath, 'utf8');
  const allOriginal = JSON.parse(rawData);
  // Keep only the first 8 scenarios
  originalScenarios = allOriginal.filter(s => {
    const num = parseInt(s.scenario_id.replace('sc_', ''), 10);
    return num >= 1 && num <= 8;
  });
  console.log(`Kept ${originalScenarios.length} original scenarios.`);
}

// 2. Load batches 1 through 6
let mergedScenarios = [...originalScenarios];

for (let i = 1; i <= 6; i++) {
  const batchPath = path.join(dataDir, `batch${i}.json`);
  if (fs.existsSync(batchPath)) {
    try {
      const batchData = fs.readFileSync(batchPath, 'utf8');
      
      // Some LLMs output wrapped in markdown codeblocks (```json ... ```) 
      // Let's strip them if they exist
      let cleanData = batchData.trim();
      if (cleanData.startsWith('```json')) {
        cleanData = cleanData.replace(/^```json/, '');
      }
      if (cleanData.startsWith('```')) {
         cleanData = cleanData.replace(/^```/, '');
      }
      if (cleanData.endsWith('```')) {
        cleanData = cleanData.replace(/```$/, '');
      }
      
      const parsedBatch = JSON.parse(cleanData);
      mergedScenarios = mergedScenarios.concat(parsedBatch);
      console.log(`Loaded batch ${i} with ${parsedBatch.length} scenarios.`);
    } catch (e) {
      console.error(`Error parsing batch${i}.json:`, e);
    }
  } else {
    console.error(`batch${i}.json not found!`);
  }
}

// Ensure unique IDs
const uniqueIds = new Set();
mergedScenarios = mergedScenarios.filter(s => {
  if (uniqueIds.has(s.scenario_id)) {
    console.warn(`Duplicate scenario ID found: ${s.scenario_id}, skipping duplicate.`);
    return false;
  }
  uniqueIds.add(s.scenario_id);
  return true;
});

// Write back to scenarios.json
fs.writeFileSync(scenariosPath, JSON.stringify(mergedScenarios, null, 2), 'utf8');
console.log(`Successfully merged into scenarios.json. Total scenarios: ${mergedScenarios.length}`);

// 3. Validate
console.log('\n--- VALIDATION ---');
let errors = 0;

mergedScenarios.forEach(scenario => {
  const nodeMap = new Map();
  scenario.nodes.forEach(n => nodeMap.set(n.node_id, n));
  
  scenario.nodes.forEach(node => {
    node.choices.forEach(choice => {
      // Check next_node
      if (choice.next_node) {
        if (!nodeMap.has(choice.next_node)) {
          console.error(`[${scenario.scenario_id}] Choice '${choice.choice_id}' points to missing next_node '${choice.next_node}'`);
          errors++;
        }
      } else if (!choice.ending_id) {
        console.error(`[${scenario.scenario_id}] Choice '${choice.choice_id}' has neither next_node nor ending_id`);
        errors++;
      }
      
      // Check ending_id
      if (choice.ending_id) {
        const endingExists = scenario.endings.some(e => e.ending_id === choice.ending_id);
        if (!endingExists) {
          console.error(`[${scenario.scenario_id}] Choice '${choice.choice_id}' points to missing ending_id '${choice.ending_id}'`);
          errors++;
        }
      }
    });
  });
});

if (errors === 0) {
  console.log('Validation passed: All node and ending references are valid.');
} else {
  console.error(`Validation failed with ${errors} errors.`);
}
