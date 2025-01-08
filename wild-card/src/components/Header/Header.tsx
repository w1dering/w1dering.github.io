import { ReactNode } from "react";
import "./Header.css";

interface Props {
	className?: string;
	id?: string;
	content: string;
	children?: ReactNode;
}

const Header = ({ className = "", id = "", content }: Props) => {
	return (
		<div className={`${className} header`} id={id}>
			{content}
		</div>
	);
};

export default Header;
