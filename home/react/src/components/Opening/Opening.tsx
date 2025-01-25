import { useEffect, useState } from "react";
import "./Opening.css";

const Opening = () => {
	const [animationIndex, setAnimationIndex] = useState(0);
	const [bkgStyle, setBkgStyle] = useState<React.CSSProperties>({});
	const [textStyle, setTextStyle] = useState<React.CSSProperties>({});
	const [text, setText] = useState("\u00A0");

	const animations: {
		desc: string;
		dur: number;
	}[] = [
		{ dur: 500, desc: "startup delay" },
		{ dur: 500, desc: "show cursor" },
		{ dur: 70, desc: "type w" },
		{ dur: 170, desc: "type 1" },
		{ dur: 50, desc: "type d" },
		{ dur: 55, desc: "type e" },
		{ dur: 45, desc: "type r" },
		{ dur: 50, desc: "type i" },
		{ dur: 60, desc: "type n" },
		{ dur: 500, desc: "type g" },
		{ dur: 1000, desc: "zoom to top left, circle caves in after delay" },
		{ dur: 500, desc: "text disappears, header title takes precedence" },
		{ dur: 100, desc: "opening disappears" },
	];

	useEffect(() => {
		if (animationIndex < animations.length) {
			const timeout = setTimeout(() => {
				setAnimationIndex((prev) => prev + 1);
				clearTimeout(timeout);
			}, animations[animationIndex].dur);
		}

		switch (animationIndex) {
			case 0:
				// nothing
				break;
			case 1: {
				setTextStyle({
					...textStyle,
					borderRight: "2px solid var(--cream)",
				});
				break;
			}
			case 2: {
				setText("w");
				break;
			}
			case 3: {
				setText("w1");
				break;
			}
			case 4: {
				setText("w1d");
				break;
			}
			case 5: {
				setText("w1de");
				break;
			}
			case 6: {
				setText("w1der");
				break;
			}
			case 7: {
				setText("w1deri");
				break;
			}
			case 8: {
				setText("w1derin");
				break;
			}
			case 9: {
				setText("w1dering");
				setTextStyle({
					...textStyle,
					animation: "cursorBlink 1s infinite 0.3s",
				});
				break;
			}
			case 10: {
				const headerTitle = document.getElementById("header-title");
				const openingText = document.getElementById("opening-text");
				if (!headerTitle || !openingText) {
					console.error("header title or opening text not found");
					return;
				}
				const headerTitleBoundingBox =
					headerTitle.getBoundingClientRect();
				const headerTitleTop = headerTitleBoundingBox.top;
				const headerTitleLeft = headerTitleBoundingBox.left;

				const openingTextBoundingBox =
					openingText.getBoundingClientRect();
				const openingTextWidth = openingTextBoundingBox.width;
				const openingTextHeight = openingTextBoundingBox.height;

				setBkgStyle({
					...bkgStyle,
					transition: "top 1s ease, left 1s ease",
					top: `calc(${headerTitleTop}px - 150vmax + ${
						openingTextHeight / 2
					}px + 2px)`,
					left: `calc(${headerTitleLeft}px - 150vmax + ${
						openingTextWidth / 2
					}px)`,
					animation: "shrink 0.7s 1s",
				});
				break;
			}
			case 11: {
				const headerTitle = document.getElementById("header-title");
				if (!headerTitle) {
					console.error("header title or opening text not found");
					return;
				}
				headerTitle.style.zIndex = "50";
				setText("");
				break;
			}
			case 12: {
				const root = document.getElementById("root");
				if (!root) {
					console.error("root not found");
					return;
				}
				break;
			}
		}
	}, [animationIndex]);
	return (
		<div id="opening" style={bkgStyle}>
			<div id="opening-text" style={textStyle}>
				{text}
			</div>
		</div>
	);
};

export default Opening;
