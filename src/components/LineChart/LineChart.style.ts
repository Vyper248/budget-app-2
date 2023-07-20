import styled from "styled-components";

type Props = {
    minWidth: number;
}

const StyledLineChart = styled.div<Props>`
    padding-left: 10px;
    padding-right: 10px;
    width: 100%;
    max-width: 700px;
    margin: auto;
    position: relative;

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

    & .chart {
        max-width: 700px;
        margin: auto;
        margin-top: 5px;
        display: flex;
        padding-bottom: 150px;
        overflow: auto;
        position: relative;
    }

    & .lineChart {
        height: 300px;
        width: 100%;
        min-width: ${props => props.minWidth}px;
        margin-left: auto;
        border-bottom: 1px solid var(--text-color); 
        position: relative;
    }

    & .segment {
        border: 1px solid var(--text-color);
        position: absolute;
        bottom: 0px;
        height: 50%;
        width: 50px;
    }

    & .numbers {
        margin-top: -3px;
        margin-bottom: -3px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: sticky;
        left: 0px;
        top: 0px;
        background-color: var(--bg-color);
        z-index: 2;
        border-right: 1px solid white;

        & .number {
            margin-right: 5px;
            white-space: nowrap;
            text-align: right;
        }

        &::after {
            content: '';
            position: absolute;
            top: calc(100% - 3px);
            left: 0px;
            width: calc(100% + 1px);
            height: 150px;
            background-color: var(--bg-color);
        }
    }

    & .label {
        position: absolute;
        padding-left: 20px;
        top: 100%;
        transform: translate(-100%) rotate(-90deg);
        transform-origin: right;
        white-space: nowrap;
    }

    & .line {
        stroke-width: 2;
    }

    & .point {
        cursor: pointer;
        stroke-width: 2;

        &:hover {
            stroke: var(--text-color);
        }
    }

    & .popup {
        position: absolute;
        width: fit-content;
        border: 1px solid var(--text-color);
        border-radius: 5px;
        padding: 5px;
        background-color: var(--bg-color);
    }

    @media screen and (max-width: 700px) {
        & .point {
            stroke-width: 4;
            r: 6px;
        }
    }
`;

export default StyledLineChart
