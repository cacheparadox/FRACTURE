const fs = require('fs');
const path = require('path');

const scenarios = JSON.parse(fs.readFileSync(path.join(__dirname, 'scenarios.json'), 'utf8'));
let nonStrings = [];
scenarios.forEach(scenario => {
  scenario.nodes.forEach(node => {
    node.choices.forEach(choice => {
      if (choice.next_node !== undefined && typeof choice.next_node !== 'string') {
        nonStrings.push(`[${scenario.scenario_id}] choice ${choice.choice_id} next_node is ${typeof choice.next_node}`);
      }
      if (choice.ending_id !== undefined && typeof choice.ending_id !== 'string') {
        nonStrings.push(`[${scenario.scenario_id}] choice ${choice.choice_id} ending_id is ${typeof choice.ending_id}`);
      }
    });
  });
});
if (nonStrings.length > 0) {
  console.log(nonStrings);
} else {
  console.log("All next_node and ending_id are strings.");
}
