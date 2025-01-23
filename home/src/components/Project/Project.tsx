import "./Project.css";

interface Props {
	name: string;
	description: string;
	url: string;
	img: string;
}

const Project = ({ name, description, url, img }: Props) => {
	const openURL = () => {
		window.open(url, "_blank");
	}

	console.log(img);

	return (
		<button
			className="project"
			style={{ backgroundImage: `url(${img})` }}
			onClick={openURL}
		>
			<div className="project-overlay"></div>
            <div className="project-name">{name}</div>
            <div className="project-description">{description}</div>
			<div className="project-footer"></div>
        </button>
	);
};

export default Project;
