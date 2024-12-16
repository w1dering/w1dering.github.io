import { useNavigate } from "react-router-dom";

import Button from "../Button/Button";

import "./DeckListEntry.css";
import { useEffect, useState } from "react";

interface Props {
	name: string;
	cards: number;
	deleteDeck: (name: string) => void;
	renameDeck: (name: string, newName: string) => string;
}

const DeckListEntry = ({ name, cards, deleteDeck, renameDeck }: Props) => {
	const [textAreaVal, setTextAreaVal] = useState(name);

	const navigate = useNavigate();

	const studyDeck = () => {
		navigate(`/deck/${name}`);
	};

	const editDeck = () => {
		navigate(`/edit/${name}`);
	};

	const handleTextKeyDown = (
		event: React.KeyboardEvent<HTMLTextAreaElement>
	) => {
		if (event.key === "Enter") {
			event.preventDefault();
			event.currentTarget.blur();
		}
	};

	const confirmRename = () => {
		const newName = renameDeck(name, textAreaVal);
		setTextAreaVal(newName);
	}

	return (
		<div onClick={studyDeck} className="deck-list-entry">
			<textarea
				value={textAreaVal}
				className="deck-list-entry-title"
				onClick={(e) => e.stopPropagation()}
				onChange={(e) => {
					setTextAreaVal(e.target.value);
				}}
				onKeyDown={handleTextKeyDown}
				onBlur={confirmRename}
			></textarea>
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
