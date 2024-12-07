import "./FlashcardQuestion.css";

interface Props {
	content: string;
	colour?: string;
}

const FlashcardQuestion = ({ content, colour = "#c9c9c9"}: Props) => {
	return <div className="flashcard-question" style={{borderLeft: `20px solid ${colour}`}}>{content}</div>;
};

export default FlashcardQuestion;
