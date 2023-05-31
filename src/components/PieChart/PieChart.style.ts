import styled from "styled-components";

type Props = {
    pieWidth: string;
    labelWidth: string;
    gradient: string;
    gradientTwo: string;
    selectedVisible: boolean;
}

const StyledPieChart = styled.div<Props>`
    margin: 20px;
    text-align: center;

    & #container {
        display: inline-grid;
        grid-template-columns: ${props => `${props.pieWidth} ${props.labelWidth}`};
        grid-gap: 50px;
    }

    & #pie {
        position: relative;
        width: ${props => props.pieWidth};
        height: ${props => props.pieWidth};
        border-radius: 50%;
        background: ${props => props.gradient};
        transition: filter 1s;

        :hover {
            ${props => props.selectedVisible ? 'cursor: pointer;' : ''}
        }

        :after {
            content: '';
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: ${props => props.gradientTwo};
            opacity: ${props => props.selectedVisible ? '1' : '0'};
            transition: opacity 0.5s;
        }
    }

    & #labels {
        width: ${props => props.labelWidth};
        height: ${props => props.pieWidth};
        overflow: auto;

        #label {
            display: flex;
            align-items: center;
            margin: 5px;

            #color {
                width: 50px;
                min-width: 50px;
                height: 33px;
                border-radius: 5px;
                
                :hover {
                    cursor: pointer;
                }
            }

            #text {
                text-align: left;
                margin-left: 5px;
                font-size: 0.9em;
                text-transform: capitalize;
            }
        }
    }
`;

export default StyledPieChart
