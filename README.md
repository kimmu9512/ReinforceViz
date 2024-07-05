# ReinforceViz

ReinforceViz is an interactive web interface for visualizing Q-learning and Value Iteration AI agents in reinforcement learning. It features customizable grid environments, real-time updates, and step-by-step execution for educational purposes. This frontend application pairs with the ReinforceViz backend API, which holds the code for the Q-learning and Value Iteration agents.

## Features

- Interactive grid environment configuration
- Support for Value Iteration and Q-Learning algorithms
- Real-time visualization of agent learning process
- Step-by-step iteration and sequence controls
- Customizable agent parameters

## Technologies Used

- React
- TypeScript
- Vite
- Axios for API communication

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/kimmu9512/reinforce-viz-frontend.git
cd reinforce-viz-frontend
```

2. Install dependencies:

```bash
npm install

```

or if you're using yarn:

```bash
yarn install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173` (or the port specified in the console output).

## Usage

1. Select the agent type (Value Iteration or Q-Learning) from the screen.
2. Configure the grid dimensions and agent parameters.
3. Set up the grid environment by clicking on cells to place the robot start position, boulders, and terminal states with rewards or penalty.
4. Click the "Run Agent" button to start the simulation.
5. Use the iteration and sequence controls to step through the learning process.

## Project Structure

The main components of the project are:

- `App.tsx`: The main application component
- `ConfigurationPanel.tsx`: Handles user input for agent and grid configuration such as agent type, grid dimensions, and parameters before AI agents are executed
- `InteractiveGrid.tsx`: Allows users to set up the grid environment before the AI agents are executed
- `Grid.tsx`: Displays the current state of the grid and agent by iterations and sequences
- `IterationControls.tsx`: Provides controls for stepping through iterations and sequences
- `api.ts`: Handles communication with the backend API

## License

This project is licensed under the MIT License.

## Acknowledgments

- This project was created as an educational tool for reinforcement learning visualization.
-
