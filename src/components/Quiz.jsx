import QuizItem from "./QuizItem";
import StatisticsBar from "./StatisticsBar";
import QuizResults from "./QuizResults";
import { useState, useEffect } from "react";
import { usePresets } from "@/context/PresetsContext";
import { API_URL, formatQuizItems } from "@/utils";

function Quiz() {
	const { presets } = usePresets();

	const [quizData, setQuizData] = useState([]);
	const [questionIndex, setQuestionIndex] = useState(0);
	const [quizStats, setQuizStats] = useState({
		remaining: 0,
		correct: 0,
		incorrect: 0,
		timer: "00:30",
	});

	const [quizCompleted, setQuizCompleted] = useState(false);
	const [playingAgain, setPlayingAgain] = useState(false);

	useEffect(() => {
		const getQuizData = async (presets) => {
			const category =
				presets.category !== "any" ? `&category=${presets.category}` : "";
			const difficulty =
				presets.difficulty !== "any" ? `&difficulty=${presets.difficulty}` : "";

			const url = `${API_URL}&amount=${
				presets.questionCount + category + difficulty
			}`;

			try {
				const res = await fetch(url);
				const data = await res.json();
				const quizData = formatQuizItems(data.results);

				setQuizData(quizData);
				setQuestionIndex(0);
				setQuizStats({
					remaining: quizData.length,
					correct: 0,
					incorrect: 0,
					timer: "00:30",
				});
				setQuizCompleted(false);
			} catch (err) {
				console.log(err);
			}
		};

		getQuizData(presets);
	}, [playingAgain]);

	// Selects and highlights an answer
	const selectAnswer = (answerId) => {
		setQuizData((prevQuizData) =>
			prevQuizData.map((quizItem, idx) => {
				if (idx !== questionIndex) return quizItem;

				/* Maps over answers Array and switch the `isSelected` property
				 * on the selected answer, changing the rest of the answers of that
				 * question's `isSelected` property to `false`
				 */
				const newAnswers = quizItem.answers.map((answer) => {
					if (answer.id === answerId) {
						return { ...answer, isSelected: !answer.isSelected };
					} else {
						return { ...answer, isSelected: false };
					}
				});

				return { ...quizItem, answers: newAnswers };
			})
		);
	};

	// Increments the `questionIndex`, going to next question
	const goToNextQuestion = () => {
		const quizQuestionsCount = presets.questionCount - 1;

		if (questionIndex < quizQuestionsCount) {
			setQuestionIndex((prevIndex) => prevIndex + 1);
			return;
		}

		setQuizCompleted(true);
	};

	const playAgain = () => {
		setPlayingAgain(true);

		const timerId = setTimeout(() => {
			setPlayingAgain(false);
		}, 0);
	};

	return (
		<div>
			{!quizCompleted && <StatisticsBar />}
			{/* <StatisticsBar remaining={quizStats.remaining} correct={quizStats.correct} incorrect={quizStats.incorrect} timer={quizStats.timer} /> */}

			{quizData.length > 0 && !quizCompleted ? (
				<QuizItem
					key={quizData[questionIndex].id}
					quizItem={quizData[questionIndex]}
					handleSelect={selectAnswer}
					questionIndex={questionIndex}
					goToNextQuestion={goToNextQuestion}
					setQuizStats={setQuizStats}
				/>
			) : null}

			{quizCompleted && (
				<QuizResults
					answersCorrect={quizStats.correct}
					answersIncorrect={quizStats.incorrect}
					playAgain={playAgain}
				/>
			)}
		</div>
	);
}

export default Quiz;
