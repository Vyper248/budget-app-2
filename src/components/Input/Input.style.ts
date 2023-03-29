import styled from "styled-components";

type Props = {
  labelWidth: string;
  width: string;
}

const StyledInput = styled.div<Props>`
  display: flex;
  flex-direction: row;
  /* width: 100%; */

  label {
    background-color: var(--menu-bg-color);
    border: 1px solid var(--menu-border-color);
    color: #fff;
    padding-right: 10px;
    border-radius: 5px 0 0 5px;
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
    height: 30px;
    width: ${props => props.labelWidth};
  }

  input {
    padding: 0.5rem;
    border: 1px solid var(--menu-border-color);
    border-left: none;
    border-radius: 0 5px 5px 0;
    border-top: 1px solid #ccc;
    display: inline-flex;
    height: 30px;
    width: ${props => props.width};

    &:focus {
      outline: none;
      border: 1px solid var(--menu-bg-color);
      border-left: none;
    }
  }
`;

export default StyledInput;
