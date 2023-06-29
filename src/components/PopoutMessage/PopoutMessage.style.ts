import styled from "styled-components";

const StyledPopoutMessage = styled.div`
    border: 2px solid var(--menu-border-color);
    border-radius: 5px;
    background-color: var(--menu-bg-color);
    width: 300px;
    max-width: 80%;
    position: fixed;
    right: -400px;
    top: 40px;
    padding: 10px;
    padding-right: 30px;
    opacity: 0;
    transition: 0.3s;
    z-index: 10;

    & p {
        margin: 0px;
    }

    &.success {
        border-color: #0F0;
    }

    &.error {
        border-color: #F00;
    }

    &.display {
        right: 10px;
        opacity: 1;
    }

    & .closeBtn {
        position: absolute;
        top: 8px;
        right: 5px;
        font-size: 1.5em;
    }

    @media screen and (max-width: 700px) {
        top: 75px;
    }
`;

export default StyledPopoutMessage
