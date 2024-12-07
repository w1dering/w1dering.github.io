import { useState } from "react";

interface Props {
	text: string;
	fn: (props: Omit<Props, "fn">) => void;
	id?: string;
	className?: string;
}

const Button = ({ text, fn, id = "", className = "" }: Props) => {
	return (
		<button
			onClick={() => fn({ text, id, className })}
			id={id}
			className={className}
		>
			{text}
		</button>
	);
};

export default Button;
