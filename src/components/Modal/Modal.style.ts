import styled from "styled-components";

type Props = {
    width: string;
    headingColor: string;
    color: string;
    dragging: boolean;
}

const StyledModal = styled.div<Props>`
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0px;
    left: 0px;
    pointer-events: ${props => props.dragging ? 'auto' : 'none'};

    & .outline {
        position: absolute;
        pointer-events: auto;
        width: ${props => props.width};
        border: 2px solid ${props => props.headingColor === 'black' ? 'var(--menu-bg-color)' : props.headingColor};
        background-color: var(--bg-color);
        color: var(--text-color);

        & h4 {
            background-color: ${props => props.headingColor};
            opacity: 0.9;
            padding: 4px;
            margin: 0px;
            text-align: center;
            color: ${props => props.color};
            position: relative;
            cursor: move;
            user-select: none;
        }
    }

    & .closeBtn {
        position: absolute;
        right: 0px;
        top: 0px;
        color: white;
        background-color: var(--bg-color);
        border-radius: 50%;
        width: 25px;
        height: 25px;
        padding: 0px;
        outline: none;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;

        & > svg {
            width: 25px;
            height: 25px;
        }

        &:hover {
            cursor: pointer;
            color: var(--light-text-color);
        }
    }
`;

export default StyledModal
