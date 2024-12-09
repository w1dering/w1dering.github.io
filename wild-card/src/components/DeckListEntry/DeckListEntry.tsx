import { useNavigate } from "react-router-dom";

import Button from "../Button/Button";

import "./DeckListEntry.css";

interface Props {
	name: string;
	cards: number;
}

const DeckListEntry = ({ name, cards }: Props) => {
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
			<div>
				{cards} {"card"}
				{cards !== 1 && "s"}
			</div>
			<Button
				text="edit"
				fn={(e: React.MouseEvent<HTMLButtonElement>) => {
					e.stopPropagation();
					editDeck();
				}}
			/>
		</div>
	);
};

export default DeckListEntry;
