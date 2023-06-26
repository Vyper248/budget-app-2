import styled from "styled-components";

type Props = {
    cursor: string;
}

const StyledIconButton = styled.button<Props>`
    cursor: ${props => props.cursor};
    background-color: transparent;
    border: none;
    display: inline-flex;
    align-items: center;
    font-size: inherit;
    margin: 0px;
    padding: 0px;
    height: 100%;

    &.bordered {
        background-color: var(--menu-bg-color);
        color: var(--menu-text-color);
        display: inline-flex;
        height: var(--input-height);
        justify-content: center;
        align-items: center;
        border: 1px solid var(--menu-border-color);
        border-radius: 5px;
        width: 100%;

        @media (hover: hover) and (pointer: fine) {
            &:hover {
                cursor: pointer;
                background-color: var(--menu-selected-bg-color);
                color: var(--menu-selected-text-color);
                opacity: 1;
            }
        }
    }

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            opacity: 0.7;
        }
    }
`;

export default StyledIconButton
