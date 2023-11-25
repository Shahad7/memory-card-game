import "../styles/index.css";

function Card({ name, image, handleClick, id }) {
    return (
        <div className="card" id={id} onClick={handleClick}>
            <p>{name}</p>
            <img
                className="character-image"
                draggable={false}
                src={image}
                alt=""
            />
        </div>
    );
}
export default Card;
