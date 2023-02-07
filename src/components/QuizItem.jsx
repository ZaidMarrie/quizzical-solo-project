import QuizQuestion from "./QuizQuestion";
import { useState, useEffect } from "react";
import { usePresets } from "@/context/PresetsContext";
import { formatQuizItems, API_URL } from "@/utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "@/styles/QuizItem.module.css";
import QuizAnswer from "./QuizAnswer";

function QuizItem({
	quizItem,
	handleSelect,
	questionIndex,
	goToNextQuestion,
	setQuizStats,
}) {
	const { answers, correct_answer } = quizItem;

	// Make sure the question is answered before next question, and update stats
	const handleClick = () => {
		const questionAnswered = answers.some((answer) => answer.isSelected);

		if (!questionAnswered) {
			toast.error("Please select an answer", {
				autoClose: 2000,
				theme: "dark",
			});

			return;
		}

		updateStats(answers, correct_answer);
		goToNextQuestion();
	};

	// Update the statistics before next question
	const updateStats = (answers, correctAnswer) => {
		answers.forEach((answer) => {
			// Check if the selected answer is correct
			if (answer.isSelected && answer.answerText === correctAnswer) {
				setQuizStats((prevQuizStats) => ({
					...prevQuizStats,
					remaining: questionIndex + 1,
					correct: prevQuizStats.correct + 1,
					timer: "00:30",
				}));
			}

			// Increment if the selected answer is incorrect
			if (answer.isSelected && answer.answerText !== correctAnswer) {
				setQuizStats((prevQuizStats) => ({
					...prevQuizStats,
					remaining: questionIndex + 1,
					incorrect: prevQuizStats.incorrect + 1,
					timer: "00:30",
				}));
			}
		});
	};

	return (
		<div className={styles.quizItem}>
			<QuizQuestion question={quizItem.question} />

			<ToastContainer limit={3} />

			<div className={styles.quizAnswers}>
				{answers.map((answer) => (
					<QuizAnswer
						key={answer.id}
						answer={answer}
						handleSelect={handleSelect}
					/>
				))}
			</div>

			<button className="btn" onClick={handleClick}>
				Next Question
			</button>
		</div>
	);
}

export default QuizItem;
