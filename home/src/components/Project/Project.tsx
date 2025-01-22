import "./Project.css";

interface Props {
	name: string;
	description: string;
	url: string;
	img: string;
}

const Project = ({ name, description, url, img }: Props) => {
	return (
		<div
			className="project"
			style={{ backgroundImage: `url(${url})` }}
		>
            <div className="project-name">{name}</div>
            <div className="project-description">{description}</div>
        </div>
	);
};

export default Project;
