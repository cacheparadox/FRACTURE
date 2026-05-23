"use client";

import { useEffect, useState } from "react";
import { Scenario, Node } from "@/types/scenario";

interface Vertex {
  id: string;
  type: "node" | "ending";
  label: string;
  depth: number;
  x: number;
  y: number;
}

interface Edge {
  from: string;
  to: string;
}

export default function DecisionTreeMap({
  scenario,
  pathTaken,
}: {
  scenario: Scenario;
  pathTaken: string[];
}) {
  const [animationStep, setAnimationStep] = useState(0);

  // Animate path drawing step-by-step
  useEffect(() => {
    setAnimationStep(0);
    const interval = setInterval(() => {
      setAnimationStep((prev) => {
        if (prev < pathTaken.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 450);
    return () => clearInterval(interval);
  }, [pathTaken]);

  // 1. Build list of vertices and calculate their depths
  const verticesMap: Record<string, Vertex> = {};
  const depthMap: Record<string, number> = {};
  
  const nodeMap: Record<string, Node> = {};
  scenario.nodes.forEach(n => {
    nodeMap[n.node_id] = n;
  });

  const endingsSet = new Set(scenario.endings.map(e => e.ending_id));

  // Determine starting node
  const startId = scenario.nodes[0]?.node_id;
  if (!startId) return null;

  // BFS to calculate rank (depth level) for each node and ending
  const queue: string[] = [startId];
  depthMap[startId] = 0;

  while (queue.length > 0) {
    const currId = queue.shift()!;
    const currDepth = depthMap[currId];
    const node = nodeMap[currId];

    if (node) {
      node.choices.forEach(choice => {
        const nextTarget = choice.next_node;
        const isEnding = endingsSet.has(nextTarget);

        if (isEnding) {
          if (depthMap[nextTarget] === undefined || depthMap[nextTarget] < currDepth + 1) {
            depthMap[nextTarget] = currDepth + 1;
          }
        } else {
          // Prefix matching support for conditional branch naming (e.g. l_5 vs l_5_alt)
          const basePrefix = nextTarget.split("_").slice(0, 2).join("_");
          const candidates = scenario.nodes.filter(
            n => n.node_id === nextTarget || n.node_id.startsWith(basePrefix + "_")
          );

          candidates.forEach(cand => {
            if (depthMap[cand.node_id] === undefined) {
              depthMap[cand.node_id] = currDepth + 1;
              queue.push(cand.node_id);
            }
          });
        }
      });
    }
  }

  // Group vertices by depth
  const depthGroups: Record<number, string[]> = {};
  
  scenario.nodes.forEach(n => {
    const depth = depthMap[n.node_id] ?? 0;
    if (depthGroups[depth] === undefined) depthGroups[depth] = [];
    depthGroups[depth].push(n.node_id);
    
    verticesMap[n.node_id] = {
      id: n.node_id,
      type: "node",
      label: n.node_id,
      depth,
      x: 0,
      y: 0
    };
  });

  scenario.endings.forEach(e => {
    const depth = depthMap[e.ending_id] ?? 0;
    if (depthGroups[depth] === undefined) depthGroups[depth] = [];
    depthGroups[depth].push(e.ending_id);

    verticesMap[e.ending_id] = {
      id: e.ending_id,
      type: "ending",
      label: e.summary,
      depth,
      x: 0,
      y: 0
    };
  });

  const depths = Object.keys(depthGroups).map(Number);
  const maxDepth = depths.length > 0 ? Math.max(...depths) : 1;

  // SVG coordinate configuration
  const width = 800;
  const height = 240;
  const paddingX = 60;
  const paddingY = 40;

  depths.forEach(d => {
    const group = depthGroups[d] || [];
    const count = group.length;
    const x = paddingX + (d / maxDepth) * (width - 2 * paddingX);

    group.forEach((id, idx) => {
      const y = height / 2 + (idx - (count - 1) / 2) * paddingY;
      if (verticesMap[id]) {
        verticesMap[id].x = x;
        verticesMap[id].y = y;
      }
    });
  });

  // 2. Build list of edges (transitions)
  const edges: Edge[] = [];
  const edgeSet = new Set<string>();

  scenario.nodes.forEach(node => {
    node.choices.forEach(choice => {
      const nextTarget = choice.next_node;
      const isEnding = endingsSet.has(nextTarget);

      if (isEnding) {
        const edgeKey = `${node.node_id}->${nextTarget}`;
        if (!edgeSet.has(edgeKey)) {
          edgeSet.add(edgeKey);
          edges.push({ from: node.node_id, to: nextTarget });
        }
      } else {
        const basePrefix = nextTarget.split("_").slice(0, 2).join("_");
        const candidates = scenario.nodes.filter(
          n => n.node_id === nextTarget || n.node_id.startsWith(basePrefix + "_")
        );

        candidates.forEach(cand => {
          const edgeKey = `${node.node_id}->${cand.node_id}`;
          if (!edgeSet.has(edgeKey)) {
            edgeSet.add(edgeKey);
            edges.push({ from: node.node_id, to: cand.node_id });
          }
        });
      }
    });
  });

  // Track currently glowing path connections and nodes based on animation step
  const activeEdges = new Set<string>();
  for (let i = 0; i < animationStep; i++) {
    const fromId = pathTaken[i];
    const toId = pathTaken[i + 1];
    if (fromId && toId) {
      activeEdges.add(`${fromId}->${toId}`);
    }
  }

  const activeNodes = new Set<string>();
  for (let i = 0; i <= animationStep; i++) {
    if (pathTaken[i]) {
      activeNodes.add(pathTaken[i]);
    }
  }

  return (
    <div className="w-full border border-neutral-900 bg-black/60 p-6 rounded-lg relative overflow-hidden font-mono select-none">
      <div className="flex justify-between items-center mb-4 border-b border-neutral-900 pb-2">
        <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">
          Behavioral Evaluation Map
        </span>
        <span className="text-[9px] text-red-500 font-bold animate-pulse uppercase">
          [UPLINK COMPLETED]
        </span>
      </div>

      <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-neutral-800">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full min-w-[640px] h-auto">
          <defs>
            {/* Retro CRT glow filter */}
            <filter id="vector-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. Draw static inactive grid connections */}
          {edges.map((edge, idx) => {
            const from = verticesMap[edge.from];
            const to = verticesMap[edge.to];
            if (!from || !to) return null;
            const isActive = activeEdges.has(`${edge.from}->${edge.to}`);

            return (
              <line
                key={`edge-static-${idx}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={isActive ? "transparent" : "#1a1a1a"}
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
            );
          })}

          {/* 2. Draw highlighted white path (active edges) */}
          {edges.map((edge, idx) => {
            const from = verticesMap[edge.from];
            const to = verticesMap[edge.to];
            if (!from || !to) return null;
            const isActive = activeEdges.has(`${edge.from}->${edge.to}`);
            if (!isActive) return null;

            return (
              <line
                key={`edge-active-${idx}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="white"
                strokeWidth="2.5"
                filter="url(#vector-glow)"
              />
            );
          })}

          {/* 3. Draw nodes & endings */}
          {Object.values(verticesMap).map((v) => {
            const isActive = activeNodes.has(v.id);
            const isEnding = v.type === "ending";
            const isUserEndingNode = v.id === pathTaken[pathTaken.length - 1];

            return (
              <g key={v.id}>
                {isEnding ? (
                  // diamond shapes for outcome states
                  <rect
                    x={v.x - 6}
                    y={v.y - 6}
                    width="12"
                    height="12"
                    transform={`rotate(45 ${v.x} ${v.y})`}
                    fill={isActive ? (isUserEndingNode ? "#ef4444" : "white") : "#0a0a0a"}
                    stroke={isActive ? (isUserEndingNode ? "#ef4444" : "white") : "#1e1e1e"}
                    strokeWidth="1.5"
                    filter={isActive ? "url(#vector-glow)" : undefined}
                    className="transition-all duration-300"
                  />
                ) : (
                  // circle shapes for choices
                  <circle
                    cx={v.x}
                    cy={v.y}
                    r={isActive ? 6 : 4}
                    fill={isActive ? "white" : "#0a0a0a"}
                    stroke={isActive ? "white" : "#2a2a2a"}
                    strokeWidth="1.5"
                    filter={isActive ? "url(#vector-glow)" : undefined}
                    className="transition-all duration-300"
                  />
                )}

                {/* Subtitle label for outcome node */}
                {isEnding && (
                  <text
                    x={v.x}
                    y={v.y + 22}
                    textAnchor="middle"
                    fill={isUserEndingNode && isActive ? "#ef4444" : "#444"}
                    className={`text-[8px] font-bold uppercase transition-all select-none ${
                      isUserEndingNode && isActive ? "animate-pulse fill-red-500 font-extrabold" : "fill-neutral-600"
                    }`}
                  >
                    {isUserEndingNode && isActive ? "OUTCOME REACHED" : "OUTCOME"}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
