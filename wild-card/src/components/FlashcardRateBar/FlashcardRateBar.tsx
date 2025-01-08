import "./FlashcardRateBar.css";
import Button from "../Button/Button";

interface Props {
	buttonsEnabled: boolean;
	updateCardRating: (rating: number) => void;
}

const FlashcardRateBar = ({ buttonsEnabled, updateCardRating }: Props) => {
	return (
		<div id="flashcard-rate-bar">
			<p>Rate your knowledge of this card</p>
			<div id="flashcard-rate-bar-button-container">
				<Button
					content={"1"}
					fn={() => updateCardRating(1)}
					className="flashcard-rate-bar-button rate-button-1"
					enabled={buttonsEnabled}
				/>
				<Button
					content={"2"}
					fn={() => updateCardRating(2)}
					className="flashcard-rate-bar-button rate-button-2"
					enabled={buttonsEnabled}
				/>
				<Button
					content={"3"}
					fn={() => updateCardRating(3)}
					className="flashcard-rate-bar-button rate-button-3"
					enabled={buttonsEnabled}
				/>
				<Button
					content={"4"}
					fn={() => updateCardRating(4)}
					className="flashcard-rate-bar-button rate-button-4"
					enabled={buttonsEnabled}
				/>
				<Button
					content={"5"}
					fn={() => updateCardRating(5)}
					className="flashcard-rate-bar-button rate-button-5"
					enabled={buttonsEnabled}
				/>
			</div>
		</div>
	);
};

export default FlashcardRateBar;
