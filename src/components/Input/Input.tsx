import { useEffect, useRef, useState } from "react";
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
  const [textHeight, setTextHeight] = useState(0);
  const ref = useRef(null);

  //set the starting height of a text area box if needed
  useEffect(() => {
    if (type === 'textarea' && ref && ref.current) {
      let textArea = ref.current as HTMLTextAreaElement;
      setTextHeight(textArea.scrollHeight);
    }
  }, [ref]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		onChange(event.target.value);
    if (type === 'textarea') setTextHeight(event.target.scrollHeight);
	}

  if (Number.isNaN(value)) value = '';

	return (
		<StyledInput width={width} hasLabel={label.length > 0} height={textHeight}>
		  {label && <StyledInputLabel htmlFor={label} width={labelWidth}>{label}</StyledInputLabel>}
      { type === 'textarea' ? <textarea ref={ref} value={value} onChange={handleChange} aria-label={label} {...rest}/>
                            : <input type={type} value={value} onChange={handleChange} aria-label={label} {...rest}/>
      }
		</StyledInput>
	);
}

export default Input;
