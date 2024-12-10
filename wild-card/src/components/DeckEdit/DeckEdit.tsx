import { useParams } from "react-router-dom";

import DeckEditEntry from "../DeckEditEntry/DeckEditEntry";

import "./DeckEdit.css";
import Button from "../Button/Button";

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

const DeckEdit = ({ getDeckData, updateData, addFlashcard, deleteFlashcard}: Props) => {
	const { deckId } = useParams();
	const deckData = getDeckData(deckId!);

	if (!deckData) {
		return <h1>Deck is null</h1>;
	}

	const deck = deckData.deck;

	const updateCard = (cardIndex: number, toUpdate: string, newContent: string | number) => {
		updateData(deckData.name, cardIndex, toUpdate, newContent);
	}

	const deleteCard = (cardIndex: number) => {
		deleteFlashcard(deckData.name, cardIndex);
	}

	return (
		<div id="deck-edit">
			<div>Editing {deckId}</div>
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
			<Button content="Add Flashcard" fn={() => addFlashcard(deckData.name)} id="deck-edit-add-flashcard-button"/>
		</div>
	);
};

export default DeckEdit;
