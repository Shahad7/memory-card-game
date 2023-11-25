import "../styles/index.css";

function Scoreboard({ score, highScore, res }) {
    return (
        <div id="scoreboard">
            <div>Score: {score}</div>
            <div>High Score:{highScore} </div>
            <div>result:{res}</div>
        </div>
    );
}

export default Scoreboard;
