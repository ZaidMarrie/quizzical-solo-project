import PresetsProvider from "./context/PresetsContext";
import Layout from "@/components/Layout";
import OpeningScreen from "./components/OpeningScreen";
import Quiz from "./components/Quiz";
import { useState } from "react";

function App() {
	const [gameStarted, setGameStarted] = useState(false);

	const startGame = () => {
		setGameStarted(true);
	};

	return (
		<PresetsProvider>
			<Layout>
				{gameStarted ? <Quiz /> : <OpeningScreen startGame={startGame} />}
			</Layout>
		</PresetsProvider>
	);
}

export default App;
