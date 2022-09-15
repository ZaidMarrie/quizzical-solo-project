import { useState, useEffect } from "react";
import { formatQuizItems } from "../utils";

import blobTopRight from "../assets/blob-quiz-top.png";
import blobBottomLeft from "../assets/blob-quiz-bottom.png";

import QuizItem from "./QuizItem";
import QuizQuestion from "./QuizQuestion";
import QuizAnswer from "./QuizAnswer";

function Quiz() {
	const [quizData, setQuizData] = useState([]);
	const [quizScore, setQuizScore] = useState(0);
	const [checkedResults, setCheckedResults] = useState(false);
	const [playingAgain, setPlayingAgain] = useState(false);

	useEffect(() => {
		getQuizData("https://opentdb.com/api.php?amount=5&category=9&type=multiple");
	}, [playingAgain]);

	const getQuizData = async (url) => {
		const res = await fetch(url);
		const data = await res.json();
		const quizData = formatQuizItems(data.results);

		setQuizData(quizData);
		setQuizScore(0);
		setCheckedResults(false);
	};

	const selectAnswer = (itemId, answerId) => {
		setQuizData((prevQuizData) => {
			return prevQuizData.map((quizItem) => {
				/* Maps over answers Array and switch the `isSelected` property
				 * on the selected answer, changing the rest of the answers of that
				 * questions `isSelected` property to `false`
				 */
				const newAnswers = quizItem.answers.map((answer) => {
					if (quizItem.id === itemId && answer.id === answerId) {
						return { ...answer, isSelected: !answer.isSelected };
					} else if (quizItem.id === itemId) {
						return { ...answer, isSelected: false };
					} else {
						return answer;
					}
				});

				return { ...quizItem, answers: newAnswers };
			});
		});
	};

	const handleClick = () => {
		const allQuestionsAnswered = quizData.every((quizItem) => {
			// Checks if there is an answer selected
			return quizItem.answers.some((answer) => answer.isSelected);
		});

		if (allQuestionsAnswered && !playingAgain) {
			setCheckedResults(true);

			quizData.forEach((quizItem) => {
				quizItem.answers.forEach((answer) => {
					if (answer.isSelected && answer.answerText === quizItem.correct_answer) {
						setQuizScore((prevQuizScore) => prevQuizScore + 1);
					}
				});
			});
		}

		if (checkedResults) {
			setPlayingAgain(true);
			setCheckedResults(false);

			setTimeout(() => setPlayingAgain(false), 0);
		}
	};

	return (
		<div className="quiz">
			{quizData.map((quizItem) => {
				return (
					<QuizItem key={quizItem.id}>
						<QuizQuestion question={quizItem.question} />

						<div className="quiz__answers flex">
							{quizItem.answers.map((answer) => {
								return (
									<QuizAnswer
										key={answer.id}
										answer={answer}
										correctAnswer={quizItem.correct_answer}
										checkedResults={checkedResults}
										selectAnswer={() => selectAnswer(quizItem.id, answer.id)}
									/>
								);
							})}
						</div>
					</QuizItem>
				);
			})}

			<img src={blobTopRight} alt="A circular blob" className="blob blob--top-right" />
			<img src={blobBottomLeft} alt="A circular blob" className="blob blob--bottom-left" />

			<div className="results flex">
				{checkedResults && (
					<p className="results-text">{`You scored ${quizScore}/5 correct answers`}</p>
				)}
				<button className="btn btn--quiz" onClick={handleClick}>
					{checkedResults ? "Play again" : "Check answers"}
				</button>
			</div>
		</div>
	);
}

export default Quiz;
