import styled from "styled-components";

const ItemPageLayout = styled.div`
    display: flex;
    width: 90%;
    max-width: 1150px;
    margin: 10px auto;

    & > div {
        border: 1px solid var(--menu-border-color);
        margin: 5px;
        padding: 5px;
        height: calc(100vh - 70px);
    }

    & > div:first-child {
        width: 200px;
        min-width: 200px;
    }

    & > div:last-child {
        flex-grow: 1;
        margin-left: 0px;
    }
`;

export default ItemPageLayout;
