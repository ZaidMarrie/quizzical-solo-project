import styles from "@/styles/StatisticsBar.module.css";

function StatisticsBar() {
	return (
		<div className={styles.stats}>
			<div className={styles.stats__column}>
				<span>Questions Remaining</span>
				<span>8/12</span>
			</div>
			<div className={styles.stats__column}>
				<span>Correct</span>
				<span>0</span>
			</div>
			<div className={styles.stats__column}>
				<span>Incorrect</span>
				<span>0</span>
			</div>
			<div className={styles.stats__column}>
				<span>Timer</span>
				<span>00:30</span>
			</div>
		</div>
	);
}

export default StatisticsBar;
