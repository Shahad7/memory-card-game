import "../styles/index.css";

function Card({ name, image, handleClick, id }) {
    let height, width, posX, posY;
    function handleHover(e) {
        posX = e.nativeEvent.offsetX;
        posY = e.nativeEvent.offsetY;
        height = e.target.offsetHeight;
        width = e.target.offsetWidth;
        e.target.style.transform = `perspective(1000px) rotateY(${
            (posX - width / 2) * 0.2
        }deg) 
        rotateX(${-(posY - height / 2) * 0.2}deg)`;
    }

    function fixAngle(e) {
        e.target.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg)`;
    }
    return (
        <div
            className="card"
            id={id}
            onClick={handleClick}
            onMouseMove={handleHover}
            onMouseOut={fixAngle}
        >
            <div className="character-container">
                <img
                    className="character-image"
                    draggable={false}
                    src={image}
                    alt=""
                />
            </div>
            <div className="character-name">{name}</div>
        </div>
    );
}
export default Card;
