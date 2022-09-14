import React from "react";

function QuizAnswer({ selected, correct, incorrect }) {
	let classNames = "quiz__answer";
	if (selected) {
		classNames += " selected";
	} else if (correct) {
		classNames += " correct";
	} else if (incorrect) {
		classNames += " incorrect";
	}

	return <div className={classNames}>QuizAnswer</div>;
}

export default QuizAnswer;
