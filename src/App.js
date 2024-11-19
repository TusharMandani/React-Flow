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
import CustomEdge from "./components/CustomeEdge/CustomeEdge";

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
    position: { x: 300, y: 200 },
    data: { label: 'node 3' },
  },
];

const initialEdges = [
  { id: 'edge-1', source: 'node-1', type: 'custom-edge', sourceHandle: 'a', target: 'node-2' },
  { id: 'edge-2', source: 'node-1', type: 'custom-edge', sourceHandle: 'b', target: 'node-3' },
];

const nodeTypes = { textUpdater: CustomeNode };
const edgeTypes = { 'custom-edge': CustomEdge };

function App() {
  const [variant, setVariant] = useState("dots");
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [animationEnabled, setAnimationEnabled] = useState(false);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (connection) => {
      const edge = { ...connection, type: 'custom-edge', animated: animationEnabled };
      setEdges((eds) => addEdge(edge, eds));
    },
    [animationEnabled]
  );

  // Toggle animation on edges
  const toggleEdgeAnimation = () => {
    setAnimationEnabled((prev) => !prev);
    setEdges((currentEdges) =>
      currentEdges.map((edge) => ({
        ...edge,
        animated: !animationEnabled,
      }))
    );
  };

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
        <div className="slider-container">
          <label className="switch">
            <input
              type="checkbox"
              checked={animationEnabled}
              onChange={toggleEdgeAnimation}
              className="slider-checkbox"
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
      >
        <Background variant={variant} />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default App;
