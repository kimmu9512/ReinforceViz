import React from "react";
import { AgentType } from "../types";

interface IterationControlsProps {
  currentIteration: number;
  setCurrentIteration: (iteration: number) => void;
  totalIterations: number;
  agentType: AgentType;
  currentSequence: number;
  setCurrentSequence: (sequence: number) => void;
  totalSequences: number;
}

const IterationControls: React.FC<IterationControlsProps> = ({
  currentIteration,
  setCurrentIteration,
  totalIterations,
  agentType,
  currentSequence,
  setCurrentSequence,
  totalSequences,
}) => {
  const handleSequenceChange = (newSequence: number) => {
    setCurrentSequence(newSequence);
  };
  return (
    <div className="iteration-controls">
      <button
        onClick={() => setCurrentIteration(Math.max(0, currentIteration - 1))}
        disabled={currentIteration === 0}
      >
        Previous Iteration
      </button>
      <span>
        Iteration {currentIteration} of {totalIterations - 1}
      </span>
      <button
        onClick={() =>
          setCurrentIteration(
            Math.min(totalIterations - 1, currentIteration + 1)
          )
        }
        disabled={currentIteration === totalIterations - 1}
      >
        Next Iteration
      </button>
      {agentType === AgentType.QLearning && (
        <>
          <button
            onClick={() =>
              handleSequenceChange(Math.max(0, currentSequence - 1))
            }
            disabled={currentSequence === 0}
          >
            Previous Sequence
          </button>
          <span>
            Sequence {currentSequence} of {totalSequences}
          </span>
          <button
            onClick={() =>
              handleSequenceChange(
                Math.min(totalSequences - 1, currentSequence + 1)
              )
            }
            disabled={currentSequence === totalSequences - 1}
          >
            Next Sequence
          </button>
        </>
      )}
    </div>
  );
};

export default IterationControls;
