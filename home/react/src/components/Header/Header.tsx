import "./Header.css";

import Social from "../Social/Social";

import { socials } from "../Data/SocialData";

const Header = () => {
	return (
		<div id="header">
			<div id="header-title">w1dering</div>
			<div id="header-socials">
				{socials.map((social, index) => (
					<Social
						name={social.name}
						icon={social.icon}
						link={social.link}
						key={index}
					/>
				))}
			</div>
		</div>
	);
};

export default Header;
