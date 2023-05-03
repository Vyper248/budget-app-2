import styled from 'styled-components';

type Props = {
    template?: string;
    start?: string;
    end?: string;
    width?: string;
    margin?: string;
}

const Grid = styled.div<Props>`
    display: grid;
    grid-template-columns: ${props => props.template ? props.template : '1fr 1fr'};
    grid-gap: 10px;
    margin: 10px;
    ${props => props.start !== undefined ? 'grid-column-start: '+props.start : ''};
    ${props => props.end !== undefined ? 'grid-column-end: '+props.end : ''};
    ${props => props.width !== undefined ? 'width: '+props.width : ''};
    ${props => props.width !== undefined ? 'margin: auto' : ''};
    ${props => props.margin !== undefined ? 'margin: '+props.margin : ''};
`;

export default Grid;