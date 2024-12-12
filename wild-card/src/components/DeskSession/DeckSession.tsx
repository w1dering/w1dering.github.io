import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Flashcard from "../Flashcard/Flashcard";

import "./DeckSession.css";
import DummyFlashcard from "../DummyFlashcard/DummyFlashcard";

interface DeckData {
	name: string;
	deck: {
		question: string;
		answer: string;
		rating: number;
	}[];
}

interface Props {
	getDeckData: (id: string) => DeckData | undefined;
	updateData: (
		deckName: string,
		cardIndex: number,
		toUpdate: string,
		newContent: string | number
	) => void;
}

const DeckSession = ({ getDeckData, updateData }: Props) => {
	const { deckId } = useParams();
	const deckData = getDeckData(deckId!);

	if (!deckData) {
		return <h1>Deck is null</h1>;
	} else if (deckData.deck.length === 0) {
		return <h1>Deck is empty</h1>;
	}
	const deck = deckData?.deck;

	const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
	const [dummyFlashcardIndex, setDummyFlashcardIndex] = useState(0);
	const [currentFlashcardShowAnswer, setCurrentFlashcardShowAnswer] =
		useState(false);
	const [playingPopOffAnimation, setPlayingPopoffAnimation] = useState(false);
	let currentFlashcard: React.ReactElement = <></>;
	let dummyFlashcard: React.ReactElement = <></>;

	// called whenever a rate-button is pressed: moves to the next card
	const goNextCard = (rating: number) => {
		setDummyFlashcardIndex(currentFlashcardIndex);
		
		updateData(deckData.name, currentFlashcardIndex, "rating", rating);
		setPlayingPopoffAnimation(true);

		setCurrentFlashcardIndex(() => chooseNextCard());
		setCurrentFlashcardShowAnswer(false);

		const styles: CSSStyleDeclaration = getComputedStyle(document.getElementById("flashcard-question-answer")!);
		const dummy: HTMLElement | null = document.getElementById("flashcard-dummy");
		if (!dummy) {
			console.log("dummy not found");
			return;
		}
		for (const property of styles) {
			dummy.style.setProperty(
				property,
				styles.getPropertyValue(property)
			);
		}
		dummy.style.position = "absolute";
		dummy.style.zIndex = "1";
		dummy.style.animationDuration = "0.7s";
		dummy.style.animationName = "popOut";
		dummy.style.animationFillMode = "forwards"; // flashcard will maintain its end-of-animation state

		let timer = setTimeout(() => {
			dummy.style.visibility = "hidden";
			setPlayingPopoffAnimation(false);
			clearTimeout(timer);
		}, 700);
	};

	let cardsStudiedThisSession = 0;
	let averageRating = deck.reduce((acc, cur) => acc + cur.rating, 0);

	// lastInstancesOfCard[i] is the last time the card at index i was called
	// this value is compared to cardsStudiedThisSession
	const lastInstancesOfCard = Array(deck.length).fill(0);

	// returns the index of the card that should be given next, given the rating and last instances of the deck
	const chooseNextCard = () => {
		cardsStudiedThisSession++;
		if (deck.length == 1) {
			return 0;
		}
		/* algorithm for picking card:
		average rating of cards is calculated, and for each card, the deviation from the average rating is picked
		each card then receives "weight":
		- each card receives a base of 100 / (deck size) weight
		- each card gains: 
		  - 1 weight for each 0.1 rating below the average it is
		  - -1 weight for each 0.1 rating above the average it is
		  - -inf weight if it's 1.5 rating above the average
		the weights are then adjusted based on how long it's been since the card last appeared
		- 1 (cards before): 0*
		- 2: 0.1*
		- 3: 0.4*
		- 4: 0.7*;
		- 5: 1*
		each one after 5 increases weight multiplier by 0.1
		*/
		let totalWeight = 0;
		lastInstancesOfCard[currentFlashcardIndex] = cardsStudiedThisSession;
		const cardWeights = deck.map((card, index) => {
			if (
				card.rating > averageRating + 1.5 ||
				index === currentFlashcardIndex
			) {
				return 0;
			}
			let weight = 100.0 / deck.length;
			weight += (averageRating - card.rating) * 0.1;
			let multiplier;
			switch (cardsStudiedThisSession - lastInstancesOfCard[index]) {
				case 2:
					multiplier = 0.1;
					break;
				case 3:
					multiplier = 0.4;
					break;
				case 4:
					multiplier = 0.7;
					break;
				default:
					multiplier =
						1.0 +
						0.1 * (cardsStudiedThisSession - lastInstancesOfCard[index]);
					break;
			}
			weight *= multiplier;
			totalWeight += weight;
			return weight;
		});

		// randomly determine a card based on weights
		let rand = Math.random() * totalWeight;
		for (let i = 0; i < cardWeights.length; i++) {
			rand -= cardWeights[i];
			if (rand <= 0) {
				return i;
			}
		}

		console.log("decksession: rand did not select an index");
		return 0;
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

	currentFlashcard = (
		<Flashcard
			question={deck[currentFlashcardIndex].question}
			answer={deck[currentFlashcardIndex].answer}
			rating={deck[currentFlashcardIndex].rating}
			showAnswer={currentFlashcardShowAnswer}
			showAnswerCard={!playingPopOffAnimation}
			updateCardRating={goNextCard}
		/>
	);

	dummyFlashcard = (
		<DummyFlashcard
			question={deck[dummyFlashcardIndex].question}
			answer={deck[dummyFlashcardIndex].answer}
			rating={deck[dummyFlashcardIndex].rating}
			show={playingPopOffAnimation}
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
						setCurrentFlashcardIndex((prevFlashcardIndex) => {
							if (prevFlashcardIndex != 0) {
								setCurrentFlashcardShowAnswer(false);
								return prevFlashcardIndex - 1;
							}
							return prevFlashcardIndex;
						});
					}
					isLeftPressed = true;
					break;
				case "ArrowRight":
					if (!isRightPressed) {
						setCurrentFlashcardIndex((prevFlashcardIndex) => {
							if (prevFlashcardIndex != deck.length - 1) {
								setCurrentFlashcardShowAnswer(false);
								return prevFlashcardIndex + 1;
							}
							return prevFlashcardIndex;
						});
					}
					isRightPressed = true;
					break;
				case "Digit1":
					if (!is1Pressed && currentFlashcardShowAnswer) {
						goNextCard(1);
					}
					is1Pressed = true;
					break;
				case "Digit2":
					if (!is2Pressed && currentFlashcardShowAnswer) {
						goNextCard(2);
					}
					is2Pressed = true;
					break;
				case "Digit3":
					if (!is3Pressed && currentFlashcardShowAnswer) {
						goNextCard(3);
					}
					is3Pressed = true;
					break;
				case "Digit4":
					if (!is4Pressed && currentFlashcardShowAnswer) {
						goNextCard(4);
					}
					is4Pressed = true;
					break;
				case "Digit5":
					if (!is5Pressed && currentFlashcardShowAnswer) {
						goNextCard(5);
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
	}, [currentFlashcardIndex, currentFlashcardShowAnswer]);

	return <div id="deck-session">
		<div id="background-block"></div>
		{dummyFlashcard}
		{currentFlashcard}
	</div>;
};

export default DeckSession;
