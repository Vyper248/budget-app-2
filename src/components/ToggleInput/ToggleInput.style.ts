import styled from "styled-components";

type Props = {
    hasLabel: boolean;
    width: string;
    value: boolean;
}

const StyledToggleInput = styled.div<Props>`
    position: relative;
	display: flex;
	${props => !props.hasLabel && 'width: 100%;'}

    & .toggleContainer {
        border: 1px solid var(--menu-border-color);
        border-radius: 0px 5px 5px 0px;
        border-left: none;
        ${props => !props.hasLabel ? 'border-left: 1px solid var(--menu-border-color);' : ''}
		${props => !props.hasLabel ? 'border-radius: 5px;' : ''}
        display: inline-grid;
        grid-template-columns: 1fr 1fr;
		height: 30px;
		width: ${props => props.width};
        position: relative;
        overflow: hidden;
        cursor: pointer;
    }

    & .toggle {
        position: absolute;
        background-color: ${props => props.value ? 'var(--menu-bg-color)' : '#888'};
        ${props => !props.value ? 'border-radius: 0px 3px 3px 0px;' : ''}
        width: calc(50% - 4px);
        height: calc(100% - 4px);
        margin: 2px;
        left: ${props => props.value ? '0%' : '50%'};
        transition: 0.3s;
        display: flex;
        justify-content: center;
        align-items: center;
        user-select: none;
    }
`;

export default StyledToggleInput
