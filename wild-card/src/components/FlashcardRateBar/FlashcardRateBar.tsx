import "./FlashcardRateBar.css";
import Button from "../Button/Button";
import FlashcardRateBarButton from "../FlashcardRateBarButton/FlashcardRateBarButton"

interface Props {
    buttonsEnabled: boolean;
    updateCardRating: (rating: number) => void;
}

const FlashcardRateBar = ({buttonsEnabled, updateCardRating} : Props) => {
    return (
			<div id="flashcard-rate-bar">
				<p>Rate your knowledge of this card</p>
				<div id="flashcard-rate-bar-button-container">
					<FlashcardRateBarButton
						value={1}
						fn={updateCardRating}
						className="flashcard-rate-bar-button"
						id="flashcard-rate-bar-button-1"
					/>
					<FlashcardRateBarButton
						value={2}
						fn={updateCardRating}
						className="flashcard-rate-bar-button"
						id="flashcard-rate-bar-button-2"
					/>
					<FlashcardRateBarButton
						value={3}
						fn={updateCardRating}
						className="flashcard-rate-bar-button"
						id="flashcard-rate-bar-button-3"
					/>
					<FlashcardRateBarButton
						value={4}
						fn={updateCardRating}
						className="flashcard-rate-bar-button"
						id="flashcard-rate-bar-button-4"
					/>
					<FlashcardRateBarButton
						value={5}
						fn={updateCardRating}
						className="flashcard-rate-bar-button"
						id="flashcard-rate-bar-button-5"
					/>
				</div>
			</div>
		);
}

export default FlashcardRateBar;