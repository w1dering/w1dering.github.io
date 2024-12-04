import { useEffect, useState } from "react";
import FlashcardSegment from "../FlashcardSegment/FlashcardSegment";

import "./Flashcard.css";

interface Props {
	question: string;
	answer: string;
	showAnswer: boolean;
}

const Flashcard = ({ question, answer, showAnswer }: Props) => {
	useEffect(() => {}, []);

	return (
		<div className="flashcard">
			<FlashcardSegment content={question} />
			<FlashcardSegment content={showAnswer ? answer : "???"} />
		</div>
	);
};

export default Flashcard;
