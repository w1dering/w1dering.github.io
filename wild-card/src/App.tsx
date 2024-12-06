import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/web-extension";

import {
	BrowserRouter as Router,
	Route,
	Routes,
	Link,
	useParams,
} from "react-router-dom";

import DeckSession from "./components/DeskSession/DeckSession";
import Header from "./components/Header/Header";
import DeckList from "./components/DeckList/DeckList";
import Sidebar from "./components/Sidebar/Sidebar";

import "./App.css";
import Flashcard from "./components/Flashcard/Flashcard";

interface APICall {
	id: string;
	object: string;
	created: number;
	model: string;
	choices: {
		index: number;
		message: {
			role: string;
			content: string;
			refusal: string | null;
		};
		finish_reason: string;
	}[];
	usage: {
		prompt_tokens: number;
		completion_tokens: number;
		total_tokens: number;
		prompt_tokens_details: {
			text_tokens: number;
			audio_tokens: number;
			image_tokens: number;
			cached_tokens: number;
		};
	};
	system_fingerprint: string;
}

const firebaseConfig = {
	apiKey: "AIzaSyAIvh4twxFK568O3gER-tCZO6Vds8aRKoY",
	authDomain: "wild-card-137a7.firebaseapp.com",
	projectId: "wild-card-137a7",
	storageBucket: "wild-card-137a7.firebasestorage.app",
	messagingSenderId: "157515566093",
	appId: "1:157515566093:web:36415df01d8ab297b95944",
	measurementId: "G-8N0LM32Y15",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

/*
const auth = getAuth(app)
onAuthStateChanged(auth, user => {
	console.log("You are logged in as", user);
})
 
signInWithPopup(auth, new GoogleAuthProvider())
*/



const tempData = [
	{
		name: "test1",
		flashcardData: [
			{
				question: "a1",
				answer: "b1",
				rating: 0,
			},
			{
				question: "c1",
				answer: "d1",
				rating: 1,
			},
			{
				question: "e1",
				answer: "f1",
				rating: 2,
			},
		],
	},
	{
		name: "test2",
		flashcardData: [
			{
				question: "a2",
				answer: "b2",
				rating: 3,
			},
			{
				question: "c2",
				answer: "d2",
				rating: 4,
			},
			{
				question: "e2",
				answer: "f2",
				rating: 5,
			},
		],
	},
];

const data = tempData;

const App = () => {
	const [APIdata, setAPIData] = useState<APICall>(); // rename once you include api calls
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const apiKey = import.meta.env.VITE_REACT_APP_X_AI_API_KEY;

		const requestData = {
			messages: [
				{
					role: "user",
					content: "what is 1+1",
				},
			],
			model: "grok-beta",
			stream: false,
			temperature: 0,
		};

		// fetch("https://api.x.ai/v1/chat/completions", {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 		Authorization: `Bearer ${apiKey}`,
		// 	},
		// 	body: JSON.stringify(requestData),
		// })
		// 	.then((response) => {
		// 		setLoading(true);
		// 		return response.json();
		// 	})
		// 	.then((json) => {
		// 		setData(json);
		// 		setLoading(false);
		// 	})
		// 	.catch((error) => {
		// 		console.error("error: ", error);
		// 	});
	}, );

	return (
		<Router>
			<div id="app">
				<Header />
				<Sidebar />
				<Routes>
					<Route
						path="/"
						element={
							<DeckList
								entries={data.map((entry) => ({
									name: entry.name,
									cards: entry.flashcardData.length,
								}))}
							/>
						}
					/>

					<Route
						path="/deck/:deckId"
						element={
							<DeckSession
								getDeckData={(id: string) => {
									let index = data.find((entry) => entry.name === id);
									return index ? index.flashcardData : null;
								}}
							/>
						}
					/>
				</Routes>
			</div>
		</Router>
	);
};

export default App;
