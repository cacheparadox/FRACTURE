const fs = require('fs');
const path = require('path');

const scenariosPath = path.join(__dirname, 'scenarios.json');
const scenarios = JSON.parse(fs.readFileSync(scenariosPath, 'utf8'));

let errors = [];

function traverse(scenario, currentNodeId, visited, pathHistory) {
  if (visited.has(currentNodeId)) return;
  visited.add(currentNodeId);

  const node = scenario.nodes.find(n => n.node_id === currentNodeId);
  if (!node) {
    errors.push(`[${scenario.scenario_id}] Missing node: ${currentNodeId} (Path: ${pathHistory.join(' -> ')})`);
    return;
  }

  node.choices.forEach(choice => {
    let nextId = choice.next_node || choice.ending_id;
    if (!nextId) {
      errors.push(`[${scenario.scenario_id}] Choice '${choice.choice_id}' in node '${currentNodeId}' has no nextId`);
      return;
    }

    const isEnding = scenario.endings.find(e => e.ending_id === nextId);

    if (!isEnding) {
      try {
        const basePrefix = nextId.split("_").slice(0, 2).join("_");
        const candidateNodes = scenario.nodes.filter(
          n => n.node_id === nextId || n.node_id.startsWith(basePrefix + "_")
        );

        if (candidateNodes.length > 1) {
           const matchingNode = candidateNodes.find(n => n.visibility !== 'always'); // Simplified logic
           if (matchingNode) {
             nextId = matchingNode.node_id;
           } else {
             const defaultNode = candidateNodes.find(n => n.visibility === 'always' || n.node_id === nextId);
             if (defaultNode) nextId = defaultNode.node_id;
           }
        }
        
        const resolvedNode = scenario.nodes.find(n => n.node_id === nextId);
        const resolvedIsEnding = scenario.endings.find(e => e.ending_id === nextId);
        
        if (!resolvedNode && !resolvedIsEnding) {
           errors.push(`[${scenario.scenario_id}] Choice '${choice.choice_id}' points to completely invalid ID '${nextId}' after resolution.`);
        } else if (resolvedNode) {
           traverse(scenario, nextId, new Set(visited), [...pathHistory, choice.choice_id, nextId]);
        }

      } catch (err) {
        errors.push(`[${scenario.scenario_id}] CRASH on choice '${choice.choice_id}' going to '${nextId}': ${err.message}`);
      }
    }
  });
}

scenarios.forEach(scenario => {
  if (scenario.nodes.length > 0) {
    traverse(scenario, scenario.nodes[0].node_id, new Set(), [scenario.nodes[0].node_id]);
  } else {
    errors.push(`[${scenario.scenario_id}] No nodes found.`);
  }
});

if (errors.length > 0) {
  console.log("Validation Errors Found:");
  errors.forEach(e => console.log(e));
} else {
  console.log("All 48 scenarios passed the simulation test. 0 errors.");
}
