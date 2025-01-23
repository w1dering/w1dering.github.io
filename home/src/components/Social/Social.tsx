import "./Social.css";

interface Props {
	name: string;
	icon: string;
	link: string;
}

const Social = ({ name, icon }: Props) => {
	return (
		<button className="social" style={{ backgroundImage: `url(${icon})` }}>
			<p className="social-text">{name}</p>
		</button>
	);
};

export default Social;
