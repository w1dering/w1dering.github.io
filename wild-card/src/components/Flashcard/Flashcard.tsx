import { useEffect, useState } from "react";
import FlashcardQuestion from "../FlashcardQuestion/FlashcardQuestion";
import FlashcardAnswer from "../FlashcardAnswer/FlashcardAnswer";

import "./Flashcard.css";
import FlashcardRateBar from "../FlashcardRateBar/FlashcardRateBar";

interface Props {
	question: string;
	answer: string;
	rating: number;
	showAnswer: boolean;
	updateCardRating: (rating: number) => void;
}

function getColourFromRating(rating: number): string {
	switch (rating) {
		case 1: return "#6E6BA2";
		case 2: return "#8B93BF";
		case 3: return "#8096ED";
		case 4: return "#8DC2ED";
		case 5: return "#7AD2BF";
		default: return "#C9C9C9";
	}
}

const Flashcard = ({ question, answer, rating, showAnswer, updateCardRating }: Props) => {
	return (
		<div className="flashcard">
			<FlashcardQuestion
				content={question}
				colour={getColourFromRating(rating)}
			/>
			<FlashcardAnswer
				content={answer}
				visible={showAnswer}
				colour={getColourFromRating(rating)}
			/>
			<FlashcardRateBar
				buttonsEnabled={showAnswer}
				updateCardRating={updateCardRating}
			/>
		</div>
	);
};

export default Flashcard;
