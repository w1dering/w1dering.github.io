interface Props {
	content: string; // make this string OR image
	fn: (e: React.MouseEvent<HTMLButtonElement>) => void;
	id?: string;
	className?: string;
	enabled?: boolean;
}
 
const Button = ({ content, fn, id = "", className = "", enabled = true}: Props) => {
	return (
		<button
			onClick={(e) => fn(e)}
			id={id}
			className={className}
			disabled={!enabled}
		>
			{content}
		</button>
	);
};

export default Button;
