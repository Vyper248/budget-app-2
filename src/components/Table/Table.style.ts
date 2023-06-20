import styled from "styled-components";

type Props = {
    padding?: string;
}


const StyledTable = styled.div<Props>`
    max-width: calc(100% - 20px);
    margin: 5px 10px;

    & .scrollContainer {
        overflow: auto;
        max-width: 100%;
        border-radius: 5px 0px 0px 5px;
    }

    & .scrollText {
        display: flex;
        justify-content: space-between;
        margin-top: -8px;
        text-align: right;
        margin-left: auto;
        font-size: 0.8em;
        opacity: 0.9;

        & > div {
            transition: opacity 0.3s;
        }

        & .hidden {
            opacity: 0;
        }

        & svg {
            position: relative;
            top: 4px;
            font-size: 1.2em;
        }
    }

    & table {
        margin: 0px auto;
        border-spacing: 0px;
        border-radius: 5px;
        background-color: var(--bg-color);
        color: var(--text-color);
        text-align: center;

        & .sticky {
            position: sticky;
            left: 0px;
            z-index: 1;
        }

        & .filled {
            background-color: var(--bg-color);
        }

        & thead th {
            background-color: var(--table-heading-bg-color);
            color: var(--table-heading-text-color);
        }

        & td.bold, & th.bold {
            font-weight: bold;
        }

        & td.highlighted, & tr.highlighted td {
            background-color: var(--mild-highlight);
        }

        & td.date {
            min-width: 125px;
        }

        & tbody th {
            background-color: var(--table-heading-bg-color);
            color: var(--table-heading-text-color);
            font-weight: normal;
        }

        & tbody td {
            white-space: nowrap;
        }

        & tr.spacer td {
            border-left: none !important;
            border-right: none !important;
        }

        & tr td.corner-top-left {
            border-top: none !important;
            border-left: none !important;
            background-color: transparent;
        }

        & td, & th {
            padding: ${props => props.padding ? props.padding : '10px 15px'};
            border-right: 1px solid var(--menu-border-color);
            border-bottom: 1px solid var(--menu-border-color);
        }
        
        & > *:first-child tr:first-child > * {
            border-top: 1px solid var(--menu-border-color);
        }

        & tr td:first-child, & tr th:first-child {
            border-left: 1px solid var(--menu-border-color);
        }

        & > *:first-child tr:first-child > *:first-child {
            border-top-left-radius: 5px;
        }

        & > *:first-child tr:first-child > *:last-child {
            border-top-right-radius: 5px;
        }

        & tbody tr:last-child td:first-child {
            border-bottom-left-radius: 5px;
        }

        & tbody tr:last-child td:last-child {
            border-bottom-right-radius: 5px;
        }

        & td {
            position: relative;
        }

        & td.input {
            padding: 2px;
        }

        & td.summaryData.selected {
            background-color: var(--obj-highlight-bg);
        }

        @media (hover: hover) and (pointer: fine) {
            & td.summaryData:hover {
                background-color: var(--obj-highlight-bg);
                cursor: pointer;
            }
        }
    }
`;

export default StyledTable
