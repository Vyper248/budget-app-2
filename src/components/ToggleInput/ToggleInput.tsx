import StyledToggleInput from "./ToggleInput.style";
import StyledInputLabel from "../styled/InputLabel";

type ToggleInputProps = {
	value: boolean;
	onChange: (val: boolean)=>void;
	label?: string;
	width?: string;
	labelWidth?: string;
}

const ToggleInput = ({value, onChange, label, width='100%', labelWidth='auto'}: ToggleInputProps) => {
	const onClick = () => {
		onChange(!value);
	}

	return (
		<StyledToggleInput hasLabel={label !== undefined} width={width} value={value}>
			{label && <StyledInputLabel htmlFor={label} width={labelWidth}>{label}</StyledInputLabel>}
			<div aria-label={label} className='toggleContainer' onClick={onClick}>
				<div className='toggle'>{value ? 'Yes' : 'No'}</div>
			</div>
		</StyledToggleInput>
	);
}

export default ToggleInput;
