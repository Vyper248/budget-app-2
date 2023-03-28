import styled from "styled-components";

type Props = {
    width: string;
}

const StyledButton = styled.button<Props>`
    background-color: var(--menu-bg-color);
    color: var(--menu-text-color);
    display: flex;
    height: var(--input-height);
    justify-content: center;
    align-items: center;
    border: 1px solid var(--menu-border-color);
    border-radius: 5px;
    width: ${props => props.width};
    
    &:hover {
        cursor: pointer;
        background-color: var(--menu-selected-bg-color);
        color: var(--menu-selected-text-color);
    }
`;

export default StyledButton
