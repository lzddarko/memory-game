// State management for the game


import {
    createContext,
    useState,
    useContext,
    useEffect,
    type ReactNode,
} from "react"

import {
    generateGrid,
    type Tile,
} from "../helpers/GridGenerator";


/**
 * Posible game statuses
 */
type GameStatus = "instructions" | "presenting" | "guessing" | "over";

/**
 * Parameters describing game context
 */
interface GameContextType {
    gameStatus: GameStatus;
    level: number;
    grid: Tile[];
    present: () => void;
    guess: (position: number) => void;
    restart: () => void;
}

// Initial game context
const GameContext = createContext<GameContextType>({
    gameStatus: "instructions",
    level: 1,
    grid: [],
    present: () => { },
    guess: (_position: number) => { },
    restart: () => { }
});


// Game context export
export const useGameContext = () => useContext(GameContext)


type GameProviderProps = {
    children: ReactNode;
}

/**
 * Game context provider
 */
export const GameProvider = ({ children }: GameProviderProps) => {
    const [level, setLevel] = useState(1);
    const [gameStatus, setGameStatus] = useState<GameStatus>("instructions")
    const [grid, setGrid] = useState(generateGrid(level))


    // Store new max level, when reached
    useEffect(
        () => {
            const storedMaxLevel = parseInt(
                localStorage.getItem("maxLevel") ?? "0"
            );

            if (level > storedMaxLevel) {
                localStorage.setItem("maxLevel", level.toString());
            }
        },
        [level]
    );

    // Start "turning off" the bulbs after 2s
    if (gameStatus === "presenting") {
        setTimeout(() => setGameStatus("guessing"), 2_000)
    }

    /**
     * Returns whether the level is solved
     */
    const isSolved = (): boolean => {
        return grid
            .filter((tile) => tile.isFilled)
            .every((tile) => tile.isGuessed);
    }

    /**
     * Changes game state to "presenting" - turns on the level's bulbs
     */
    const present = (): void => { setGameStatus("presenting") }

    /**
     * Restarts the game
     */
    const restart = (): void => {
        setLevel(1);
        setGrid(generateGrid(1));
        present();
    }

    /**
     * Handles guess at the given position
     */
    const guess = (position: number): void => {
        if (grid[position].isGuessed) { return; }

        if (!grid[position].isFilled) {
            setGameStatus("over");
            return;
        }

        let newGrid = [...grid]
        newGrid[position].isGuessed = true;
        setGrid(newGrid);

        if (isSolved()) {
            const nextLevel = level + 1;

            setLevel(nextLevel);
            setGrid(generateGrid(nextLevel));
            setGameStatus("presenting");
        }
    }


    return (
        <GameContext.Provider
            value={{
                gameStatus,
                level,
                grid,
                present,
                guess,
                restart,
            }}
        >
            {children}
        </GameContext.Provider>
    );
}