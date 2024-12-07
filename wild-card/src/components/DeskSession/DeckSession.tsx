import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Flashcard from "../Flashcard/Flashcard";

import "./DeckSession.css";

interface FlashcardData {
	question: string;
	answer: string;
	rating: number;
}

interface Props {
	getDeckData: (id: string) => FlashcardData[] | null;
}

const DeckSession = ({ getDeckData }: Props) => {
	const { deckId } = useParams();
	const [deckData, setDeckData] = useState(getDeckData(deckId!));

	if (!deckData) {
		return <h1>Deck is null</h1>;
	} else if (deckData.length === 0) {
		return <h1>Deck is empty</h1>;
	}

	const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
	const [currentFlashcardShowAnswer, setCurrentFlashcardShowAnswer] =
		useState(false);
	const updateFlashcardRating = (rating: number) => {
		const updatedDeck = [...deckData];
		updatedDeck[currentFlashcardIndex] = {
			...updatedDeck[currentFlashcardIndex],
			rating,
		};

		setDeckData(updatedDeck);
	};

	// tracks key presses to prevent them from being pressed every frame
	let isSpacePressed = false;
	let isLeftPressed = false;
	let isRightPressed = false;
	let is1Pressed = false;
	let is2Pressed = false;
	let is3Pressed = false;
	let is4Pressed = false;
	let is5Pressed = false;

	const currentFlashcard = (
		<Flashcard
			question={deckData[currentFlashcardIndex].question}
			answer={deckData[currentFlashcardIndex].answer}
			rating={deckData[currentFlashcardIndex].rating}
			showAnswer={currentFlashcardShowAnswer}
			updateCardRating={updateFlashcardRating}
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
							Math.min(prevFlashcardIndex + 1, deckData.length - 1)
						);
						setCurrentFlashcardShowAnswer(false);
					}
					isRightPressed = true;
					break;
				case "Digit1":
					if (!is1Pressed) {
						updateFlashcardRating(1);
					}
					is1Pressed = true;
					break;
				case "Digit2":
					if (!is2Pressed) {
						updateFlashcardRating(2);
					}
					is2Pressed = true;
					break;
				case "Digit3":
					if (!is3Pressed) {
						updateFlashcardRating(3);
					}
					is3Pressed = true;
					break;
				case "Digit4":
					if (!is4Pressed) {
						updateFlashcardRating(4);
					}
					is4Pressed = true;
					break;
				case "Digit5":
					if (!is5Pressed) {
						updateFlashcardRating(5);
						console.log("5 pressed");
					}
					is5Pressed = true;
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
				case "Digit1":
					is1Pressed = false;
					break;
				case "Digit2":
					is2Pressed = false;
					break;
				case "Digit3":
					is3Pressed = false;
					break;
				case "Digit4":
					is4Pressed = false;
					break;
				case "Digit5":
					is5Pressed = false;
					break;
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("keyup", handleKeyUp);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("keyup", handleKeyUp);
		};
	}, [currentFlashcardIndex]);

	return <div id="deck-session">{currentFlashcard}</div>; // add ratings and back button
};

export default DeckSession;
