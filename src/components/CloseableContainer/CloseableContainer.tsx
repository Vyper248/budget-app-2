import { ReactNode, useState } from "react";
import StyledCloseableContainer from "./CloseableContainer.style";

type CloseableContainerProps = {
	children: ReactNode | ReactNode[];
	heading: string;
	length: number;
	startClosed?: boolean;
	lineHeight?: number;
}

const CloseableContainer = ({heading, children, length=0, lineHeight=45, startClosed=false}: CloseableContainerProps) => {
	const [closed, setClosed] = useState(startClosed || false);
	const [renderChildren, setRenderChildren] = useState(startClosed ? false : true);
	const [timeoutVar, setTimeoutVar] = useState<NodeJS.Timeout | null>(null);

	let height = `${lineHeight * length}px`;
	const instant = length > 40;
	if (instant) height = 'auto';

	const onClickHeading = () => {
		if (closed) {
			//Start opening
			setRenderChildren(true);
			setClosed(false);
			if (timeoutVar) {
				clearTimeout(timeoutVar);
				setTimeoutVar(null);
			}
		} else {
			//Start closing
			setClosed(true);

			if (instant) {
				setRenderChildren(false);
				return;
			} else {	
				setTimeoutVar(setTimeout(() => {
					setRenderChildren(false);
					setTimeoutVar(null);
				}, 300));
			}
		}
	}

	return (
		<StyledCloseableContainer height={height} closed={closed}>
			<h3 onClick={onClickHeading}>{heading}</h3>
			<div className='container'>
				<div>
					{ renderChildren && children }
				</div>
			</div>
		</StyledCloseableContainer>
	);
}

export default CloseableContainer;
