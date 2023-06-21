import styled from "styled-components";

type Props = {
    pieWidth: string;
    labelWidth: string;
    selected: number;
}

const StyledPieChart = styled.div<Props>`
    margin: 20px;
    text-align: center;

    & #container {
        display: inline-grid;
        grid-template-columns: ${props => `${props.pieWidth} ${props.labelWidth}`};
        grid-gap: 50px;
    }

    #pie {
        border-radius: 50%;
        overflow: hidden;
        width: 400px;
        height: 400px;
        -webkit-tap-highlight-color: transparent;
        
        & path {
            transition: opacity 0.3s;
        }

        ${props => props.selected !== -1 ? `
            & path:not(#path${props.selected}) {
                opacity: 0.5;
            }
        ` : `
            @media (hover: hover) and (pointer: fine) {
                & path:hover {
                    opacity: 0.8;
                }
            }
        `}

        & path:hover {
            cursor: pointer;
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
                transition: opacity 0.3s;
                -webkit-tap-highlight-color: transparent;
                
                @media (hover: hover) and (pointer: fine) {
                    :hover {
                        cursor: pointer;
                        opacity: 0.8;
                    }
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

    @media screen and (max-width: 700px) {
        margin: 10px;

        & #container {
            grid-template-columns: auto;
            grid-gap: 5px;
        }

        & #labels {
            width: 350px;
            height: auto;
            margin: auto;
            display: flex;
            flex-wrap: wrap;

            #label {
                flex-grow: 1;
                width: 45%;
                margin: 2px;
            }
        }

        & #pie {
            width: 350px;
            height: 350px;
            margin: auto;
        }
    }
`;

export default StyledPieChart
