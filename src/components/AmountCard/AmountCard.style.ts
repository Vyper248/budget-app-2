import styled from "styled-components";

type Props = {
    color: string;
    textColor: string;
    width: string;
}

const StyledAmountCard = styled.div<Props>`
    text-align: center;
    border-radius: 5px;
    box-shadow: 0px 1px 4px gray;
    width: ${props => props.width};
    overflow: hidden;
    margin: 5px;

    & > div {
        padding: 5px;
    }

    & > div.label {
        background-color: ${props => props.color};
        color: ${props => props.textColor};
        font-weight: bold;
    }
`;

export default StyledAmountCard
