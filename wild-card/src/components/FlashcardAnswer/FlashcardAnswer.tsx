import "./FlashcardAnswer.css";

interface Props {
	content: string;
	visible: boolean;
	colour?: string;
}

const FlashcardAnswer = ({ content, visible, colour = "#c9c9c9"}: Props) => {
	return (
		<div
			className="flashcard-answer"
			style={{
				transform: visible ? "translateY(0%)" : "translateY(-110%)",
				borderLeft: `20px solid ${colour}`,
			}}
		>
			{content}
		</div>
	);
};

export default FlashcardAnswer;
