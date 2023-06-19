import styled from "styled-components";

const StyledConfirmationContainer = styled.div`
    position: relative;

    .popup {
        position: absolute;
        display: flex;
        background-color: var(--bg-color);
        border: 1px solid var(--menu-border-color);
        border-radius: 5px;
        padding: 4px;
        bottom: calc(100% + 8px);
        left: 50%;
        transform: translate(-50%, 0%);
        z-index: 2;

        & > button {
            margin: 2px;
        }
    }

    .popup.left {
        bottom: auto;
        left: auto;
        right: calc(100% + 8px);
        top: 50%;
        transform: translate(0%, -50%);
    }

    .popup.right {
        bottom: auto;
        left: calc(100% + 8px);
        right: auto;
        top: 50%;
        transform: translate(0%, -50%);
    }

    .popup.bottom {
        bottom: auto;
        left: 50%;
        right: auto;
        top: calc(100% + 8px);
        transform: translate(-50%, 0%);
    }

    .popup::after {
        content: '';
        border: 1px solid var(--menu-border-color);
        border-top: none;
        border-left: none;
        background-color: var(--bg-color);
        position: absolute;
        bottom: -5px;
        left: 50%;
        width: 7px;
        height: 7px;
        transform: translate(-50%, 0%) rotate(45deg);
    }

    .popup.left::after {
        left: auto;
        right: -5px;
        top: 50%;
        bottom: auto;
        transform: translate(0%, -50%) rotate(-45deg);
    }

    .popup.right::after {
        left: -5px;
        right: auto;
        top: 50%;
        bottom: auto;
        transform: translate(0%, -50%) rotate(135deg);
    }

    .popup.bottom::after {
        left: 50%;
        right: auto;
        top: -5px;
        bottom: auto;
        transform: translate(-50%, 0%) rotate(-135deg);
    }
`;

export default StyledConfirmationContainer
