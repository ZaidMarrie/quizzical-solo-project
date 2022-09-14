import blobTopRight from "../assets/blob-quiz-top.png";
import blobBottomLeft from "../assets/blob-quiz-bottom.png";
import QuizItem from "./QuizItem";

function Quiz() {
	return (
		<div className="quiz">
			<QuizItem />
			<button className="btn btn--quiz">Check answers</button>

			<img src={blobTopRight} alt="A circular blob" className="blob blob--top-right" />
			<img src={blobBottomLeft} alt="A circular blob" className="blob blob--bottom-left" />
		</div>
	);
}

export default Quiz;
