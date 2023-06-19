import styled from "styled-components";

const StyledMenuBar = styled.div`
    width: 100%;
    display: flex;
    border-bottom: 1px solid var(--menu-border-color);
    background-color: var(--menu-bg-color);
    color: var(--menu-text-color);
    height: 30px;
    position: fixed;
    top: 0px;
    z-index: 10;

    & > div.full {
        display: grid;
        width: 100%;
        height: 40px;
        grid-template-columns: repeat(7, 1fr);

        & > * {
            justify-content: center;
        }

        & > button:hover {
            opacity: 1;
        }

        & > *:last-child {
            border-right: none;
        }
    }

    & > div.right {
        & > a, & > button {
            border-right: none;
            border-left: 1px solid var(--menu-border-color);
        }
    }

    & > div.spacer {
        flex-grow: 1;
    }

    & > div > a, & > div > button {
        display: inline-flex;
        align-items: center;
        border: none;
        border-right: 1px solid var(--menu-border-color);
        background-color: var(--menu-bg-color);
        color: var(--menu-text-color);
        font-size: 1em;
        height: 100%;
        padding: 0px 10px;
        vertical-align: bottom;

        &:hover {
            cursor: pointer;
            background-color: var(--menu-selected-bg-color);
        }
    }
`;

export default StyledMenuBar

export const StyledMenuHeading = styled.h4`
    margin: 0px auto;
    padding: 5px;
    background-color: var(--menu-bg-color);
    width: min-content;
    position: fixed;
    top: 40px;
    left: 50%;
    transform: translateX(-50%);
    height: 30px;
    width: 130px;
    z-index: 6;
    color: var(--menu-text-color);

    &::after, &::before {
        content: '';
        position: absolute;
        top: 0px;
        height: 0px;
        border: 40px solid var(--menu-bg-color);
        border-bottom: 30px solid transparent;
        border-top: 0px solid transparent;
    }

    &::after {
        left: 100%;
        border-right: 0px solid transparent;
    }

    &::before {
        right: 100%;
        border-left: 0px solid transparent;
    }
`;