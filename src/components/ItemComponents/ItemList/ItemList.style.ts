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

    & .heading {
        position: relative;

        h4 {
            text-align: center;
            margin: 10px 0px;
        }

        button {
            position: absolute;
            right: 0px;
            top: 0px;
        }
    }

    & > div.spacer {
        flex-grow: 1;
    }

    & > button {
        min-height: 30px;
    }
`;

export default StyledItemList
