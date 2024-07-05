import React from "react";

interface SequenceControlsProps {
  currentSequence: number;
  totalSequences: number;
  onSequenceChange: (sequence: number) => void;
}

const SequenceControls: React.FC<SequenceControlsProps> = ({
  currentSequence,
  totalSequences,
  onSequenceChange,
}) => {
  const handleSequenceChange = (newSequence: number) => {
    console.log(`Changing to sequence ${newSequence + 1} of ${totalSequences}`);
    onSequenceChange(newSequence);
  };
  return (
    <div>
      <button
        onClick={() => handleSequenceChange(currentSequence - 1)}
        disabled={currentSequence === 0}
      >
        Previous Sequence
      </button>
      <span>
        Sequence {currentSequence + 1} of {totalSequences}
      </span>
      <button
        onClick={() => handleSequenceChange(currentSequence + 1)}
        disabled={currentSequence === totalSequences - 1}
      >
        Next Sequence
      </button>
    </div>
  );
};

export default SequenceControls;
