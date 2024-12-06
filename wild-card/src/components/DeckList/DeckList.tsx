import { useEffect } from "react";
import { useParams } from "react-router-dom";

import DeckListEntry from "../DeckListEntry/DeckListEntry";

import "./DeckList.css"

interface Props {
	entries: {
		name: string,
		cards: number;
	}[];
}

const DeckList = ({ entries }: Props) => {


    return(
        <div id="deck-list">
            {entries.map((deckListEntry) => (
                <DeckListEntry name={deckListEntry.name} cards={deckListEntry.cards}/>
            ))}
        </div>
    )

}
export default DeckList;