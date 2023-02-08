import PresetsProvider from "./context/PresetsContext";
import Layout from "@/components/Layout";
import OpeningScreen from "./components/OpeningScreen";
import Quiz from "./components/Quiz";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

function App() {
	const [gameStarted, setGameStarted] = useState(false);

	const startGame = () => {
		setGameStarted(true);
	};

	return (
		<PresetsProvider>
			<Layout>
				<AnimatePresence mode="wait" initial={false}>
					{gameStarted ? <Quiz /> : <OpeningScreen startGame={startGame} />}
				</AnimatePresence>
			</Layout>
		</PresetsProvider>
	);
}

export default App;
