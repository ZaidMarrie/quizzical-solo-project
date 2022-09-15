import blobBottomLeft from "../assets/blob-bottom.png";
import blobTopRight from "../assets/blob-top.png";

function OpeningScreen({ startGame }) {
	return (
		<div className="opening-screen centre">
			<h1 className="title">Quizzical</h1>
			<p className="desc">Some description if needed</p>
			<button className="btn" onClick={startGame}>
				Start quiz
			</button>

			<img src={blobTopRight} alt="A circular blob" className="blob blob--top-right" />
			<img src={blobBottomLeft} alt="A circular blob" className="blob blob--bottom-left" />
		</div>
	);
}

export default OpeningScreen;
