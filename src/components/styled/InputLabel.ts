import styled from "styled-components";

type Props = {
    width: string;
}

const StyledInputLabel = styled.label<Props>`
    background-color: var(--menu-bg-color);
    border: 1px solid var(--menu-border-color);
    color: #fff;
    padding: 0px 10px;
    border-radius: 5px 0 0 5px;
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
    height: 30px;
    width: ${props => props.width};
    min-width: ${props => props.width};
`;

export default StyledInputLabel;