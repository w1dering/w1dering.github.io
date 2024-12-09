import "./DeckEditEntry.css";

interface Props {
	question: string;
	answer: string;
	rating: number;
    index: number;
	updateCard: (
		cardIndex: number,
		toUpdate: string,
		newContent: string | number
	) => void;
}

const DeckEditEntry = ({ question, answer, rating, index, updateCard }: Props) => {
	return (
		<div className="deck-edit-entry">
			<input
				value={question}
				className="deck-edit-entry-input-box"
				type="text"
				onChange={(e) => {
					updateCard(index, "question", e.target.value);
					return e.target.value;
				}}
			></input>
			<input
				value={answer}
				className="deck-edit-entry-input-box"
				type="text"
				onChange={(e) => {
					updateCard(index, "answer", e.target.value);
					return e.target.value;
				}}
			></input>
			<div>rating: {rating}</div>
		</div>
	);
};

export default DeckEditEntry;
