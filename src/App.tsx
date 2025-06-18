import type { JSX } from "react";
import { GameProvider } from "./contexts/GameContext";
import Game from "./components/Game";
import "./css/App.css";


const App = (): JSX.Element => {
  return (
    <GameProvider>
      <Game />
    </GameProvider>
  )
};

export default App;
