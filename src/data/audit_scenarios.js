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
      
      // Match candidate nodes using same prefix logic as ScenarioPlayer
      const basePrefix = next.split("_").slice(0, 2).join("_");
      const candidates = scenario.nodes.filter(
        n => n.node_id === next || n.node_id.startsWith(basePrefix + "_")
      );
      
      if (candidates.length === 0 && !endingIds.has(next)) {
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
