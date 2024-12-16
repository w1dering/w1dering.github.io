import { useNavigate } from "react-router-dom";

import Button from "../Button/Button";

import "./DeckListEntry.css";

interface Props {
	name: string;
	cards: number;
	deleteDeck: (name: string) => void;
}

const DeckListEntry = ({ name, cards, deleteDeck }: Props) => {
	const navigate = useNavigate();

	const studyDeck = () => {
		navigate(`/deck/${name}`);
	};

	const editDeck = () => {
		navigate(`/edit/${name}`);
	};


	return (
		<div onClick={studyDeck} className="deck-list-entry">
			<div>{name}</div>
			<div className="deck-list-entry-content">
				<div>
					{cards} {"card"}
					{cards !== 1 && "s"}
				</div>
				<Button
					content="edit"
					fn={(e: React.MouseEvent<HTMLButtonElement>) => {
						e.stopPropagation();
						editDeck();
					}}
				/>
				<Button
					content="delete"
					fn={(e: React.MouseEvent<HTMLButtonElement>) => {
						e.stopPropagation();
						deleteDeck(name);
					}}
				/>
			</div>
		</div>
	);
};

export default DeckListEntry;
