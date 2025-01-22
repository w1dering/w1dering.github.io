import Project from "../Project/Project";

import "./Body.css";

const Body = () => {
	const PROJECTS = [
		{
			name: "Canvas",
			description: "A grid-based puzzle game.",
			url: "https://w1dering.github.io/canvas/canvas.html",
			img: "../../imgs/canvas.png",
		},
		{
			name: "Sacabambaspis",
			description: "SACABAMBASPIS!",
			url: "https://w1dering.itch.io/sacabambaspis",
			img: "../../imgs/sacabambaspis.png",
		},
	];

	return (
		<div id="body">
			{PROJECTS.map((project) => (
				<Project
					name={project.name}
					description={project.description}
					url={project.url}
					img={project.img}
				/>
			))}
		</div>
	);
};

export default Body;
