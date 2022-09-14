import QuizQuestion from "./QuizQuestion";
import QuizAnswer from "./QuizAnswer";

function QuizItem() {
	return (
		<div className="quiz__item">
			<QuizQuestion />
			<div className="quiz__answers flex">
				<QuizAnswer selected={true} />
				<QuizAnswer />
				<QuizAnswer incorrect={true} />
				<QuizAnswer correct={true} />
			</div>
		</div>
	);
}

export default QuizItem;
