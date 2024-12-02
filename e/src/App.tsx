import { useEffect, useState } from "react";

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

		fetch("https://api.x.ai/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`,
			},
			body: JSON.stringify(requestData),
		})
			.then((response) => {
				setLoading(true);
				return response.json();
			})
			.then((json) => {
				setData(json);
				setLoading(false);
			})
			.catch((error) => {
				console.error("error: ", error);
			});
	}, []);

	if (loading) return <div>Loading...</div>;

	return (
		<>
			<h1>API Test:</h1>
			<ul>{data && data["choices"].map((choice) => choice["message"]["content"])}</ul>
		</>
	);
};

export default App;
