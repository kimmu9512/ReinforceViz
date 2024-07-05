import React from "react";
import {
  AgentType,
  GridConfig,
  AgentOutput,
  ValueIterationOutput,
  QLearningOutput,
} from "../types";
import GridCell from "./GridCell";

interface GridProps {
  gridConfig: GridConfig;
  agentOutput: AgentOutput;
  currentIteration: number;
  currentSequence: number;
  agentType: AgentType;
}

const Grid: React.FC<GridProps> = ({
  gridConfig,
  agentOutput,
  currentIteration,
  currentSequence,
  agentType,
}) => {
  const getCellType = (x: number, y: number): string => {
    if (gridConfig.Boulder.some(([bx, by]) => bx === x && by === y)) {
      return "Boulder";
    }
    const terminal = gridConfig.Terminal.find(
      ([tx, ty]) => tx === x && ty === y
    );
    if (terminal && agentType !== AgentType.QLearning) {
      return `Terminal(${terminal[2]})`;
    }
    return "Empty";
  };

  const renderCell = (x: number, y: number) => {
    const key = `${x},${y}`;
    let cellData;
    let isRobotHere = false;
    if (agentType === AgentType.ValueIteration) {
      cellData = (agentOutput.iterations as ValueIterationOutput)[
        currentIteration
      ]?.[key];
    } else if (agentType === AgentType.QLearning) {
      const qLearningData = agentOutput.iterations as QLearningOutput;
      cellData = qLearningData[currentIteration]?.q_values[key];
      const sequence = qLearningData[currentIteration + 1]?.sequences;
      isRobotHere = sequence && sequence[currentSequence] === key;
    }
    const cellValue = cellData
      ? agentType === AgentType.ValueIteration
        ? { value: cellData.value, best_action: String(cellData.best_action) }
        : {
            value:
              cellData.Terminate !== undefined
                ? cellData.Terminate
                : Math.max(...Object.values(cellData).map(Number)),
            best_action:
              cellData.Terminate !== undefined
                ? "Terminate"
                : Object.entries(cellData).reduce((a, b) =>
                    Number(a[1]) > Number(b[1]) ? a : b
                  )[0],
          }
      : undefined;

    return (
      <GridCell
        key={key}
        x={x}
        y={y}
        cellType={isRobotHere ? "Robot" : getCellType(x, y)}
        updateGridState={() => {}}
        cellValue={cellValue}
        isInSequence={isRobotHere}
        isSelected={false}
        onSelect={() => {}}
      />
    );
  };

  return (
    <div className="grid">
      {Array.from({ length: gridConfig.y }, (_, y) => (
        <div key={gridConfig.y - 1 - y} className="grid-row">
          {Array.from({ length: gridConfig.x }, (_, x) =>
            renderCell(x, gridConfig.y - 1 - y)
          )}
        </div>
      ))}
    </div>
  );
};

export default Grid;
