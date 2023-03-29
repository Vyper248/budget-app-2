import styled from "styled-components";

type Props = {
  width: string;
}

const StyledInput = styled.div<Props>`
  display: flex;
  flex-direction: row;
  position: relative;
  width: fit-content;

  input, select {
    border: 1px solid var(--menu-border-color);
    border-left: none;
    border-radius: 0 5px 5px 0;
    border-top: 1px solid #ccc;
    display: inline-flex;
    height: 30px;
    width: ${props => props.width};
    position: relative;
    appearance: none;
    padding: 0px 10px;
    cursor: pointer;
    
    &:focus {
      outline: none;
      border: 1px solid var(--menu-bg-color);
      border-left: none;
    }
  }

  input {
    cursor: text;
  }
`;

export default StyledInput;
