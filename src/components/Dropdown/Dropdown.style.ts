import styled from "styled-components";
import StyledInput from "@/components/Input/Input.style";

const StyledDropdown = styled(StyledInput)`
	& select {
		opacity: 0;
	}

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
		  z-index: 1;
	  }
	}

	& .visibleSelection {
		font-size: 0.9em;
		pointer-events: none;
		position: absolute;
		top: 0px;
		left: 0px;
		z-index: 1;
		padding-left: 10px;
		display: flex;
		justify-content: left;
		align-items: center;
	}
`;

export default StyledDropdown
