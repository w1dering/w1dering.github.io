import Button from "../Button/Button";
import DeckListEntry from "../DeckListEntry/DeckListEntry";
import Header from "../Header/Header";

import "./DeckList.css";

interface Props {
	entries: {
		name: string;
		cards: number;
	}[];
	addDeck: () => void;
	deleteDeck: (name: string) => void;
	renameDeck: (name: string, newName: string) => string;
}

const DeckList = ({ entries, addDeck, deleteDeck, renameDeck }: Props) => {
	return (
		<div id="deck-list">
			<Header id="deck-list-header" content="Choose a deck to study" />
			{entries.map((deckListEntry) => (
				<DeckListEntry
					name={deckListEntry.name}
					cards={deckListEntry.cards}
					deleteDeck={deleteDeck}
					renameDeck={renameDeck}
				/>
			))}
			<Button content="Add deck" id="deck-list-add-button" fn={addDeck} />
		</div>
	);
};
export default DeckList;
