import React from "react";
import { AgentType, GridConfig } from "../types";

interface ConfigurationPanelProps {
  agentType: AgentType;
  setAgentType: (type: AgentType) => void;
  gridConfig: GridConfig;
  setGridConfig: (config: GridConfig) => void;
  onRunAgent: () => void;
}

export const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({
  agentType,
  setAgentType,
  gridConfig,
  setGridConfig,
  onRunAgent,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGridConfig({ ...gridConfig, [name]: parseFloat(value) });
  };

  const handleDimensionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGridConfig({ ...gridConfig, [name]: parseInt(value, 10) });
  };

  return (
    <div className="configuration-panel">
      <div className="input-group">
        <label htmlFor="agent-type">Agent Type:</label>
        <select
          id="agent-type"
          value={agentType}
          onChange={(e) => setAgentType(e.target.value as AgentType)}
        >
          <option value={AgentType.ValueIteration}>Value Iteration</option>
          <option value={AgentType.QLearning}>Q-Learning</option>
        </select>
      </div>
      <div className="input-group">
        <label htmlFor="grid-width">Grid Width:</label>
        <input
          id="grid-width"
          type="number"
          name="x"
          value={gridConfig.x}
          onChange={handleDimensionsChange}
          placeholder="Grid Width"
        />
      </div>
      <div className="input-group">
        <label htmlFor="grid-height">Grid Height:</label>
        <input
          id="grid-height"
          type="number"
          name="y"
          value={gridConfig.y}
          onChange={handleDimensionsChange}
          placeholder="Grid Height"
        />
      </div>
      <div className="input-group">
        <label htmlFor="discount">Discount:</label>
        <input
          id="discount"
          type="number"
          name="Discount"
          value={gridConfig.Discount}
          onChange={handleInputChange}
          placeholder="Discount"
          step="0.1"
        />
      </div>
      <div className="input-group">
        <label htmlFor="noise">Noise:</label>
        <input
          id="noise"
          type="number"
          name="Noise"
          value={gridConfig.Noise}
          onChange={handleInputChange}
          placeholder="Noise"
          step="0.1"
        />
      </div>
      <div className="input-group">
        <label htmlFor="transition-cost">Transition Cost:</label>
        <input
          id="transition-cost"
          type="number"
          name="TransitionCost"
          value={gridConfig.TransitionCost}
          onChange={handleInputChange}
          placeholder="Transition Cost"
          step="0.1"
        />
      </div>
    </div>
  );
};
