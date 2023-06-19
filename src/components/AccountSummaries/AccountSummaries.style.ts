import styled from "styled-components";

const StyledAccountSummaries = styled.div`
    display: flex;
    max-width: 800px;
    margin: auto;
    flex-wrap: wrap;
    justify-content: center;

    & > div {
        width: calc(25% - 10px);
        min-width: 150px;
        max-width: 200px;
    }

    & > div:last-of-type {
        width: 100%;
        max-width: 100%;
    }

    @media screen and (max-width: 700px) {
        & > div {
            width: 150px;
        }

        & > div:last-of-type {
            max-width: 310px;
        }
    }
`;

export default StyledAccountSummaries
