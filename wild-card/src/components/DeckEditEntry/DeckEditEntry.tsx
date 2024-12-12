import { useEffect, useState } from "react";
import Button from "../Button/Button";
import "./DeckEditEntry.css";
import getColourFromRating from "../../utils/colourFromRating";

interface EditRatingPopupProps {
	show: boolean;
	updateRating: (rating: number) => void;
}

const EditRatingPopup = ({ show, updateRating }: EditRatingPopupProps) => {
	return (
		<div
			id="edit-rating-popup"
			style={{ visibility: show ? "visible" : "hidden" }}
		>
			<Button
				content="1"
				fn={() => updateRating(1)}
				className="edit-rating-popup-button rate-button-1"
			/>
			<Button
				content="2"
				fn={() => updateRating(2)}
				className="edit-rating-popup-button rate-button-2"
			/>
			<Button
				content="3"
				fn={() => updateRating(3)}
				className="edit-rating-popup-button rate-button-3"
			/>
			<Button
				content="4"
				fn={() => updateRating(4)}
				className="edit-rating-popup-button rate-button-4"
			/>
			<Button
				content="5"
				fn={() => updateRating(5)}
				className="edit-rating-popup-button rate-button-5"
			/>
		</div>
	);
};

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
	deleteCard: (cardIndex: number) => void;
}

const DeckEditEntry = ({
	question,
	answer,
	rating,
	index,
	updateCard,
	deleteCard,
}: Props) => {
	const [showEditRatingPopup, setShowEditRatingPopup] = useState(false);
	const updateRating = (rating: number) => {
		updateCard(index, "rating", rating);
	};

	return (
		<div className="deck-edit-entry">
			<div
				id="edit-rating-div"
				onClick={() =>
					setShowEditRatingPopup(
						(prevShowEditRatingPopup) => !prevShowEditRatingPopup
					)
				}
			>
				<EditRatingPopup
					show={showEditRatingPopup}
					updateRating={updateRating}
				/>
				<div
					id="edit-rating-text"
					style={{ backgroundColor: `${getColourFromRating(rating)}` }}
				>
					{rating}
				</div>
			</div>
			<textarea
				value={question}
				className="deck-edit-entry-text-area"
				onChange={(e) => {
					updateCard(index, "question", e.target.value);
					return e.target.value;
				}}
			/>
			<textarea
				value={answer}
				className="deck-edit-entry-text-area"
				onChange={(e) => {
					updateCard(index, "answer", e.target.value);
					return e.target.value;
				}}
			/>

			<Button content="Delete card" fn={() => deleteCard(index)}></Button>
		</div>
	);
};

export default DeckEditEntry;
