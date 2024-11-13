import "./App.css";
import { useState, useCallback, useEffect } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const initialEdges = [
  {
    id: "1-2",
    source: "1",
    target: "2",
    label: "Software Developer",
    type: "step",
  },
];

const initialNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "Tushar" },
  },
  {
    id: "2",
    position: { x: 100, y: 100 },
    data: { label: "Mandani" },
  },
];

function App() {
  const [variant, setVariant] = useState("dots");
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  useEffect(() => {
    console.log(variant);
  }, [variant]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  return (
    <div style={{ height: "94vh", width: "100%", position: "relative" }}>
      <div className="button">
        <button type="button" onClick={() => setVariant("cross")}>
          Cross
        </button>
        <button type="button" onClick={() => setVariant("dots")}>
          Dots
        </button>
        <button type="button" onClick={() => setVariant("lines")}>
          Lines
        </button>
      </div>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background variant={variant} />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default App;
