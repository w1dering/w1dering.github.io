import { useNavigate } from "react-router-dom";

interface Props {
	name: string;
    cards: number;
}

const DeckListEntry = ({ name, cards }: Props) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/deck/${name}`);
    };

	return <div onClick={handleClick}>{name}, cards: {cards}</div>;
};

export default DeckListEntry;
