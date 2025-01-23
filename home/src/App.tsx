import Body from "./components/Body/Body";
import Header from "./components/Header/Header";

import "./App.css";

const App = () => {
	const socials = [
		{
			name: "insta",
			icon: "",
			link: "",
		},
		{
			name: "linkedin",
			icon: "",
			link: "",
		},
		{
			name: "github",
			icon: "",
			link: "",
		}
	];

	const projects = [
		{
			name: "canvas",
			description: "a grid-based puzzle game",
			url: "https://w1dering.github.io/canvas/canvas.html",
			img: "/canvas.png",
		},
		{
			name: "sacabambaspis",
			description: "satirical four-key rhythm game",
			url: "https://w1dering.itch.io/sacabambaspis",
			img: "/sacabambaspis.png",
		},
	];

	return (
		<>
			<Header socials={socials}/>
			<Body projects={projects}/>
		</>
	);
};

export default App;
