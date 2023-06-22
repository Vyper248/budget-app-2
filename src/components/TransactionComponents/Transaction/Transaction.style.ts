import styled from "styled-components";

type Props = {
    positive: boolean;
    selected: boolean;
}

const StyledTransaction = styled.div<Props>`
    display: flex;
    width: 100%;
    height: 45px;
    cursor: pointer;

    ${props => props.selected && 'background-color: var(--obj-highlight-bg);'}

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background-color: var(--obj-highlight-bg);
        }

        &.openingBalance {
            background-color: inherit;

            &:hover {
                cursor: default;
            }
        }
    }

    & .descriptionDate {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 10px;
        overflow: hidden;
    }

    & .description {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    & .date {
        font-size: 0.8em;
        color: var(--light-text-color);
    }

    & .amount, & .runningBalance {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right: 10px;
        width: 120px;
        min-width: 120px;
    }

    & .amount {
        color: ${props => props.positive ? 'var(--text-color-positive)' : 'auto'};
    }

    & .runningBalance {
        color: var(--light-text-color);
    }
`;

export default StyledTransaction
