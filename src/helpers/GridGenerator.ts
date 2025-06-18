/**
 * Single grid tile
 */
export interface Tile {
  isFilled: boolean;
  isGuessed: boolean;
}

/**
 * Returns random grid for the given level
 * 
 * @param level number
 * @returns Tile[]
 */
export const generateGrid = (level: number): Tile[] => {
  const LEVELS_PER_ROW = 3;

  const tilesToFill = level + 1;
  const rows = Math.ceil(level / LEVELS_PER_ROW) + 2;
  const size = rows ** 2;


  // Initial empty grid
  const grid: Tile[] = Array.from({ length: size }, () => ({
    isFilled: false,
    isGuessed: false,
  }));

  // Shuffle the grid
  const indices = Array.from({ length: size }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  // Fill the shuffled tiles
  for (let i = 0; i < tilesToFill; i++) {
    grid[indices[i]].isFilled = true;
    grid[indices[i]].isGuessed = false;
  }


  return grid;
};
