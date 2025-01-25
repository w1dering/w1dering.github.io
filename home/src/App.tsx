import Body from "./components/Body/Body";
import Header from "./components/Header/Header";
import Opening from "./components/Opening/Opening";

import "./App.css";
import { useEffect, useState } from "react";

const App = () => {
	const [openingAnimationPlayed, setOpeningAnimationPlayed] = useState(false);
	useEffect(() => {
		setTimeout(() => {
			setOpeningAnimationPlayed(true);
		}, 3650);
	}, []);
	return (
		<>
			{!openingAnimationPlayed && <Opening></Opening>}
			<Header />
			<Body />
		</>
	);
};

export default App;
