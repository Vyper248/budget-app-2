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
        overflow: auto;
    }

    & > div:last-child {
        flex-grow: 1;
        margin-left: 0px;
        overflow: auto;
    }

    @media screen and (max-width: 700px) {
        width: calc(100% - 10px);
        flex-direction: column;
        margin: auto;

        & > div:last-child {
            overflow: visible;
        }

        & > div {
            border: none;
            margin: 0px;
            height: auto;
        }
    }
`;

export default ItemPageLayout;
