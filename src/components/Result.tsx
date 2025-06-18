import type { FC } from "react";
import { useGameContext } from "../contexts/GameContext";
import styles from "../css/Result.module.css"


/**
 * Game results component
 */
const Result: FC = () => {
  const { level, restart } = useGameContext();
  const record = parseInt(
    localStorage.getItem("maxLevel") ?? "0"
  );

  return (
    <div>
      <span className={styles.result}>You lost!</span>
      <span className={styles.level}>Highest level reached: {level}</span>
      <span className={styles.record}>All-time record: {record}</span>

      <button onClick={restart}>Play again</button>
    </div>
  );
}

export default Result;