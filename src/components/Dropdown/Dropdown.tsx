import StyledDropdown from "./Dropdown.style";
import StyledInputLabel from "@/components/styled/InputLabel";

type DropdownProps = {
	value: string | number | undefined;
	options: Array<{value: string | number, label: string, options?: Array<{value: string | number, label: string}>}>;
	onChange: (value: string) => void;
	label?: string;
	width?: string;
	labelWidth?: string;
}

const getOptionName = (value: DropdownProps['value'], options: DropdownProps['options']) => {
	let name = 'Select an option';
	options.forEach(option => {
		if (option.options) {
			option.options.forEach(subOption => {
				if (subOption.value === value) name = subOption.label;
			});
		} else {
			if (option.value === value) name = option.label;
		}
	});

	return name;
}

const Dropdown = ({value, label='', onChange, width='100%', labelWidth='auto', options}: DropdownProps) => {
	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		onChange(event.target.value);
	}

	if (value === undefined || Number.isNaN(value)) value = '';

	const name = getOptionName(value, options);

	return (
		<StyledDropdown height={0} width={width} hasLabel={label.length > 0}>
			{ label.length > 0 && <StyledInputLabel htmlFor={label} width={labelWidth}>{label}</StyledInputLabel> }
			<div className='dropdown'>
				<div className='visibleSelection'>{name}</div>
				<select id={label} value={value} onChange={handleChange} aria-label={label}>
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
