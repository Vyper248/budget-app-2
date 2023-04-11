import styled from "styled-components";

type Props = {
    height: string;
    closed: boolean;
}

const StyledCloseableContainer = styled.div<Props>`
    h3 {
        background-color: var(--menu-bg-color);
        text-align: center;
        padding: 8px 5px;
        margin: 0px 0px 1px 0px;
        cursor: pointer;
    }

    & .container {
        height: ${props => props.closed ? '0px' : props.height};
        overflow: hidden;
        transition: height 0.3s;
    }
`;

export default StyledCloseableContainer
