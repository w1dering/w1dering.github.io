import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, signInWithPopup } from "firebase/auth"

import FlashcardStudying from "./components/FlashcardStudying/FlashcardStudying";
import Toolbar from "./components/Toolbar/Toolbar";
import "./App.css"
import { GoogleAuthProvider } from "firebase/auth/web-extension";

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

const App = () => {
	const [data, setData] = useState<APICall>();
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
	}, []);

	const flashcardData = [
		{
			question: "a",
			answer: "b",
		},
		{
			question: "c",
			answer: "d",
		},
		{
			question: "e",
			answer: "f",
		},
	];

	return (
		<div id="app">
			<Toolbar/>
			<FlashcardStudying flashcardData={flashcardData} />
		</div>
	);
};

export default App;
