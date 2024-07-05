import React, { useState } from "react";
import { GridConfig, AgentType } from "../types";
import GridCell from "./GridCell";

interface InteractiveGridProps {
  width: number;
  height: number;
  onCellClick: (
    x: number,
    y: number,
    cellType: string,
    reward?: number
  ) => void;
  agentType: AgentType;
  gridConfig: GridConfig;
  setGridConfig: (config: GridConfig) => void;
}

const InteractiveGrid: React.FC<InteractiveGridProps> = ({
  width,
  height,
  onCellClick,
  gridConfig,
  agentType,
  setGridConfig,
}) => {
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(
    null
  );
  const [rewardInput, setRewardInput] = useState<string>("");

  const handleCellClick = (x: number, y: number) => {
    setSelectedCell([x, y]);
  };

  const handleOptionSelect = (option: string) => {
    if (selectedCell) {
      const [x, y] = selectedCell;
      let newConfig = { ...gridConfig };

      // Remove the cell from all states first
      newConfig.Boulder = newConfig.Boulder.filter(
        ([bx, by]) => bx !== x || by !== y
      );
      newConfig.Terminal = newConfig.Terminal.filter(
        ([tx, ty]) => tx !== x || ty !== y
      );
      if (
        newConfig.RobotStartState[0] === x &&
        newConfig.RobotStartState[1] === y
      ) {
        newConfig.RobotStartState = [-1, -1]; // Set to invalid coordinates
      }

      // Then add the cell to the new state if necessary
      if (option === "RobotStartState") {
        newConfig.RobotStartState = [x, y];
      } else if (option === "Boulder") {
        newConfig.Boulder.push([x, y]);
      } else if (option === "Terminal") {
        const reward = parseFloat(rewardInput);
        if (!isNaN(reward)) {
          newConfig.Terminal.push([x, y, reward]);
        } else {
          alert("Please enter a valid number for the terminal reward.");
          return;
        }
      }
      // For "Nothing", we don't need to add anything

      setGridConfig(newConfig);
      onCellClick(
        x,
        y,
        option,
        option === "Terminal" ? parseFloat(rewardInput) : undefined
      );
      setSelectedCell(null);
      setRewardInput("");
    } else {
      alert("Please select a cell first.");
    }
  };

  const getCellType = (x: number, y: number) => {
    if (
      gridConfig.RobotStartState[0] === x &&
      gridConfig.RobotStartState[1] === y
    ) {
      return "Robot";
    }
    if (gridConfig.Boulder.some(([bx, by]) => bx === x && by === y)) {
      return "Boulder";
    }
    const terminal = gridConfig.Terminal.find(
      ([tx, ty]) => tx === x && ty === y
    );
    if (terminal) {
      return `Terminal (${terminal[2]})`;
    }
    return "Empty";
  };

  const handleAgentSpecificInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setGridConfig({ ...gridConfig, [name]: parseFloat(value) });
  };

  return (
    <div className="interactive-grid-container">
      <div className="interactive-grid">
        {Array.from({ length: height }, (_, y) => (
          <div key={height - 1 - y} className="grid-row">
            {Array.from({ length: width }, (_, x) => (
              <GridCell
                key={`${x},${height - 1 - y}`}
                x={x}
                y={height - 1 - y}
                cellType={getCellType(x, height - 1 - y)}
                updateGridState={() => {}}
                isSelected={
                  selectedCell !== null &&
                  selectedCell[0] === x &&
                  selectedCell[1] === height - 1 - y
                }
                onSelect={() => handleCellClick(x, height - 1 - y)}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="cell-options">
        <button onClick={() => handleOptionSelect("RobotStartState")}>
          Set Robot Start
        </button>
        <button onClick={() => handleOptionSelect("Boulder")}>
          Set Boulder
        </button>
        <button onClick={() => handleOptionSelect("Nothing")}>
          Set as Nothing
        </button>
        <div>
          <input
            type="number"
            value={rewardInput}
            onChange={(e) => setRewardInput(e.target.value)}
            placeholder="Terminal Reward"
          />
          <button onClick={() => handleOptionSelect("Terminal")}>
            Set Terminal
          </button>
        </div>
      </div>
      <div className="agent-specific-inputs">
        {agentType === AgentType.ValueIteration && (
          <div className="input-group">
            <label htmlFor="k">K:</label>
            <input
              id="k"
              type="number"
              name="K"
              value={gridConfig.K}
              onChange={handleAgentSpecificInputChange}
              placeholder="K"
            />
          </div>
        )}
        {agentType === AgentType.QLearning && (
          <div className="q-learning-inputs">
            <div className="input-group">
              <label htmlFor="alpha">Alpha:</label>
              <input
                id="alpha"
                type="number"
                name="Alpha"
                value={gridConfig.Alpha}
                onChange={handleAgentSpecificInputChange}
                placeholder="Alpha"
                step="0.1"
              />
            </div>
            <div className="input-group">
              <label htmlFor="episodes">Episodes:</label>
              <input
                id="episodes"
                type="number"
                name="Episodes"
                value={gridConfig.Episodes}
                onChange={handleAgentSpecificInputChange}
                placeholder="Episodes"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveGrid;
