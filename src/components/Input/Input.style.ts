import styled from "styled-components";

type Props = {
  width: string;
  hasLabel: boolean;
}

const StyledInput = styled.div<Props>`
  display: flex;
  flex-direction: row;
  position: relative;

  & input, select {
    border: 1px solid var(--menu-border-color);
    border-left: none;
    border-radius: 0 5px 5px 0;
    ${props => !props.hasLabel ? 'border-left: 1px solid var(--menu-border-color);' : ''}
    ${props => !props.hasLabel ? 'border-radius: 5px;' : ''};
    border-top: 1px solid #ccc;
    display: inline-flex;
    height: 30px;
    width: ${props => props.width};
    position: relative;
    appearance: none;
    padding: 0px 10px;
    cursor: pointer;
    background-color: var(--bg-color);
    color: var(--text-color);
    
    &:focus {
      outline: none;
      border: 1px solid var(--menu-bg-color);
      ${props => props.hasLabel ? 'border-left: none;' : ''}
    }
  }

  input {
    cursor: text;
  }
`;

export default StyledInput;
