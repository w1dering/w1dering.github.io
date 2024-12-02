import { useEffect, useState } from "react";

interface APIType {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const App = () => {
	const [data, setData] = useState<APIType[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/posts")
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

	return (
		<>
			<h1>API Test:</h1>
			{loading && "Data is loading"}
			{!loading && (
				<>
					<h1>API Data:</h1>
					<ul>
						{data.map((item) => {
							return (<ul>
                                <h1>User ID: {item.userId}</h1>
                                <h2>id: {item.id}</h2>
                                <h3>{item.title}</h3>
                                <h4>{item.body}</h4>
                            </ul>)
						})}
					</ul>
				</>
			)}
		</>
	);
};

export default App;
