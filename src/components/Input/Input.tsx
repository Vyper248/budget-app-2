import StyledInput from "./Input.style";
import StyledInputLabel from "@/components/styled/InputLabel";

type InputProps = {
  label?: string;
  value: string | number;
  onChange: (value: string) => void;
  width?: string;
  labelWidth?: string;
  type?: string;
  [x: string]: any;
}

const Input = ({label='', type='text', value, onChange, width='100%', labelWidth='auto', ...rest}: InputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange(event.target.value);
	}

  if (Number.isNaN(value)) value = '';

	return (
		<StyledInput width={width} hasLabel={label.length > 0}>
		  {label && <StyledInputLabel htmlFor={label} width={labelWidth}>{label}</StyledInputLabel>}
		  <input type={type} value={value} onChange={handleChange} aria-label={label} {...rest}/>
		</StyledInput>
	);
}

export default Input;
