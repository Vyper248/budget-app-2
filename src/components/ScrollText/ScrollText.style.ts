import styled from "styled-components";

const StyledScrollText = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: -8px;
    text-align: right;
    margin-left: auto;
    font-size: 0.8em;
    opacity: 0.9;

    & > div {
        transition: opacity 0.3s;
    }

    & .hidden {
        opacity: 0;
    }

    & svg {
        position: relative;
        top: 4px;
        font-size: 1.2em;
    }
`;

export default StyledScrollText
