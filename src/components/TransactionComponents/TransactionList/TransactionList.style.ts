import styled from "styled-components";

const StyledTransactionList = styled.div`
    & > div {
        border-bottom: 1px solid gray;
    }

    & > div:last-child {
        border-bottom: none;
    }
`;

export default StyledTransactionList
