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
			description: "a satirical rhythm game",
			url: "https://w1dering.itch.io/sacabambaspis",
			img: "/sacabambaspis.png",
		},
		{
			name: "ARIE",
			description: "make friends to be happy. marihacks 2024",
			url: "https://w1dering.itch.io/arie",
			img: "/arie.png",
		},
		{
			name: "blablabla",
			description: "bla",
			url: "",
			img: "",
		},
		{
			name: "blablabla",
			description: "bla",
			url: "",
			img: "",
		},
		{
			name: "blablabla",
			description: "bla",
			url: "",
			img: "",
		},
		{
			name: "blablabla",
			description: "bla",
			url: "",
			img: "",
		},
		{
			name: "blablabla",
			description: "bla",
			url: "",
			img: "",
		},
		{
			name: "blablabla",
			description: "bla",
			url: "",
			img: "",
		},
		{
			name: "blablabla",
			description: "bla",
			url: "",
			img: "",
		},
		{
			name: "blablabla",
			description: "bla",
			url: "",
			img: "",
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
