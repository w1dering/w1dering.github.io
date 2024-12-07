import Button from "../Button/Button"
import "./FlashcardRateBarButton.css"

interface Props {
    value: number;
    fn: (value: number) => void;
    className: string;
    id: string;
}

const FlashcardRateBarButton = ({value, fn, className, id}: Props) => {
    return (
			<Button
				text={String(value)}
				fn={() => fn(value)}
				className={className}
				id={id}
			/>
		);
}

export default FlashcardRateBarButton;