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
`;

export default StyledSummaryTable
