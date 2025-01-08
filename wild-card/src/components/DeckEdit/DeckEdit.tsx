import { useParams } from "react-router-dom";

import DeckEditEntry from "../DeckEditEntry/DeckEditEntry";

import "./DeckEdit.css";
import Button from "../Button/Button";
import Header from "../Header/Header";
import { useRef } from "react";

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
	addFlashcard: (deckName: string) => void;
	deleteFlashcard: (deckName: string, cardIndex: number) => void;
}

const DeckEdit = ({
	getDeckData,
	updateData,
	addFlashcard,
	deleteFlashcard,
}: Props) => {
	const { deckId } = useParams();
	const deckData = getDeckData(deckId!);
	const containerRef = useRef<HTMLDivElement>(null);

	if (!deckData) {
		return <h1>Deck is null</h1>;
	}

	const deck = deckData.deck;

	const updateCard = (
		cardIndex: number,
		toUpdate: string,
		newContent: string | number
	) => {
		updateData(deckData.name, cardIndex, toUpdate, newContent);
	};

	const deleteCard = (cardIndex: number) => {
		deleteFlashcard(deckData.name, cardIndex);
	};

	const addCard = () => {
		addFlashcard(deckData.name);
		if (containerRef.current) {
			containerRef.current.scrollTop = containerRef.current.scrollHeight;
		}
	};

	document.title = `Wild Card - Editing ${deckData.name}`;

	return (
		<div id="deck-edit" ref={containerRef}>
			<Header id="deck-edit-header" content={`Editing ${deckId}`} />
			{deck.map((flashcard, index) => (
				<DeckEditEntry
					question={flashcard.question}
					answer={flashcard.answer}
					rating={flashcard.rating}
					updateCard={updateCard}
					index={index}
					deleteCard={deleteCard}
				/>
			))}
			<Button
				content="Add Flashcard"
				fn={addCard}
				id="deck-edit-add-flashcard-button"
			/>
		</div>
	);
};

export default DeckEdit;
