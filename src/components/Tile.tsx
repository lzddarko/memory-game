import type { FC } from "react";
import styles from "../css/Tile.module.css";
import { useGameContext } from "../contexts/GameContext";


/**
 * Single tile props
 */
interface TileProps {
  index: number;
}

/**
 * Grid tile component
 */
const Tile: FC<TileProps> = ({ index }: TileProps) => {
  const { gameStatus, grid, guess } = useGameContext();

  /**
   * Handles click on the tile
   */
  const handleClick = () => {
    if (gameStatus !== "guessing") { return; }

    guess(index)
  }


  const tileClasses = ["tile", gameStatus];
  if (grid[index].isFilled) { tileClasses.push("filled"); }
  if (grid[index].isGuessed) { tileClasses.push("guessed") }
  const classes = tileClasses.map((c) => styles[c]).join(" ");

  const widthPercent = Math.round(100 / Math.sqrt(grid.length)) - 10;


  return (
    <div
      className={`${classes}`}
      style={{ flex: `1 0 ${widthPercent}%` }}
      onClick={handleClick}
    >
    </div>
  );
}

export default Tile;