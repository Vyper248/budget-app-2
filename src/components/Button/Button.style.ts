import styled from "styled-components";

type Props = {
    width: string;
    rounded: boolean;
}

const StyledButton = styled.button<Props>`
    background-color: var(--menu-bg-color);
    color: var(--menu-text-color);
    display: inline-flex;
    height: var(--input-height);
    justify-content: center;
    align-items: center;
    border: 1px solid var(--menu-border-color);
    border-radius: ${props => props.rounded ? '5px' : '0px'};
    width: ${props => props.width};
    font-size: 1em;
    
    &:hover {
        cursor: pointer;
        background-color: var(--menu-selected-bg-color);
        color: var(--menu-selected-text-color);
    }

    &.selected {
        background-color: var(--menu-selected-bg-color);
        color: var(--menu-selected-text-color);
    }

    &.hidden {
        background-color: #999;
        color: white;

        &:hover {
            background-color: #777;
            color: white;
        }
    }

    &.hidden.selected {
        background-color: #777;
        color: white;
    }

    &[disabled] {
        background-color: var(--obj-highlight-bg);
        color: #999;
        cursor: auto;
    }
`;

export default StyledButton
