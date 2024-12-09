import { useParams } from "react-router-dom";

import DeckEditEntry from "../DeckEditEntry/DeckEditEntry";

import "./DeckEdit.css";

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

const DeckEdit = ({ getDeckData, updateData }: Props) => {
	const { deckId } = useParams();
	const deckData = getDeckData(deckId!);

	if (!deckData) {
		return <h1>Deck is null</h1>;
	} else if (deckData.deck.length === 0) {
		return <h1>Deck is empty</h1>;
	}

	const deck = deckData.deck;

	const updateCard = (cardIndex: number, toUpdate: string, newContent: string | number) => {
		updateData(deckData.name, cardIndex, toUpdate, newContent);
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
				/>
			))}
		</div>
	);
};

export default DeckEdit;
