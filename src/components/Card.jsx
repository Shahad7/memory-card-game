import "../styles/index.css";

function Card({ name, image, handleClick, id }) {
    return (
        <div className="card" id={id} onClick={handleClick}>
            <img
                className="character-image"
                draggable={false}
                src={image}
                alt=""
            />

            <div className="character-name">{name}</div>
        </div>
    );
}
export default Card;
