import styled from "styled-components";

const StyledItemDropdownHeading = styled.div`
    position: relative;
    width: 100%;
    margin: auto;

    & .dropdown {
        margin: auto;
    }

    & .editButton {
        position: absolute;
        right: 5px;
        top: 5px;
    }
    
    & .visibleSelection {
        font-size: 1.3em !important;
        font-weight: bold;
        border: none;
        border-bottom: 2px solid var(--menu-bg-color);
        border-radius: 0px;
        justify-content: center !important;
        height: 35px;
    }

    .dropdown::after {
        border-color: var(--menu-bg-color) !important;
        border-width: 3px !important;
        width: 10px !important;
        height: 10px !important;
    }
`;

export default StyledItemDropdownHeading
