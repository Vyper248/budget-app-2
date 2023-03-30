import styled from "styled-components";
import StyledInput from "../Input/Input.style";

const StyledDropdown = styled(StyledInput)`
	& > .dropdown {
		position: relative;
		width: ${props => props.width};

		&::after {
		  content: '';
		  position: absolute;
		  top: calc(50% - 2px);
		  right: 8px;
		  width: 6px;
		  height: 6px;
		  transform: translate(0px, -50%) rotate(45deg);
		  border: 1px solid var(--text-color);
		  border-top: none;
		  border-left: none;
		  pointer-events: none;
	  }
	}

`;

export default StyledDropdown
