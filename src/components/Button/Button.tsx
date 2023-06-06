import StyledButton from "./Button.style";

type ButtonProps = {
	label: string;
	onClick: ()=>void;
	width?: string;
	rounded?: boolean;
	selected?: boolean;
	hidden?: boolean;
	disabled?: boolean;
}

const Button = ({label, onClick, width='auto', rounded=true, selected=false, hidden=false, disabled=false}: ButtonProps) => {
	let className = selected ? 'selected' : '';
	if (hidden) className += ' hidden';

	return (
		<StyledButton onClick={onClick} width={width} rounded={rounded} className={className} disabled={disabled}>{label}</StyledButton>
	);
}

export default Button;
