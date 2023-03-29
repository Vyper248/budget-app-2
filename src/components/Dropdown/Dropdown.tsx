import StyledDropdown from "./Dropdown.style";
import StyledInputLabel from "../styled/InputLabel";

type DropdownProps = {
	value: string | number;
	options: Array<{value: string | number, label: string}>;
	onChange: (value: string | number) => void;
	label?: string;
	width?: string;
	labelWidth?: string;
}

const Dropdown = ({value, options, onChange, label, width='100%', labelWidth='auto' }: DropdownProps) => {
	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		onChange(event.target.value);
	}

	return (
		<StyledDropdown width={width}>
			<StyledInputLabel width={labelWidth}>{label}</StyledInputLabel>
			<select value={value} onChange={handleChange} aria-label={label}>
				<option value="" disabled>Select an option</option>
				{options.map((option) => (
					<option key={option.value} value={option.value}>{option.label}</option>
				))}
			</select>
		</StyledDropdown>
	);
}

export default Dropdown;
