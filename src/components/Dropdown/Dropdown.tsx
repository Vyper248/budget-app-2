import StyledDropdown from "./Dropdown.style";
import StyledInputLabel from "../styled/InputLabel";

type DropdownProps = {
	value: string | number | undefined;
	options: Array<{value: string | number, label: string, options?: Array<{value: string | number, label: string}>}>;
	onChange: (value: string) => void;
	label?: string;
	width?: string;
	labelWidth?: string;
}

const Dropdown = ({value, label, onChange, width='100%', labelWidth='auto', options}: DropdownProps) => {
	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		onChange(event.target.value);
	}

	if (value === 0 || value === undefined || Number.isNaN(value)) value = '';

	return (
		<StyledDropdown width={width}>
			<StyledInputLabel width={labelWidth}>{label}</StyledInputLabel>
			<div className='dropdown'>
				<select value={value} onChange={handleChange} aria-label={label}>
					<option value="" disabled>Select an option</option>
					{options.map((option) => {
						if (option.options) {
							return (
								<optgroup label={option.label} key={option.label}>
									{option.options.map((subOption) => (
										<option key={subOption.value} value={subOption.value}>{subOption.label}</option>
									))}
								</optgroup>
							)
						} else {
							return (
								<option key={option.value} value={option.value}>{option.label}</option>
							)
						}
					})}
				</select>
			</div>
		</StyledDropdown>
	);
}

export default Dropdown;
