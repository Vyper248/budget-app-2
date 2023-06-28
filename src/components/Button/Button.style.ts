import styled from "styled-components";

type Props = {
    width: string;
    rounded: boolean;
}

const StyledButton = styled.button<Props>`
    position: relative;
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
    padding: 0px 10px;
    
    @media (hover: hover) and (pointer: fine) {
        &:hover {
            cursor: pointer;
            background-color: var(--menu-selected-bg-color);
            color: var(--menu-selected-text-color);
        }
    }

    &.selected {
        background-color: var(--menu-selected-bg-color);
        color: var(--menu-selected-text-color);
    }

    &.hidden {
        background-color: #999;
        color: white;

        @media (hover: hover) and (pointer: fine) {
            &:hover {
                background-color: #777;
                color: white;
            }
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

export const Loader = styled.div`
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;

    background-color: rgba(0,0,0,0.6);
    border-radius: 5px;
    cursor: default;

    :after {
        content: ' ';
        position: relative;
        top: 2px;
        border: 3px solid black;
        border-radius: 50%;
        border-top: none;
        border-left: none;
        width: 20px;
        height: 20px;
        display: block;
        margin: auto;
        animation-name: spin;
        animation-duration: 0.9s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }

    @keyframes spin {
        from {transform: rotate(0deg);}
        to {transform: rotate(360deg);}
    }
`;

export default StyledButton
