import React, { useEffect, useRef, useState } from "react";
import Flashcard from "../Flashcard/Flashcard";

interface FlashcardData {
	question: string;
	answer: string;
}

interface Props {
	flashcardData: FlashcardData[];
}

const FlashcardStudying = ({ flashcardData }: Props) => {
	const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
	const [currentFlashcardShowAnswer, setCurrentFlashcardShowAnswer] =
		useState(false);

	// tracks key presses to prevent them from being pressed every frame
	let isSpacePressed = false;
	let isLeftPressed = false;
	let isRightPressed = false;

	const currentFlashcard = (
		<Flashcard
			question={flashcardData[currentFlashcardIndex].question}
			answer={flashcardData[currentFlashcardIndex].answer}
			showAnswer={currentFlashcardShowAnswer}
		/>
	);
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			switch (event.code) {
				case "Space":
					if (!isSpacePressed) {
						setCurrentFlashcardShowAnswer(
							(prevShowAnswer) => !prevShowAnswer
						);
					}
					isSpacePressed = true;
					break;
				case "ArrowLeft":
					if (!isLeftPressed) {
						setCurrentFlashcardIndex((prevFlashcardIndex) =>
							Math.max(prevFlashcardIndex - 1, 0)
						);
						setCurrentFlashcardShowAnswer(false);
					}
					isLeftPressed = true;
					break;
				case "ArrowRight":
					if (!isRightPressed) {
						setCurrentFlashcardIndex((prevFlashcardIndex) =>
							Math.min(prevFlashcardIndex + 1, flashcardData.length - 1)
						);
						setCurrentFlashcardShowAnswer(false);
					}
					isRightPressed = true;
					break;
				default:
					break;
			}
		};

		const handleKeyUp = (event: KeyboardEvent) => {
			switch (event.code) {
				case "Space":
					isSpacePressed = false;
					break;
				case "ArrowLeft":
					isLeftPressed = false;
					break;
				case "ArrowRight":
					isRightPressed = false;
					break;
				default:
					break;
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("keyup", handleKeyUp);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("keyup", handleKeyUp);
		};
	}, []);

	return <>{currentFlashcard}</>;
};

export default FlashcardStudying;
