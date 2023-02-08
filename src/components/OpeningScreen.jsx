import { useState } from "react";
import { motion } from "framer-motion";
import { usePresets } from "@/context/PresetsContext";
import styles from "@/styles/OpeningScreen.module.css";

const screenVariants = {
	hidden: { opacity: 0, x: "100vh" },
	visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
	exit: { opacity: 0, x: "100vh" },
};

function OpeningScreen({ startGame }) {
	const { presets, updatePresets } = usePresets();
	const [formData, setFormData] = useState(presets);

	const handleSubmit = (e) => {
		e.preventDefault();

		updatePresets(formData);
		startGame();
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormData((prevPresets) => ({ ...prevPresets, [name]: value }));
	};

	return (
		<motion.div
			className={styles.screen}
			key="OpeningScreen"
			initial="hidden"
			animate="visible"
			exit="exit"
			variants={screenVariants}
		>
			<p>
				Welcome to my trivia quiz app. This is a multiple choice based game that
				tests your knowledge on various categories by pulling in questions from
				the Open Trivia DB API. You are given a number of questions to answer
				within the allocated time frame of 30 seconds. Try your best to get as
				much questions correct by answering each question as accurately as
				possible.
			</p>

			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.form__group}>
					<label htmlFor="questionCount" className={styles.form__label}>
						Number of questions
					</label>

					<input
						type="number"
						name="questionCount"
						id="questionCount"
						min="5"
						max="30"
						className={styles.form__input}
						value={formData.questionCount}
						onChange={handleChange}
					/>
				</div>

				<div className={styles.form__group}>
					<label htmlFor="difficulty" className={styles.form__label}>
						Select Difficulty
					</label>

					<select
						name="difficulty"
						id="difficulty"
						className={styles.form__input}
						value={formData.difficulty}
						onChange={handleChange}
					>
						<option value="any">Any Difficulty</option>
						<option value="easy">Easy</option>
						<option value="medium">Medium</option>
						<option value="hard">Hard</option>
					</select>
				</div>

				<div className={styles.form__group}>
					<label htmlFor="category" className={styles.form__label}>
						Select a category
					</label>

					<select
						name="category"
						id="category"
						className={styles.form__input}
						value={formData.category}
						onChange={handleChange}
					>
						<option value="any">Any Category</option>
						<option value="9">General Knowledge</option>
						<option value="10">Entertainment: Books</option>
						<option value="11">Entertainment: Film</option>
						<option value="12">Entertainment: Music</option>
						<option value="13">Entertainment: Musical & Theatres</option>
						<option value="14">Entertainment: Television</option>
						<option value="15">Entertainment: Video Games</option>
						<option value="16">Entertainment: Board Games</option>
						<option value="17">Science & Nature</option>
						<option value="18">Science: Computers</option>
						<option value="19">Science: Mathematics</option>
						<option value="20">Mythology</option>
						<option value="21">Sports</option>
						<option value="22">Geography</option>
						<option value="23">History</option>
						<option value="24">Politics</option>
						<option value="25">Art</option>
						<option value="26">Celebrities</option>
						<option value="27">Animals</option>
						<option value="28">Vehicles</option>
						<option value="29">Entertainment: Comics</option>
						<option value="30">Science: Gadgets</option>
						<option value="31">Entertainment: Japanese Anime & Manga</option>
						<option value="32">Entertainment: Cartoon & Animations</option>
					</select>
				</div>

				<button type="submit" className="btn">
					Start Quiz
				</button>
			</form>
		</motion.div>
	);
}

export default OpeningScreen;
