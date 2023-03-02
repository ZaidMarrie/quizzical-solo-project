import QuizItem from "./QuizItem";
import StatisticsBar from "./StatisticsBar";
import QuizResults from "./QuizResults";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { API_URL } from "@/config";
import { usePresets } from "@/context/PresetsContext";
import { formatQuizItems } from "@/utils";

const variants = {
	hidden: { opacity: 0, x: "100vh" },
	visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
	exit: { opacity: 0, x: "-100vh" },
};

function Quiz({ restartGame }) {
	const { presets } = usePresets();

	const [quizData, setQuizData] = useState([]);
	const [questionIndex, setQuestionIndex] = useState(0);
	const [quizStats, setQuizStats] = useState({
		remaining: 0,
		correct: 0,
		incorrect: 0,
	});

	const [quizCompleted, setQuizCompleted] = useState(false);

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
				});
				setQuizCompleted(false);
			} catch (err) {
				console.log(err);
			}
		};

		getQuizData(presets);
	}, []);

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
	const nextQuestion = () => {
		const quizQuestionsCount = presets.questionCount - 1;

		if (questionIndex < quizQuestionsCount) {
			setQuizStats((prevStats) => ({
				...prevStats,
				remaining: prevStats.remaining - 1,
			}));
			setQuestionIndex((prevIndex) => prevIndex + 1);
			return;
		}

		setQuizCompleted(true);
	};

	return (
		<motion.div
			key="quiz"
			initial="hidden"
			animate="visible"
			exit="exit"
			variants={variants}
		>
			{!quizCompleted && (
				<StatisticsBar
					remaining={quizStats.remaining}
					correct={quizStats.correct}
					incorrect={quizStats.incorrect}
					questionIndex={questionIndex}
					nextQuestion={nextQuestion}
				/>
			)}

			{quizData.length > 0 && !quizCompleted ? (
				<QuizItem
					key={quizData[questionIndex].id}
					quizItem={quizData[questionIndex]}
					handleSelect={selectAnswer}
					questionIndex={questionIndex}
					nextQuestion={nextQuestion}
					setStats={setQuizStats}
				/>
			) : null}

			{quizCompleted && (
				<QuizResults
					correct={quizStats.correct}
					incorrect={quizStats.incorrect}
					restartGame={restartGame}
				/>
			)}
		</motion.div>
	);
}

export default Quiz;
