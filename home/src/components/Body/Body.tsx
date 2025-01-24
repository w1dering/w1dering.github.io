import Project from "../Project/Project";

import "./Body.css";

interface Props {
	projects: { name: string; description: string; url: string; img: string }[];
}

const Body = ({projects}: Props) => {

	return (
		<div id="body">
			<div id="body-project-container">
				{projects.map((project, index) => (
					<Project
						name={project.name}
						description={project.description}
						url={project.url}
						img={project.img}
						key={index}
					/>
				))}
			</div>
		</div>
	);
};

export default Body;
