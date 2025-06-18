import type { FC } from "react"
import { useGameContext } from "../contexts/GameContext";
import Tile from "./Tile";
import styles from "../css/Grid.module.css"


/**
 * Tiles grid component
 */
const Grid: FC = () => {
  const { grid } = useGameContext();
  const rows = Math.sqrt(grid.length);

  return (
    <div
      className={styles.grid}
      style={{
        gridTemplateColumns: `repeat(${rows}, 1fr)`
      }}
    >
      {Array((rows) ** 2).fill(null).map((_value, index) => (
        <Tile key={index} index={index} />
      ))}
    </div>
  );
}

export default Grid;