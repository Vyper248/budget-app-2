import StyledTable from "./Table.style";
import { ReactNode } from "react";

import ScrollText, { useScrollText } from "../ScrollText/ScrollText";

type TableProps = {
	children: ReactNode | ReactNode[];
}

const Table = ({children}: TableProps) => {
	const {showScroll, scrollRef, onScroll} = useScrollText<HTMLTableElement>([]);

	return (
		<StyledTable>
			<ScrollText left={showScroll.left} right={showScroll.right}/>
			<div className='scrollContainer' ref={scrollRef} onScroll={onScroll}>
				<table>
					{ children }
				</table>
			</div>
		</StyledTable>
	);
}

export default Table;
