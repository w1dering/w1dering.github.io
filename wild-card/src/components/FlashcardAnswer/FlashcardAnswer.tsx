import "./FlashcardAnswer.css";

interface Props {
	content: string;
	visible: boolean; // for playing the animation
	colour?: string;
	show: boolean; // for being completely hidden instantly
}

const FlashcardAnswer = ({ content, visible, colour = "#c9c9c9", show}: Props) => {
	return (
		<div
			className="flashcard-answer"
			style={{
				transition: show ? "transform 0.4s ease-out" : "none",
				transform: visible ? "translateY(0%)" : "translateY(-110.5%)",
				borderLeft: `20px solid ${colour}`,
			}}
		>
			{content}
		</div>
	);
};

export default FlashcardAnswer;
