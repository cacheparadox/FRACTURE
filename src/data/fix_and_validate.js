const fs = require('fs');
const path = require('path');

const scenariosPath = path.join(__dirname, 'scenarios.json');
const rawData = fs.readFileSync(scenariosPath, 'utf8');
const scenarios = JSON.parse(rawData);

let fixedCount = 0;

scenarios.forEach(scenario => {
  const nodeIds = new Set(scenario.nodes.map(n => n.node_id));
  const endingIds = new Set(scenario.endings.map(e => e.ending_id));

  scenario.nodes.forEach(node => {
    node.choices.forEach(choice => {
      // If next_node points to an ending ID
      if (choice.next_node && endingIds.has(choice.next_node)) {
        choice.ending_id = choice.next_node;
        delete choice.next_node;
        fixedCount++;
      }
      
      // If next_node starts with 'end_' but isn't strictly in endingIds, check if it's meant to be an ending
      if (choice.next_node && choice.next_node.startsWith('end_') && !nodeIds.has(choice.next_node)) {
         choice.ending_id = choice.next_node;
         delete choice.next_node;
         fixedCount++;
         
         // Ensure it exists in endings array
         if (!endingIds.has(choice.ending_id)) {
            scenario.endings.push({
               ending_id: choice.ending_id,
               summary: "You reached a conclusion, but the details are lost to history.",
               dominant_traits: ["Unknown", "Ambiguous"],
               behavioral_analysis: "A unique path was taken."
            });
            endingIds.add(choice.ending_id);
            console.log(`Auto-created ending ${choice.ending_id} for scenario ${scenario.scenario_id}`);
         }
      }
      
      // If ending_id is set but not in endings, auto-create it
      if (choice.ending_id && !endingIds.has(choice.ending_id)) {
          scenario.endings.push({
             ending_id: choice.ending_id,
             summary: "You reached a conclusion, but the details are lost to history.",
             dominant_traits: ["Unknown", "Ambiguous"],
             behavioral_analysis: "A unique path was taken."
          });
          endingIds.add(choice.ending_id);
          console.log(`Auto-created missing ending ${choice.ending_id} for scenario ${scenario.scenario_id}`);
          fixedCount++;
      }
      
      // If next_node is missing but no ending_id, create an abrupt ending
      if (!choice.next_node && !choice.ending_id) {
          choice.ending_id = `end_${scenario.scenario_id}_abrupt`;
          if (!endingIds.has(choice.ending_id)) {
              scenario.endings.push({
                 ending_id: choice.ending_id,
                 summary: "The scenario ended abruptly.",
                 dominant_traits: ["Abrupt", "Terminal"],
                 behavioral_analysis: "The path terminates here."
              });
              endingIds.add(choice.ending_id);
          }
          fixedCount++;
      }
      
      // If next_node still points to a missing node, convert to abrupt ending
      if (choice.next_node && !nodeIds.has(choice.next_node)) {
          console.log(`Fixing broken next_node ${choice.next_node} in ${scenario.scenario_id}`);
          choice.ending_id = `end_broken_${choice.next_node}`;
          delete choice.next_node;
          if (!endingIds.has(choice.ending_id)) {
              scenario.endings.push({
                 ending_id: choice.ending_id,
                 summary: "This path leads to an unexpected conclusion.",
                 dominant_traits: ["Unexpected", "Terminal"],
                 behavioral_analysis: "The branching path was broken."
              });
              endingIds.add(choice.ending_id);
          }
          fixedCount++;
      }
    });
  });
});

console.log(`Applied ${fixedCount} automated fixes.`);

fs.writeFileSync(scenariosPath, JSON.stringify(scenarios, null, 2), 'utf8');

// Re-validate
let errors = 0;
scenarios.forEach(scenario => {
  const nodeMap = new Map();
  scenario.nodes.forEach(n => nodeMap.set(n.node_id, n));
  
  scenario.nodes.forEach(node => {
    node.choices.forEach(choice => {
      if (choice.next_node && !nodeMap.has(choice.next_node)) {
        console.error(`[${scenario.scenario_id}] Choice '${choice.choice_id}' points to missing next_node '${choice.next_node}'`);
        errors++;
      }
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
