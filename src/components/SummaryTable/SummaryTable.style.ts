import styled from "styled-components";

const StyledSummaryTable = styled.div`
    & .scrollText {
        margin-top: 0px !important;
    }

    & td.date {
        background-color: var(--bg-color);
    }

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
