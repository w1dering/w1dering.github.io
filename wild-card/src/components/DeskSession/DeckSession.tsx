import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Flashcard from "../Flashcard/Flashcard";
import "./DeckSession.css"

interface FlashcardData {
	question: string,
	answer: string,
	rating: number;
}

interface Props {
	getDeckData: (id: string) => FlashcardData[] | null;
}

const DeckSession = ({ getDeckData }: Props) => {

	const { deckId } = useParams();
	let deckData: FlashcardData[] | null = getDeckData(deckId!);

	if (!deckData) {
		return <h1>Deck is null</h1>;
	} else if (deckData.length === 0) {
		return <h1>Deck is empty</h1>;
	}

	

	const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
	const [currentFlashcardShowAnswer, setCurrentFlashcardShowAnswer] =
		useState(false);
	const [currentFlashcardRating, setCurrentFlashcardRating] = useState(
		deckData[currentFlashcardIndex].rating
	);

	const updateFlashcardRating = (rating: number) => {
		deckData[currentFlashcardIndex].rating = rating;
		setCurrentFlashcardRating(rating);
	};

	// tracks key presses to prevent them from being pressed every frame
	let isSpacePressed = false;
	let isLeftPressed = false;
	let isRightPressed = false;

	const currentFlashcard = (
		<Flashcard
			question={deckData[currentFlashcardIndex].question}
			answer={deckData[currentFlashcardIndex].answer}
			rating={currentFlashcardRating}
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

	return (
		<div id="deck-session">
			{currentFlashcard}
		</div>
	); // add ratings and back button
};

export default DeckSession;
