import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import StyledScrollText from "./ScrollText.style";
import { FaLongArrowAltRight, FaLongArrowAltLeft } from "react-icons/fa";
import { useResizeListener } from "@/utils/customHooks.utils";

//Element
const ScrollText = ({left, right}: {left: boolean, right: boolean}) => {
	if (!left && !right) return null;

	return (
		<StyledScrollText>
			<div className={left ? '' : 'hidden'}><FaLongArrowAltLeft/> Scroll for more</div>
			<div className={right ? '' : 'hidden'}>Scroll for more <FaLongArrowAltRight/></div>
		</StyledScrollText>
	)
}

//Hook
export const useScrollText = <T extends HTMLElement>(dependencies: any[], scrollRight = false) => {
	const [showScroll, setShowScroll] = useState({left: false, right: false});
	const scrollRef = useRef<T | null>(null);

	const checkScroll = useCallback(() => {
		if (scrollRef && scrollRef.current) {
			let maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
			let currentScroll = scrollRef.current.scrollLeft;
	
			if (currentScroll >= maxScroll) setShowScroll(current => ({...current, right: false}));
			else setShowScroll(current => ({...current, right: true}));
	
			if (currentScroll > 0) setShowScroll(current => ({...current, left: true}));
			else setShowScroll(current => ({...current, left: false}));
		}
	}, [scrollRef]);
	
	//if needed, scroll element to the right
	useEffect(() => {
		if (scrollRef && scrollRef.current) {
			if (scrollRight && scrollRef.current.scrollTo) scrollRef.current.scrollTo({left: 10000});
		}
	}, dependencies);

	//when resizing, check if scroll is needed
	useResizeListener(checkScroll, 200);

	//When first rendering, check the table size
	useLayoutEffect(() => {
		checkScroll();
	}, [scrollRef, checkScroll, ...dependencies]);

	//function to add to onScroll event on element
	const onScroll: React.UIEventHandler<HTMLDivElement> = (e) => {
		if (!showScroll.left && !showScroll.right) return;
		checkScroll();
	}

	return {showScroll, scrollRef, onScroll};
}

export default ScrollText;


