import "./App.css";
import { useState, useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import CustomeNode from "./components/CustomeNode/CustomeNode";

const initialNodes = [
  {
    id: 'node-1',
    type: 'textUpdater',
    position: { x: 0, y: 0 },
    data: { value: 123 },
  },
  {
    id: 'node-2',
    type: 'output',
    targetPosition: 'top',
    position: { x: 0, y: 200 },
    data: { label: 'node 2' },
  },
  {
    id: 'node-3',
    type: 'output',
    targetPosition: 'top',
    position: { x: 200, y: 200 },
    data: { label: 'node 3' },
  },
];


const initialEdges = [
  { id: 'edge-1', source: 'node-1', sourceHandle: 'a', target: 'node-2', animated: true },
  { id: 'edge-2', source: 'node-1', sourceHandle: 'b', target: 'node-3', animated: true },
];

// const initialEdges = [
//   {
//     id: "1-2",
//     source: "1",
//     target: "2",
//     label: "Software Developer",
//     type: "step",
//   },
// ];

// const initialNodes = [
//   {
//     id: "1",
//     position: { x: 0, y: 0 },
//     data: { label: "Tushar" },
//   },
//   {
//     id: "2",
//     position: { x: 100, y: 100 },
//     data: { label: "Mandani" },
//   },
// ];

const nodeTypes = { textUpdater: CustomeNode };

function App() {
  const [variant, setVariant] = useState("dots");
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

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
        nodeTypes={nodeTypes}
        fitView
      >
        <Background variant={variant} />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default App;
