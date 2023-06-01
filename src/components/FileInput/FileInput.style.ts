import styled from "styled-components";

const StyledFileInput = styled.div`
    & > input {
        display: none;
    }

    & > label {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        border: 1px solid var(--menu-border-color);
        height: var(--input-height);
        vertical-align: bottom;
        padding: 0px 10px;
        border-radius: 5px 0px 0px 5px;
        cursor: pointer;
        border-right: none;

        &:hover {
            background-color: var(--obj-highlight-bg);
            color: var(--obj-highlight-text);
        }
    }

    & > button {
        border-radius: 0px 5px 5px 0px;
    }
`;

export default StyledFileInput
