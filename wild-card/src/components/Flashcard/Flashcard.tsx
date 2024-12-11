import { useEffect, useState } from "react";
import FlashcardQuestion from "../FlashcardQuestion/FlashcardQuestion";
import FlashcardAnswer from "../FlashcardAnswer/FlashcardAnswer";

import FlashcardRateBar from "../FlashcardRateBar/FlashcardRateBar";
import "./Flashcard.css";
import getColourFromRating from "../../utils/colourFromRating";

interface Props {
	question: string;
	answer: string;
	rating: number;
	showAnswer: boolean;
	updateCardRating: (rating: number) => void;
}


const Flashcard = ({ question, answer, rating, showAnswer, updateCardRating }: Props) => {
	return (
		<div className="flashcard">
			<FlashcardQuestion
				content={question}
				colour={getColourFromRating(rating)}
			/>
			<FlashcardAnswer
				content={showAnswer ? answer : ""}
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
