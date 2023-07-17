import styled from "styled-components";

const StyledSyncSettings = styled.div`
    & video {
        max-width: calc(100% - 10px);
        height: 400px;
        margin: 5px;
    }

    & #qrCode {
        & > svg {
            padding: 5px;
            background-color: white;
            margin: 10px;
        }

        & > div, & > button {
            margin: 5px;
        }
    }

    & #syncMessage {
        margin-top: 5px;

        &.error {
            color: var(--text-color-warning);
        }

        &.success {
            color: var(--text-color-positive);
        }
    }

    & ul > li {
        margin: 5px;
    }

    & .steps {
        /* margin-bottom: -10px; */
        max-height: 0px;
        overflow: hidden;
        transition: max-height 0.3s;

        &.open {
            max-height: 360px;
        }
    }

    @media screen and (max-width: 700px) {
        & video {
            height: auto;
        }
    }
`;

export default StyledSyncSettings;