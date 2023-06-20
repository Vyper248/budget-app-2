import styled from "styled-components";

type Props = {
    cursor: string;
}

const StyledIconButton = styled.button<Props>`
    cursor: ${props => props.cursor};
    background-color: transparent;
    border: none;
    display: inline-flex;
    align-items: center;
    font-size: inherit;
    margin: 0px;
    padding: 0px;
    height: 100%;
    -webkit-tap-highlight-color: transparent;

    &:hover {
        opacity: 0.7;
    }
`;

export default StyledIconButton
