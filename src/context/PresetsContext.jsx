import React, { useState, useContext } from "react";

const presetsContext = React.createContext();

export const usePresets = () => useContext(presetsContext);

function PresetsProvider({ children }) {
	const [presets, setPresets] = useState({
		questionCount: 5,
		category: "any",
		difficulty: "any",
	});

	const updatePresets = (newPresets) => {
		setPresets(newPresets);
	};

	return (
		<presetsContext.Provider value={{ presets, updatePresets }}>
			{children}
		</presetsContext.Provider>
	);
}

export default PresetsProvider;
