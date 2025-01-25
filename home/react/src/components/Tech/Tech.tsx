import "./Tech.css";

import { techIcons } from "../Data/TechData";

interface Props {
	name: string;
}

const Tech = ({ name }: Props) => {
	return (
		<div className="tech" style={{ backgroundImage: `url(${techIcons[name]})` }}>
		</div>
	);
};

export default Tech;