interface FlashcardData {
	question: string;
	answer: string;
	rating: number;
}

interface Props {
	getDeckData: (id: string) => FlashcardData[] | null;
}

const DeckEdit = ({getDeckData} : Props) => {
    
};
