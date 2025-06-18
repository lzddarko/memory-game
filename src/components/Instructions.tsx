import type { FC } from "react"
import icon from "../assets/icon.png"
import { useGameContext } from "../contexts/GameContext";


/**
 * Game instructions component
 */
const Instructions: FC = () => {
    const { present: start } = useGameContext();

    return (
        <div className="intro">
            <img src={icon} alt="Icon" width="150px" className="icon" />

            <h1 className="title">Memory Game</h1>
            <p>
                A grid of lightbulbs will be shown, with some of them illuminated.
            </p>
            <p>
                After they all turn off, click the ones that were illuminated.
            </p>

            <button onClick={start}> Play</button>
        </div>
    );
}

export default Instructions;