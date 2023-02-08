import { usePresets } from "@/context/PresetsContext";
import styles from "@/styles/QuizResults.module.css";

function QuizResults({ correct, incorrect, playAgain }) {
	const {
		presets: { questionCount },
	} = usePresets();

	return (
		<div className={styles.resultsContainer}>
			<h2>Your results are in, check out how you scored below</h2>

			<div className={styles.results}>
				<div>You got {correct} answers correct</div>
				<div>You got {incorrect} answers incorrect</div>
				<div>
					Your final score for this quiz is {correct + "/" + questionCount}
				</div>

				<button className="btn" onClick={playAgain}>
					Play Again
				</button>
			</div>
		</div>
	);
}

export default QuizResults;
