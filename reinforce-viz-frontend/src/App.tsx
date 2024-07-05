import React, { useState, useEffect } from "react";
import { ConfigurationPanel } from "./components/ConfigurationPanel";
import Grid from "./components/Grid";
import IterationControls from "./components/IterationControls";
import { AgentType, GridConfig, AgentOutput, QLearningOutput } from "./types";
import { runAgent } from "./components/api";
import InteractiveGrid from "./components/InteractiveGrid";
import "./App.css";

const App: React.FC = () => {
  const [agentType, setAgentType] = useState<AgentType>(
    AgentType.ValueIteration
  );
  const [gridConfig, setGridConfig] = useState<GridConfig>({
    x: 4,
    y: 3,
    Terminal: [],
    Boulder: [],
    RobotStartState: [0, 0],
    K: 2,
    Discount: 0.9,
    Noise: 0.2,
    TransitionCost: 0.0,
    Alpha: 0.1,
    Episodes: 2,
  });
  const [agentOutput, setAgentOutput] = useState<AgentOutput | null>(null);
  const [currentIteration, setCurrentIteration] = useState(0);
  const [currentSequence, setCurrentSequence] = useState(0);
  useEffect(() => {
    setCurrentSequence(0);
  }, [currentIteration]);
  const handleAgentTypeChange = (newAgentType: AgentType) => {
    setAgentType(newAgentType);
    setAgentOutput(null);
    setCurrentIteration(0);
    setCurrentSequence(0);
  };
  const handleRunAgent = async () => {
    try {
      // Alert to show the data being sent to the backend
      console.log(JSON.stringify(gridConfig, null, 2));

      const output = await runAgent(agentType, gridConfig);
      setAgentOutput(output);
      console.log("Agent Output:", output);
      setCurrentIteration(0);
      setCurrentSequence(0);
    } catch (error) {
      console.error("Error running agent:", error);
    }
  };
  const handleCellClick = (
    x: number,
    y: number,
    cellType: string,
    reward?: number
  ) => {
    const newConfig = { ...gridConfig };

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
    if (cellType === "RobotStartState") {
      newConfig.RobotStartState = [x, y];
    } else if (cellType === "Boulder") {
      newConfig.Boulder.push([x, y]);
    } else if (cellType === "Terminal") {
      newConfig.Terminal.push([x, y, reward || 0]);
    }
    // For "Nothing", we don't need to add anything

    setGridConfig(newConfig);
  };
  return (
    <div className="app">
      <h1>ReinforceViz</h1>

      <div className="configuration-panel">
        <ConfigurationPanel
          agentType={agentType}
          setAgentType={handleAgentTypeChange}
          gridConfig={gridConfig}
          setGridConfig={setGridConfig}
          onRunAgent={handleRunAgent}
        />
      </div>
      <div className="interactive-grid-container">
        <InteractiveGrid
          width={gridConfig.x}
          height={gridConfig.y}
          onCellClick={handleCellClick}
          gridConfig={gridConfig}
          agentType={agentType}
          setGridConfig={setGridConfig}
        />
      </div>
      <div className="run-agent-button-container">
        <button onClick={handleRunAgent}>Run Agent</button>
      </div>
      {agentOutput && (
        <div className="results-container">
          {agentType === AgentType.QLearning && (
            <div className="info-message">
              <p>
                Note: Displayed values show the maximum Q-value for each state.
                <br />
                Initial Q-values are 0. Negative terminal states may not update
                <br />
                if new Q-value is lower than previous best or initial value.
              </p>
            </div>
          )}
          <Grid
            gridConfig={gridConfig}
            agentOutput={agentOutput}
            currentIteration={currentIteration}
            currentSequence={currentSequence}
            agentType={agentType}
          />
          <IterationControls
            currentIteration={currentIteration}
            setCurrentIteration={setCurrentIteration}
            totalIterations={Object.keys(agentOutput.iterations).length}
            agentType={agentType}
            currentSequence={currentSequence}
            setCurrentSequence={setCurrentSequence}
            totalSequences={
              agentType === AgentType.QLearning
                ? currentIteration ===
                  Object.keys(agentOutput.iterations).length - 1
                  ? 0
                  : (
                      agentOutput.iterations[currentIteration + 1]
                        .sequences as string[]
                    ).length
                : 0
            }
          />
        </div>
      )}
    </div>
  );
};

export default App;
