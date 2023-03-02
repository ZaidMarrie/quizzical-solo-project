import QuizQuestion from "./QuizQuestion";
import QuizAnswer from "./QuizAnswer";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import styles from "@/styles/QuizItem.module.css";

const itemVariants = {
	hidden: { opacity: 0, x: "50vh" },
	visible: {
		opacity: 1,
		x: 0,
		transition: { duration: 0.4, staggerChildren: 0.15, delayChildren: 0.25 },
	},
};

const buttonVariants = {
	hidden: { opacity: 0, x: 100 },
	visible: { opacity: 1, x: 0 },
};

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
		<motion.div className={styles.quizItem} variants={itemVariants}>
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

			<motion.button
				className="btn"
				onClick={handleClick}
				variants={buttonVariants}
			>
				Next Question
			</motion.button>
		</motion.div>
	);
}

export default QuizItem;
