import { useEffect } from "react";

interface Props {
    text: string;
    fn: () => void;
}

const Button = ({ text, fn }: Props) => {
    return (<button onClick={fn}>{text}</button>)
}

export default Button;