interface Props {
    name: string;
}

const FlashcardListEntry = ({name}: Props) => {
    return <div>{name}</div>
}

export default FlashcardListEntry;