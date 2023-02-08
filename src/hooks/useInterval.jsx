import { useEffect, useRef } from "react";

// This custom hook is from Dan Abramov blog post
// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback) {
	const savedCallback = useRef();

	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	useEffect(() => {
		function countdown() {
			savedCallback.current();
		}

		let id = setInterval(countdown, 1000);
		return () => clearInterval(id);
	}, []);
}

export default useInterval;
