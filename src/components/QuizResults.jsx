import { usePresets } from "@/context/PresetsContext";
import { motion } from "framer-motion";
import styles from "@/styles/QuizResults.module.css";

const containerVariants = {
	hidden: { opacity: 0, x: "50vh" },
	visible: {
		opacity: 1,
		x: 0,
		transition: { duration: 0.5, delayChildren: 0.25 },
	},
	exit: { opacity: 0, x: "-50vh" },
};

// Animation variants for motion.div with className styles.results
const resultsVariants = {
	hidden: { opacity: 0, x: 100 },
	visible: {
		opacity: 1,
		x: 0,
		transition: { duration: 0.4, staggerChildren: 0.15, delayChildren: 0.25 },
	},
	exit: { opacity: 0, x: -100 },
};

const childVariants = {
	hidden: { opacity: 0, x: 100 },
	visible: { opacity: 1, x: 0 },
	exit: { opacity: 0, x: -100 },
};

function QuizResults({ correct, incorrect, playAgain }) {
	const {
		presets: { questionCount },
	} = usePresets();

	return (
		<motion.div
			className={styles.resultsContainer}
			variants={containerVariants}
		>
			<h2>Your results are in, check out how you scored below</h2>

			<motion.div className={styles.results} variants={resultsVariants}>
				<motion.div variants={childVariants}>
					You got {correct} answers correct
				</motion.div>
				<motion.div variants={childVariants}>
					You got {incorrect} answers incorrect
				</motion.div>
				<motion.div variants={childVariants}>
					Your final score for this quiz is {correct + "/" + questionCount}
				</motion.div>

				<motion.button
					className="btn"
					onClick={playAgain}
					variants={childVariants}
				>
					Play Again
				</motion.button>
			</motion.div>
		</motion.div>
	);
}

export default QuizResults;
