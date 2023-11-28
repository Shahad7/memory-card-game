import "../styles/index.css";

function Scoreboard({ score, highScore }) {
    return (
        <div id="scoreboard">
            <div>Score: {score}</div>
            <div>High Score:{highScore} </div>
        </div>
    );
}

export default Scoreboard;
