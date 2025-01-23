import "./Header.css";

import Social from "../Social/Social";

interface Props {
	socials: { name: string; icon: string; link: string }[];
}

const Header = ({ socials }: Props) => {
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
