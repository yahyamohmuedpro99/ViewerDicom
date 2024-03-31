import React from 'react';
import './selector.css'; // Import CSS file for styling
import { toolOptions } from '../utils';

const ToolSelector = ({ changeTool }) => {
  

  return (
    <select onChange={(e) => changeTool(e.target.value)} className="tool-select">
      {toolOptions.map((tool, index) => (
        <option key={index} value={tool}>{tool}</option>
      ))}
    </select>
  );
};

export default ToolSelector;
