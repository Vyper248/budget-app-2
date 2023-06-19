import styled from "styled-components";

const StyledSettings = styled.div`
    & .settingsContainer {
        max-width: 350px;
        margin: auto;

        & > * {
            margin-bottom: 5px;
        }
    }

    @media screen and (max-width: 700px) {
        padding-top: 10px;
    }
`;

export default StyledSettings
