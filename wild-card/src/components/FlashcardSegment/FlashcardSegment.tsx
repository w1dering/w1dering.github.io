import "./FlashcardSegment.css"

interface Props {
    content: string;
}

const FlashcardSegment = (props: Props) => {
    const CONTENT = props.content;
    return <div className="flashcard-segment">{props.content}</div>
}

export default FlashcardSegment;