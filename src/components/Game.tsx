import type { FC } from "react";
import { useGameContext } from "../contexts/GameContext";
import Instructions from "./Instructions";
import Status from "./Status";
import Grid from "./Grid";
import Result from "./Result";


/**
 * The main game component
 */
const Game: FC = () => {
  const { gameStatus } = useGameContext()

  return (
    <>
      {gameStatus === "instructions" && <Instructions />}

      {gameStatus === "over" && <Result />}

      {["presenting", "guessing"].includes(gameStatus) && (
        <>
          <Status />
          <Grid />
        </>
      )}
    </>
  );
}

export default Game;