import styled from "styled-components";

const StyledAccountSummaries = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    max-width: 800px;
    margin: auto;
    padding: 0px 5px;

    & > div:first-of-type {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;

        & > div {
            width: auto;
        }
    }

    & > div:last-of-type {
        display: flex;
        width: 100%;

        & > div {
            width: 100%;
        }
    }   

    @media screen and (max-width: 650px) {
        & > div:first-of-type {
            grid-template-columns: 1fr 1fr 1fr;
        }
    }

    @media screen and (max-width: 450px) {
        & > div:first-of-type {
            grid-template-columns: 1fr 1fr;
        }
    }
`;

export default StyledAccountSummaries
