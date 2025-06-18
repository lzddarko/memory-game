import type { FC } from "react"
import { useGameContext } from "../contexts/GameContext";
import styles from "../css/Status.module.css";


/**
 * Game status component
 */
const Status: FC = () => {
  const { level } = useGameContext();

  return (
    <div>
      <span className={styles.level}>Level {level}</span>
    </div>
  );
}

export default Status;