import styles from "@/styles/QuizQuestion.module.css";

function QuizQuestion({ question }) {
	return (
		<h2
			className={styles.question}
			dangerouslySetInnerHTML={{ __html: question }}
		></h2>
	);
}

export default QuizQuestion;
