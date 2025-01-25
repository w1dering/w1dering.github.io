import Project from "../Project/Project";

import { projects } from "../Data/ProjectData";

import "./Body.css";


const Body = () => {
	return (
		<div id="body">
			<div id="body-project-container">
				{projects.map((project, index) => (
					<Project
						name={project.name}
						description={project.description}
						url={project.url}
						img={project.img}
						techs={project.techs}
						key={index}
					/>
				))}
			</div>
		</div>
	);
};

export default Body;
