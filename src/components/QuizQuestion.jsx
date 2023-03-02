import { motion } from "framer-motion";
import styles from "@/styles/QuizQuestion.module.css";

const titleVariants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
};

function QuizQuestion({ question }) {
	return (
		<motion.h2
			variants={titleVariants}
			className={styles.question}
			dangerouslySetInnerHTML={{ __html: question }}
		></motion.h2>
	);
}

export default QuizQuestion;
