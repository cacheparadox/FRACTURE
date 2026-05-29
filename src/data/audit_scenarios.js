const fs = require('fs');
const path = require('path');

const scenariosPath = path.join(__dirname, 'scenarios.json');
const rawData = fs.readFileSync(scenariosPath, 'utf8');
const scenarios = JSON.parse(rawData);

let totalErrors = 0;

scenarios.forEach((scenario) => {
  console.log(`Auditing Scenario: ${scenario.scenario_id} - "${scenario.title}"`);
  
  const nodeIds = new Set(scenario.nodes.map(n => n.node_id));
  const endingIds = new Set(scenario.endings.map(e => e.ending_id));
  const allTargetIds = new Set([...nodeIds, ...endingIds]);
  
  // Verify starting node exists
  if (scenario.nodes.length === 0) {
    console.error(`  [ERROR] Scenario has no nodes.`);
    totalErrors++;
    return;
  }
  
  const startNodeId = scenario.nodes[0].node_id;
  
  // Track reachable nodes
  const visited = new Set();
  const queue = [startNodeId];
  visited.add(startNodeId);
  
  while (queue.length > 0) {
    const currentId = queue.shift();
    const node = scenario.nodes.find(n => n.node_id === currentId);
    if (!node) continue;
    
    node.choices.forEach(choice => {
      const next = choice.next_node;
      
      // If choice has no next_node, but has ending_id, verify it points to a valid ending
      if (!next) {
        if (!choice.ending_id) {
          console.error(`  [ERROR] Node "${currentId}" choice "${choice.choice_id}" has neither next_node nor ending_id`);
          totalErrors++;
        } else if (!endingIds.has(choice.ending_id)) {
          console.error(`  [ERROR] Node "${currentId}" choice "${choice.choice_id}" points to non-existent ending "${choice.ending_id}"`);
          totalErrors++;
        }
        return;
      }
      
      const parts = next.split("_");
      let basePrefix = next;
      if (parts[0] === "l") {
        basePrefix = parts.slice(0, 2).join("_");
      } else if (parts[0] === "n" && parts[1] === "sc") {
        basePrefix = parts.slice(0, 4).join("_");
      } else if (parts[0] === "n") {
        basePrefix = parts.slice(0, 3).join("_");
      }
      
      const candidates = scenario.nodes.filter(
        n => n.node_id === next || n.node_id.startsWith(basePrefix + "_")
      );
      
      if (candidates.length === 0) {
        console.error(`  [ERROR] Node "${currentId}" choice "${choice.choice_id}" points to non-existent target "${next}"`);
        totalErrors++;
      }
      
      candidates.forEach(cand => {
        if (!visited.has(cand.node_id)) {
          visited.add(cand.node_id);
          queue.push(cand.node_id);
        }
      });
    });
  }
  
  // Check for unreachable nodes
  scenario.nodes.forEach(node => {
    if (!visited.has(node.node_id)) {
      console.warn(`  [WARN] Node "${node.node_id}" is unreachable from start node "${startNodeId}"`);
    }
  });
});

console.log(`\nAudit finished. Total critical errors: ${totalErrors}`);
if (totalErrors > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
