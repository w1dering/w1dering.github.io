import { useEffect, useState } from "react";
import FlashcardSegment from "../FlashcardSegment/FlashcardSegment";

interface Props {
	question: string;
	answer: string;
	showAnswer: boolean;
}

const Flashcard = ({ question, answer, showAnswer }: Props) => {
	useEffect(() => {}, []);

	return (
		<>
			<FlashcardSegment content={question} />
			<FlashcardSegment content={showAnswer ? answer : "???"} />
		</>
	);
};

export default Flashcard;
