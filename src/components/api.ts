import axios from "axios";
import { AgentType, GridConfig, AgentOutput } from "../types";

const API_BASE_URL =
  "https://reinforceviz-backend-446b07cd4f3e.herokuapp.com/api";

export const runAgent = async (
  agentType: AgentType,
  gridConfig: GridConfig
): Promise<AgentOutput> => {
  const endpoint =
    agentType === AgentType.ValueIteration
      ? "value-iteration/run-agent"
      : "q-learning/run-agent";
  const response = await axios.post(`${API_BASE_URL}/${endpoint}`, gridConfig);
  return response.data;
};
