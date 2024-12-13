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
import DeckEdit from "./components/DeckEdit/DeckEdit";

import "./App.css";

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
		name: "test0",
		deck: [
			{
				question: "1st",
				answer: "1st",
				rating: 1,
			},
			{
				question: "2nd",
				answer: "2nd",
				rating: 1,
			},
			{
				question: "3rd",
				answer: "3rd",
				rating: 2,
			},
			{
				question: "4th",
				answer: "4th",
				rating: 2,
			},
			{
				question: "5th",
				answer: "5th",
				rating: 3,
			},
			{
				question: "6th",
				answer: "6th",
				rating: 3,
			},
			{
				question: "7th",
				answer: "7th",
				rating: 4,
			},
			{
				question: "8th",
				answer: "8th",
				rating: 4,
			},
			{
				question: "9th",
				answer: "9th",
				rating: 5,
			},
		],
	},
	{
		name: "test1",
		deck: [
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
		deck: [
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

const App = () => {
	const [APIdata, setAPIData] = useState<APICall>(); // rename once you include api calls
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(tempData);

	const updateData = (
		deckName: string,
		cardIndex: number,
		toUpdate: string,
		newContent: string | number
	) => {
		setData((prevData) => {
			// consider switching to use param, but if you want to obfuscate the url, it won't work; this is valid
			const currentIndex = prevData.findIndex(
				(entry) => entry.name === deckName
			);
			if (currentIndex === -1) {
				console.log("deck update failed; deck name not found");
				return prevData;
			}

			const updatedDeck = [...prevData[currentIndex].deck];
			switch (toUpdate) {
				case "question":
					updatedDeck[cardIndex] = {
						...updatedDeck[cardIndex],
						question: newContent as string,
					};
					break;
				case "answer":
					updatedDeck[cardIndex] = {
						...updatedDeck[cardIndex],
						answer: newContent as string,
					};
					break;
				case "rating":
					updatedDeck[cardIndex] = {
						...updatedDeck[cardIndex],
						rating: newContent as number,
					};
					break;
				default:
					console.log("update card passed invalid toUpdate");
					break;
			}
			const updatedData = [...prevData];
			updatedData[currentIndex] = {
				...prevData[currentIndex],
				deck: updatedDeck,
			};
			return updatedData;
		});
	};

	const addFlashcard = (deckName: string) => {
		setData((prevData) => {
			const currentIndex = prevData.findIndex(
				(entry) => entry.name === deckName
			);
			if (currentIndex === -1) {
				console.log("deck update failed; deck name not found");
				return prevData;
			}
			const updatedDeck = [...prevData[currentIndex].deck];

			updatedDeck.push({
				question: "",
				answer: "",
				rating: 0,
			});
			const updatedData = [...prevData];
			updatedData[currentIndex] = {
				...prevData[currentIndex],
				deck: updatedDeck,
			}
			return updatedData;
		});
	};

	const deleteFlashcard = (deckName: string, cardIndex: number) => {
		setData((prevData) => {
			const currentIndex = prevData.findIndex(
				(entry) => entry.name === deckName
			);
			if (currentIndex === -1) {
				console.log("deck update failed; deck name not found");
				return prevData;
			}
			const updatedDeck = [...prevData[currentIndex].deck];

			updatedDeck.splice(cardIndex, 1);
			const updatedData = [...prevData];
			updatedData[currentIndex] = {
				...prevData[currentIndex],
				deck: updatedDeck,
			};
			return updatedData;
		});
	}

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
	});

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
									cards: entry.deck.length,
								}))}
							/>
						}
					/>

					<Route
						path="/deck/:deckId"
						element={
							<DeckSession
								getDeckData={(id: string) =>
									data.find((entry) => entry.name === id)
								}
								updateData={updateData}
							/>
						}
					/>
					<Route
						path="/edit/:deckId"
						element={
							<DeckEdit
								getDeckData={(id: string) =>
									data.find((entry) => entry.name === id)
								}
								updateData={updateData}
								addFlashcard={addFlashcard}
								deleteFlashcard={deleteFlashcard}
							/>
						}
					/>
				</Routes>
			</div>
		</Router>
	);
};

export default App;
