interface Props {
    content: string;
}

const FlashcardSegment = (props: Props) => {
    const CONTENT = props.content;
    return <h1>{props.content}</h1>
}

export default FlashcardSegment;