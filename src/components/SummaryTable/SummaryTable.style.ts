import styled from "styled-components";

const StyledSummaryTable = styled.div`
    padding: 0px 20px;
    width: 'fit-content';

    & table tbody td {
        text-align: center;
    }

    & table th.income {
        background-color: green;
        color: white;
    }

    & table th.expense {
        background-color: darkorange;
        color: black;
    }

    & table th.fund {
        background-color: lightsteelblue;
        color: black;
    }

    & table th.remaining {
        background-color: deepskyblue;
        color: black;
    }

    & table td.summaryData.selected {
        background-color: var(--obj-highlight-bg);
    }

    & table td.summaryData:hover {
        background-color: var(--obj-highlight-bg);
        cursor: pointer;
    }

    & table tr.summary:hover td:not(.expense, .income, .fund) {
        background-color: var(--obj-highlight-bg);
    }

    & table .morePeriodIcon {
        float: right;
        margin-left: 5px;
    }

    & table .lessPeriodIcon {
        float: left;
        margin-right: 5px;
    }

    & table .morePeriodIcon, & table .lessPeriodIcon {
        position: relative;
        top: 2px;
    }

    & table .morePeriodIcon:hover, & table .lessPeriodIcon:hover {
        cursor: pointer;
    }

    & table .lessPeriodIcon.hidden, & table .morePeriodIcon.hidden {
        opacity: 0;
        pointer-events: none;
    }

    & table .lessPeriodIcon.reversed, & table .morePeriodIcon.reversed {
        transform: rotate(90deg);
        top: 1px;
    }
`;

export default StyledSummaryTable
