import StyledCloseableContainer from "./CloseableContainer.style";
import React, { ReactNode, useCallback } from "react";

type CloseableContainerProps = {
	children: ReactNode | ReactNode[];
	heading: string;
}

const CloseableContainer = ({heading, children}: CloseableContainerProps) => {
	const [height, setHeight] = React.useState('auto');
	const [closed, setClosed] = React.useState(false);

	const measuredRef = useCallback((node:HTMLDivElement | null) => {
		if (node !== null) {
			setHeight(node.getBoundingClientRect().height+'px');
		}
	}, []);

	const onClickHeading = () => {
		setClosed(closed => !closed);
	}

	return (
		<StyledCloseableContainer height={height} closed={closed}>
			<h3 onClick={onClickHeading}>{heading}</h3>
			<div className='container'>
				<div ref={measuredRef}>
					{children}
				</div>
			</div>
		</StyledCloseableContainer>
	);
}

export default CloseableContainer;
