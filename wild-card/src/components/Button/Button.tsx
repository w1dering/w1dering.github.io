interface Props {
    text: string;
    fn: () => void;
}

const Button = ({ text, fn }: Props) => {
    return (<button>{text}</button>)
}

export default Button;