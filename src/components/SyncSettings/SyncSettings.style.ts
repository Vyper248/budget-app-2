import styled from "styled-components";

const StyledSyncSettings = styled.div`
    & video {
        max-width: calc(100% - 10px);
        height: 400px;
        margin: 5px;
    }

    & #qrCode {
        & > svg {
            margin: 10px;
        }

        & > div, & > button {
            margin: 5px;
        }
    }

    & #syncMessage {
        margin-top: 5px;

        &.error {
            color: #F00;
        }

        &.success {
            color: #0F0;
        }
    }

    & ul > li {
        margin: 5px;
    }

    @media screen and (max-width: 700px) {
        & video {
            height: auto;
        }
    }
`;

export default StyledSyncSettings;