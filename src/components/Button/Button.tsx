import StyledButton from "./Button.style";

type ButtonProps = {
	label: string;
	onClick: ()=>void;
	width?: string;
	rounded?: boolean;
	selected?: boolean;
	hidden?: boolean;
}

const Button = ({label, onClick, width='140px', rounded=true, selected=false, hidden=false}: ButtonProps) => {
	let className = selected ? 'selected' : '';
	if (hidden) className += ' hidden';

	return (
		<StyledButton onClick={onClick} width={width} rounded={rounded} className={className}>{label}</StyledButton>
	);
}

export default Button;
