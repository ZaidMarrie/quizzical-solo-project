import styles from "@/styles/QuizAnswer.module.css";

function QuizAnswer({ answer, handleSelect }) {
	return (
		<button
			className={`${styles.answer} ${
				answer.isSelected ? styles["answer--selected"] : ""
			}`}
			onClick={() => handleSelect(answer.id)}
			dangerouslySetInnerHTML={{ __html: answer.answerText }}
		></button>
	);
}

export default QuizAnswer;
