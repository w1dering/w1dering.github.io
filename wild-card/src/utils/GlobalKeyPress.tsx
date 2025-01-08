import { useEffect } from "react";

const currentlyPressed = new Set();

export const useGlobalKeyPress = (
	key: string,
	keyDownCallback: () => void,
	keyUpCallback: () => void
) => {
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.code === key && !currentlyPressed.has(key)) {
				keyDownCallback();
				currentlyPressed.add(key);
			}
		};

		const handleKeyUp = (event: KeyboardEvent) => {
			if (event.code === key) {
				keyUpCallback();
				currentlyPressed.delete(key);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("keyup", handleKeyUp);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("keyup", handleKeyUp);
		};
	}, [key, keyDownCallback, keyUpCallback]);
};
