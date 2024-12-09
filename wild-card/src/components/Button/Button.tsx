import { useState } from "react";

interface Props {
	text: string;
	fn: (e: React.MouseEvent<HTMLButtonElement>) => void;
	id?: string;
	className?: string;
}

const Button = ({ text, fn, id = "", className = "" }: Props) => {
	return (
		<button
			onClick={(e) => fn(e)}
			id={id}
			className={className}
		>
			{text}
		</button>
	);
};

export default Button;
