import { useEffect, useState } from "react";
import FlashcardQuestion from "../FlashcardQuestion/FlashcardQuestion";
import FlashcardAnswer from "../FlashcardAnswer/FlashcardAnswer";

import FlashcardRateBar from "../FlashcardRateBar/FlashcardRateBar";
import "../Flashcard/Flashcard.css";
import getColourFromRating from "../../utils/colourFromRating";

interface Props {
	question: string;
	answer: string;
	rating: number;
	show: boolean;
}

const DummyFlashcard = ({ question, answer, rating, show }: Props) => {
	return (
		<div className="flashcard-dummy" style={{visibility: show ? "visible" : "hidden"}}>
			<div
				className="flashcard-question-answer-dummy"
				style={{
					animationName: "popOut",
				}}
			>
				<FlashcardQuestion
					content={question}
					colour={getColourFromRating(rating)}
				/>
				<FlashcardAnswer
					content={answer}
					visible={true}
					colour={getColourFromRating(rating)}
				/>
			</div>
		</div>
	);
};

export default DummyFlashcard;
