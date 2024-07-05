export enum AgentType {
  ValueIteration = "ValueIteration",
  QLearning = "QLearning",
}

export interface GridConfig {
  x: number;
  y: number;
  Terminal: [number, number, number][];
  Boulder: [number, number][];
  RobotStartState: [number, number];
  K: number;
  Discount: number;
  Noise: number;
  TransitionCost: number;
  Alpha: number;
  Episodes: number;
}

export interface AgentOutput {
  iterations: ValueIterationOutput | QLearningOutput;
  message: string;
}

export interface ValueIterationOutput {
  [iteration: string]: {
    [cellKey: string]: {
      best_action: string;
      value: number;
    };
  };
}

export interface QLearningOutput {
  [iteration: string]: {
    q_values: {
      [cellKey: string]: {
        [action: string]: number;
      };
    };
    sequences: string[];
  };
}
