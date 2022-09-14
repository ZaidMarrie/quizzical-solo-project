import { useState, useEffect } from "react";

import OpeningScreen from "./components/OpeningScreen";
import Quiz from "./components/Quiz";

function App() {
	return (
		<main className="container center">
			<OpeningScreen />
			<Quiz />
		</main>
	);
}

export default App;
