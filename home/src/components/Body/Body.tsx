import Project from "../Project/Project";

import "./Body.css";

interface Props {
	projects: { name: string; description: string; url: string; img: string }[];
}

const Body = ({projects}: Props) => {

	return (
		<div id="body">
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
	);
};

export default Body;
