import StyledTable from "./Table.style";
import { ReactNode, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { FaLongArrowAltRight, FaLongArrowAltLeft } from "react-icons/fa";

import { useResizeListener } from "@/utils/customHooks.utils";

type TableProps = {
	children: ReactNode | ReactNode[];
}

const ScrollText = ({showLeft, showRight}: {showLeft: boolean, showRight: boolean}) => {
	if (!showLeft && !showRight) return null;

	return (
		<div className='scrollText'>
			<div className={showLeft ? '' : 'hidden'}><FaLongArrowAltLeft/> Scroll for more</div>
			<div className={showRight ? '' : 'hidden'}>Scroll for more <FaLongArrowAltRight/></div>
		</div>
	)
}

const Table = ({children}: TableProps) => {
	const tableRef = useRef<HTMLTableElement>(null);
	const [showScroll, setShowScroll] = useState({left: false, right: false});

	const checkTableSize = useCallback(() => {
		console.log('Checking Table Size', window.innerWidth);
		if (tableRef && tableRef.current) {
			if (tableRef.current.offsetWidth > window.innerWidth) setShowScroll({left: false, right: true});
			else setShowScroll({left: false, right: false});
		}
	}, [tableRef]);

	//When resizing, check the table size again
	useResizeListener(checkTableSize, 200);

	//When first rendering, check the table size
	useLayoutEffect(() => {
		checkTableSize();
	}, [tableRef, checkTableSize]);

	//When scrolling, check which directional arrows need to be displayed, if any.
	const onScroll: React.UIEventHandler<HTMLDivElement> = (e) => {
		if (!showScroll.left && !showScroll.right) return;

		let maxScroll = e.currentTarget.scrollWidth - e.currentTarget.clientWidth;
		let currentScroll = e.currentTarget.scrollLeft;

		if (currentScroll >= maxScroll) setShowScroll(current => ({...current, right: false}));
		else setShowScroll(current => ({...current, right: true}));

		if (currentScroll > 0) setShowScroll(current => ({...current, left: true}));
		else setShowScroll(current => ({...current, left: false}));
	}

	return (
		<StyledTable>
			{ (showScroll.left || showScroll.right) && <ScrollText showLeft={showScroll.left} showRight={showScroll.right}/> }
			<div className='scrollContainer' onScroll={onScroll}>
				<table ref={tableRef}>
					{ children }
				</table>
			</div>
		</StyledTable>
	);
}

export default Table;
