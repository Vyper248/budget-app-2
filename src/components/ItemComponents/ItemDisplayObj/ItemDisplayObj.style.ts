import styled from "styled-components";

const StyledItemDisplayObj = styled.div`
    border: 1px solid var(--menu-border-color);
    border-radius: 5px;
    padding: 5px;
    margin-bottom: 5px;
    display: flex;
    flex-wrap: wrap;
    background-color: var(--bg-color);

    & h4 {
        width: 100%;
        margin: 5px;
    }

    & > span {
        width: 100%;
        margin: 0px 0px 0px 5px;
        opacity: 0.7;
    }

    & > div.labelledText {
        display: inline-flex;
        wrap: nowrap;
        margin: 2px 5px;

        label {
            margin-right: 5px;   
            width: fit-content; 
        }

        span {
            margin-right: 10px;
        }
    }
`;

export default StyledItemDisplayObj
