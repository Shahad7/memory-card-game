import { useState, useEffect } from "react";
import "../styles/index.css";
import Card from "./Card.jsx";
import Scoreboard from "./Scoreboard.jsx";
import Result from "./Result.jsx";
import { v4 as uuidv4 } from "uuid";

function App() {
    const [content, setContent] = useState([]);
    const [selectedCards, setSelectedCards] = useState([]);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [gameover, setGameover] = useState(false);

    useEffect(() => {
        if (score != 0) handleAnimation();
    }, [score]);

    useEffect(() => {
        let ignore = false;
        let name, image;
        async function getData() {
            const result = await fetch(
                "https://rickandmortyapi.com/api/character"
            );
            const data = await result.json();
            const characters = data.results;
            characters.splice(12, 8);

            if (!ignore) {
                const characterSet = characters.map((elt) => {
                    return {
                        id: elt.id,
                        name: elt.name,
                        image: elt.image,
                    };
                });
                let shuffledSet = shuffle(characterSet);
                setContent(shuffledSet);
            }
        }
        getData();

        return () => {
            ignore = true;
        };
    }, []);

    const cards = content.map((elt) => (
        <Card
            id={elt.id}
            key={uuidv4()}
            name={elt.name}
            image={elt.image}
            handleClick={handleClick}
        />
    ));

    function shuffle(param) {
        let temp, randomIndex;
        let arr = param.slice();
        for (let i = 0; i < 12; i++) {
            randomIndex = Math.floor(Math.random() * 12);
            temp = arr[randomIndex];
            arr[randomIndex] = arr[11];
            arr[11] = temp;
        }
        arr = arr.filter((elt) => elt != undefined);
        return arr;
    }

    function handleClick(e) {
        if (!gameover) {
            handleAnimation();

            let newContent = shuffle(content);
            setContent(newContent.slice());

            if (!selectedCards.includes(e.target.id)) {
                if (score == 11) {
                    setGameover(true);
                }
                selectedCards.push(e.target.id);
                setSelectedCards(selectedCards.slice());
                setScore(score + 1);
            } else {
                if (score > highScore) setHighScore(score);
                setGameover(true);
            }
        }
    }

    function handleAnimation() {
        document.querySelectorAll(".card").forEach((elt) => {
            elt.style.animationPlayState = "running";
            elt.firstChild.style.animationPlayState = "running";
            setTimeout(() => {
                elt.style.animationPlayState = "paused";
                elt.firstChild.style.animationPlayState = "paused";
            }, 1600);
        });
    }

    return (
        <div id="app">
            {cards}
            <Scoreboard score={score} highScore={highScore} />
            {gameover ? (
                <Result
                    score={score}
                    setSelectedCards={setSelectedCards}
                    setHighScore={setHighScore}
                    setScore={setScore}
                    setGameover={setGameover}
                />
            ) : null}
        </div>
    );
}

export default App;
