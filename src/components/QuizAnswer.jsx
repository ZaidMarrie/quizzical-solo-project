import { motion } from "framer-motion";
import styles from "@/styles/QuizAnswer.module.css";

// Animation variants for motion.button
const buttonVariants = {
	hidden: { opacity: 0, x: 100 },
	visible: { opacity: 1, x: 0 },
	exit: { opacity: 0, x: -100 },
};

function QuizAnswer({ answer, handleSelect }) {
	return (
		<motion.button
			variants={buttonVariants}
			className={`${styles.answer} ${
				answer.isSelected ? styles["answer--selected"] : ""
			}`}
			onClick={() => handleSelect(answer.id)}
			dangerouslySetInnerHTML={{ __html: answer.answerText }}
		></motion.button>
	);
}

export default QuizAnswer;
