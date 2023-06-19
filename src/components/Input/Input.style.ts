import styled from "styled-components";

type Props = {
	width: string;
	height: number;
	hasLabel: boolean;
}

const StyledInput = styled.div<Props>`
	position: relative;
	display: flex;
	flex-direction: row;
	position: relative;
	${props => !props.hasLabel && 'width: 100%;'}

	& .topLabel {
		padding: 0px 2px;
		position: absolute;
		bottom: calc(100% - 7px);
		left: 50%;
		transform: translate(-50%, 0px);
		font-size: 0.8em;
		z-index: 1;
		background-color: var(--bg-color);
	}

	& input, select, textarea, .visibleSelection {
		border: 1px solid var(--menu-border-color);
		border-left: none;
		border-radius: 0 5px 5px 0;
		${props => !props.hasLabel ? 'border-left: 1px solid var(--menu-border-color);' : ''}
		${props => !props.hasLabel ? 'border-radius: 5px;' : ''};
		display: inline-flex;
		height: 30px;
		width: ${props => props.width};
		position: relative;
		appearance: none;
		padding: 0px 10px;
		background-color: var(--bg-color);
		color: var(--text-color);
		font-size: 0.9em;
		
		&:focus {
			outline: none;
			border: 1px solid var(--menu-bg-color);
			${props => props.hasLabel ? 'border-left: none;' : ''}
		}

		&[type='date']:invalid {
			color: red;
		}
	}

	select {
		cursor: pointer;
	}

	textarea {
		padding: 6px 10px;
		font-family: inherit;
		font-size: 0.9em;
		resize: vertical;
		height: ${props => props.height + 'px'};
		min-height: 30px;
	}

	input {
		cursor: text;
	}

	/* Invert the color of the calendar picker in chrome */
	input::-webkit-calendar-picker-indicator {
		filter: var(--chrome-calendar-icon);

		:hover {
			cursor: pointer;
		}
	}
`;

export default StyledInput;
