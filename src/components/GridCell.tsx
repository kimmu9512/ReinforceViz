import React from "react";

interface GridCellProps {
  x: number;
  y: number;
  cellType: string;
  updateGridState: (
    x: number,
    y: number,
    cellType: string,
    reward?: number
  ) => void;
  cellValue?: { value: number; best_action: string };
  isInSequence?: boolean;
  isSelected: boolean;
  onSelect: (x: number, y: number) => void;
}

const GridCell: React.FC<GridCellProps> = ({
  x,
  y,
  cellType,
  updateGridState,
  cellValue,
  isInSequence,
  isSelected,
  onSelect,
}) => {
  const handleClick = () => {
    onSelect(x, y);
  };

  const getCellContent = () => {
    let content = [];

    if (cellType.startsWith("Terminal")) {
      const reward = cellType.match(/\((.*?)\)/)?.[1];
      content.push(
        <div key="terminal-icon" className="terminal-icon">
          T
        </div>
      );
      content.push(
        <div key="terminal-reward" className="terminal-reward">
          {reward}
        </div>
      );
    } else if (cellType === "Robot") {
      content.push(
        <div key="robot-icon" className="robot-icon">
          R
        </div>
      );
    } else if (cellType === "Boulder") {
      content.push(
        <div key="boulder-icon" className="boulder-icon">
          B
        </div>
      );
    } else if (cellValue) {
      content.push(
        <div key="cell-value" className="cell-value">
          {cellValue.value.toFixed(2)}
        </div>
      );
      content.push(
        <div key="best-action" className="best-action">
          {cellValue.best_action}
        </div>
      );
    }

    return content;
  };

  return (
    <div
      className={`grid-cell ${cellType.toLowerCase().split("(")[0]} ${
        isInSequence ? "in-sequence" : ""
      } ${isSelected ? "selected" : ""}`}
      onClick={handleClick}
    >
      {getCellContent()}
    </div>
  );
};

export default GridCell;
