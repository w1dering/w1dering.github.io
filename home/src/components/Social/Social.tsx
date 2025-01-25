import "./Social.css";

interface Props {
	name: string;
	icon: string;
	link: string;
}

const Social = ({ icon, link }: Props) => {
	const openLink = () => {
		window.open(link, "_blank");
	};
	return (
		<button className="social" style={{ backgroundImage: `url(${icon})` }} onClick={openLink}>
			<div className="social-overlay"></div>
		</button>
	);
};

export default Social;
