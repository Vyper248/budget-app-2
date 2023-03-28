import StyledButton from "./Button.style";

type ButtonProps = {
	label: string;
	onClick: ()=>void;
	width?: string;
}

const Button = ({label, onClick, width='140px'}: ButtonProps) => {
	return (
		<StyledButton onClick={onClick} width={width}>{label}</StyledButton>
	);
}

export default Button;
