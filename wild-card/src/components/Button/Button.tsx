interface Props {
	content?: string; // make this string OR image
	fn: (e: React.MouseEvent<HTMLButtonElement>) => void;
	id?: string;
	className?: string;
	enabled?: boolean;
	img?: {
		src: string;
		className?: string;
		id?: string;
	};
}

const Button = ({
	content,
	fn,
	id = "",
	className = "",
	enabled = true,
	img,
}: Props) => {
	return (
		<button
			onClick={(e) => fn(e)}
			id={id}
			className={className}
			disabled={!enabled}
		>
			{img && (
				<img src={img.src} className={img.className} id={img.id}></img>
			)}
			{content}
		</button>
	);
};

export default Button;
