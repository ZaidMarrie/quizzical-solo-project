import useInterval from "@/hooks/useInterval";
import { useState, useEffect } from "react";
import { TIME_PER_QUESTION } from "@/config";
import styles from "@/styles/StatisticsBar.module.css";

function StatisticsBar({
	remaining,
	correct,
	incorrect,
	nextQuestion,
	questionIndex,
}) {
	const [timer, setTimer] = useState(TIME_PER_QUESTION);

	// Run the countdown timer
	useInterval(() => {
		if (timer <= 0) {
			nextQuestion();
			return;
		}

		setTimer((prevTimer) => prevTimer - 1);
	});

	// Resets the timer when the question changes
	useEffect(() => {
		setTimer(TIME_PER_QUESTION);
	}, [questionIndex]);

	return (
		<div className={styles.stats}>
			<div className={styles.stats__column}>
				<span>Questions Remaining</span>
				<span>{remaining}</span>
			</div>
			<div className={styles.stats__column}>
				<span>Correct</span>
				<span>{correct}</span>
			</div>
			<div className={styles.stats__column}>
				<span>Incorrect</span>
				<span>{incorrect}</span>
			</div>
			<div className={styles.stats__column}>
				<span>Timer</span>
				<span>{`00:${timer.toString().padStart(2, "0")}`}</span>
			</div>
		</div>
	);
}

export default StatisticsBar;
