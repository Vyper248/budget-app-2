import styled from "styled-components";

const StyledCategoryBreakdown = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    & > *:not(h4) {
        margin: 5px;
    }
`;

export default StyledCategoryBreakdown
