import { useState, useEffect } from "react";
import "../styles/index.css";
import Card from "./Card.jsx";
import Scoreboard from "./Scoreboard.jsx";

function App() {
    const [content, setContent] = useState([]);
    const [selectedCards, setSelectedCards] = useState([]);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [res, setRes] = useState("");

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
                setContent(characterSet);
            }
        }
        getData();

        return () => {
            ignore = true;
        };
    }, []);

    const cards = content.map((elt) => (
        <Card
            key={elt.id}
            id={elt.id}
            name={elt.name}
            image={elt.image}
            handleClick={handleClick}
        />
    ));

    function shuffle() {
        let temp, randomIndex;
        let arr = content.slice();
        for (let i = 0; i < 12; i++) {
            randomIndex = Math.floor(Math.random() * 12);
            temp = arr[randomIndex];
            arr[randomIndex] = arr[12];
            arr[12] = temp;
        }
        arr = arr.filter((elt) => elt != undefined);
        return arr;
    }

    function handleClick(e) {
        let newContent = shuffle();
        setContent(newContent.slice());

        if (!selectedCards.includes(e.target.id)) {
            if (score == 11) {
                //need to add an option to restart the game!
            }
            selectedCards.push(e.target.id);
            setSelectedCards(selectedCards.slice());
            setScore(score + 1);
        } else {
            if (score > highScore) setHighScore(score);
            setScore(0);
            setSelectedCards([]);
        }
    }
    return (
        <div id="app">
            {cards}
            <Scoreboard score={score} highScore={highScore} res={res} />
        </div>
    );
}

export default App;
