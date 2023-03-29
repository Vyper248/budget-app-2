import StyledInput from "./Input.style";

type InputProps = {
  label?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  width?: string;
  labelWidth?: string;
  type?: string;
  [x: string]: any;
}

const Input = ({label='', type='text', value, onChange, width='100%', labelWidth='auto', ...rest}: InputProps) => {
	return (
		<StyledInput labelWidth={labelWidth} width={width}>
		  {label && <label htmlFor={label}>{label}</label>}
		  <input type={type} value={value} onChange={onChange} aria-label={label} {...rest}/>
		</StyledInput>
	);
}

export default Input;
