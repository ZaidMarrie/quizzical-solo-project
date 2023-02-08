import { nanoid } from "nanoid";

export function formatQuizItems(quizData) {
	return quizData.map((quizItem) => {
		const answers = [...quizItem.incorrect_answers, quizItem.correct_answer];

		return {
			id: nanoid(),
			question: quizItem.question,
			answers: formatAnswers(answers, quizItem.correct_answer),
			correct_answer: quizItem.correct_answer,
		};
	});
}

// Maps over answers Array(of strings) returning an Array of Objects
function formatAnswers(answersArr, correctAnswer) {
	const formattedAnswers = answersArr.map((answer) => {
		const answerObj = {
			id: nanoid(),
			answerText: answer,
			isSelected: false,
			isCorrect: false,
		};

		if (answer === correctAnswer) {
			return { ...answerObj, isCorrect: true };
		}

		return answerObj;
	});

	// Shuffles answers before returning them
	return shuffleAnswers(formattedAnswers);
}

/*
 * Randomize array in-place using Durstenfeld shuffle algorithm
 * [Resource](https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)
 */
function shuffleAnswers(answersArr) {
	for (let i = answersArr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		let temp = answersArr[i];
		answersArr[i] = answersArr[j];
		answersArr[j] = temp;
	}

	return answersArr;
}
