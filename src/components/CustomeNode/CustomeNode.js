import React, { useCallback } from 'react'
import { Handle, Position } from '@xyflow/react';
import './CustomeNode.css';

const handleStyle = { left: 10 };

export default function CustomeNode() {
  const onChange = useCallback((e) => {
    console.log(e.target.value);
  }, [])
  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Top} />
      <div>
        <label htmlFor="text">Text:</label>
        <input type="text" id="text" onChange={onChange} className='nodrag' />
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle type="source"
        position={Position.Bottom}
        id="b" style={handleStyle}></Handle>
    </div>
  )
}


