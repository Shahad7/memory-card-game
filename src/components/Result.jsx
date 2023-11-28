import "../styles/index.css";

function Result({
    score,
    setHighScore,
    setScore,
    setSelectedCards,
    setGameover,
}) {
    function restart() {
        if (score == 12) {
            setHighScore(12);
        }

        setScore(0);
        setSelectedCards([]);
        setGameover(false);
    }

    return (
        <div id="result">
            {score == 12 ? <p>you won</p> : <p>loser!</p>}
            <button id="restart" onClick={restart}>
                restart
            </button>
        </div>
    );
}

export default Result;
