import styled from "styled-components";

const StyledItemList = styled.div`
    display: flex;
    flex-direction: column;

    & > * {
        margin: 2px 0px;
        font-size: 1em;
    }

    & > hr {
        width: 100%;
        margin: 5px 0px;
    }

    & > h4 {
        text-align: center;
        margin: 10px 0px;
    }
`;

export default StyledItemList
