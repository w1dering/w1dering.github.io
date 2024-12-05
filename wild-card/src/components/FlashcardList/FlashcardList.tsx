// database stuff

import FlashcardListEntry from "../FlashcardListEntry/FlashcardListEntry.tsx";

import "./FlashcardList.css"

const tempData = [
	{
		name: "test1",
		flashcardData: [
			{
				question: "a1",
				answer: "b1",
			},
			{
				question: "c1",
				answer: "d1",
			},
			{
				question: "e1",
				answer: "f1",
			},
		],
        ratings: [0, 1, 2],
	},
	{
		name: "test2",
		flashcardData: [
			{
				question: "a2",
				answer: "b2",
			},
			{
				question: "c2",
				answer: "d2",
			},
			{
				question: "e2",
				answer: "f2",
			},
		],
        ratings: [3, 4, 5]
	},
];

const FlashcardList = () => {
    const data = tempData;

    return(
        <div>
            {data.map((flashcardListEntry) => (
                <FlashcardListEntry name={flashcardListEntry.name}/>
            ))}
        </div>
    )

}
export default FlashcardList;