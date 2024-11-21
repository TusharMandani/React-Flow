import React from 'react';
import { useState, useCallback } from 'react';
import {
    ReactFlow,
    Background,
    Controls,
    applyEdgeChanges,
    applyNodeChanges,
    addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CustomeNode from '../CustomeNode/CustomeNode';
import CustomEdge from '../CustomeEdge/CustomeEdge';

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

export default function Dashboard() {
    const [variant, setVariant] = useState('dots');
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
        <div className="h-screen w-full relative">
            <div className="absolute top-0 left-0 p-4 bg-white z-10 flex space-x-4">
                <button
                    type="button"
                    onClick={() => setVariant('cross')}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                    Cross
                </button>
                <button
                    type="button"
                    onClick={() => setVariant('dots')}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                    Dots
                </button>
                <button
                    type="button"
                    onClick={() => setVariant('lines')}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                    Lines
                </button>
                <div className="flex items-center">
                    <label htmlFor="animation-toggle" className="mr-2 text-sm font-medium">
                        Animation
                    </label>
                    <label className="switch">
                        <input
                            id="animation-toggle"
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
                className="w-full h-full"
            >
                <Background variant={variant} />
                <Controls />
            </ReactFlow>
        </div>
    );
}
