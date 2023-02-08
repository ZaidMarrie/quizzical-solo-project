import QuizQuestion from "./QuizQuestion";
import QuizAnswer from "./QuizAnswer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "@/styles/QuizItem.module.css";

function QuizItem({ quizItem, handleSelect, nextQuestion, setStats }) {
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
		nextQuestion();
	};

	// Update the statistics before next question
	const updateStats = (answers, correctAnswer) => {
		answers.forEach((answer) => {
			// Check if the selected answer is correct
			if (answer.isSelected && answer.answerText === correctAnswer) {
				setStats((prevStats) => ({
					...prevStats,
					correct: prevStats.correct + 1,
				}));
			}

			// Check if the selected answer is incorrect
			if (answer.isSelected && answer.answerText !== correctAnswer) {
				setStats((prevStats) => ({
					...prevStats,
					incorrect: prevStats.incorrect + 1,
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
