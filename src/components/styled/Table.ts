import styled from 'styled-components';

type Props = {
    padding?: string;
}

const Table = styled.table<Props>`
    margin: 5px auto;
    border-spacing: 0px;
    overflow: hidden;
    border-radius: 5px;
    background-color: var(--bg-color);
    color: var(--text-color);
    text-align: center;

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

    & td.trValue:hover {
        cursor: pointer;
        background-color: var(--obj-highlight-bg);
        color: var(--obj-highlight-text);
    }

    & td.trValue.selected {
        background-color: var(--obj-highlight-bg);
        color: var(--obj-highlight-text);
    }

    & td.summaryData.selected {
        background-color: var(--obj-highlight-bg);
    }

    & td.summaryData:hover {
        background-color: var(--obj-highlight-bg);
        cursor: pointer;
    }
`;

export default Table;