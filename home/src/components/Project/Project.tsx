import Tech from "../Tech/Tech";


import "./Project.css";

interface Props {
	name: string;
	description: string;
	url: string;
	img: string;
	techs: string[];
}

const Project = ({ name, description, url, img, techs }: Props) => {
	const openURL = () => {
		if (url) {
			window.open(url, "_blank");
		}
	};

	return (
		<button
			className="project"
			style={{ backgroundImage: `url(${img})` }}
			onClick={openURL}
		>
			<div className="project-overlay"></div>
			<div className="project-name">{name}</div>
			<div className="project-description">{description}</div>
			<div className="project-footer">
				{techs.map((tech, index) => (
					<Tech
						name={tech}
						key={index}
					></Tech>
				))}
			</div>
		</button>
	);
};

export default Project;
