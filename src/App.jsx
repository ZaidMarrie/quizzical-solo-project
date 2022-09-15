import { useState } from "react";

import OpeningScreen from "./components/OpeningScreen";
import Quiz from "./components/Quiz";

function App() {
	const [gameStarted, setGameStarted] = useState(false);

	const startGame = () => {
		setGameStarted(true);
	};

	return (
		<main className="container center">
			{gameStarted ? <Quiz /> : <OpeningScreen startGame={startGame} />}
		</main>
	);
}

export default App;
