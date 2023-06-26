import styled from "styled-components";

const StyledDateRangeInput = styled.div`
    position: relative;
    width: fit-content;
    margin: auto;

    & .errorMessage {
        color: red;
        text-align: center;
        margin-top: 3px;
    }

    & .menu {
        position: absolute;
        right: 0px;
        top: calc(100% + 2px);
        background-color: var(--bg-color);
        padding: 5px;
        border: 1px solid var(--text-color);
        border-radius: 5px;
        z-index: 2;
        width: 320px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 5px;
        transition: scale 0.3s, opacity 0.3s;
        transform-origin: top;
    }

    & .menu.hidden {
        scale: 0;
        opacity: 0;
    }

    @media screen and (max-width: 700px) {
        margin-top: 10px !important;
    }
`;

export default StyledDateRangeInput;