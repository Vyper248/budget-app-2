import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import StyledModal from "./Modal.style";
import { MdClose } from 'react-icons/md';

type ModalProps = {
	onClickClose: ()=>void;
	heading: string;
	children: ReactNode;
	width?: string;
	headingColor?: string;
	color?: string;
	x?: number;
	y?: number;
	center?: boolean;
	reposition?: boolean;
}

const Modal = ({heading, onClickClose, children, width='300px', headingColor='var(--menu-bg-color)', color='var(--text-color)', x=285, y=30, center=false, reposition=false}: ModalProps) => {
	const headerRef = useRef<HTMLHeadingElement>(null);
	const outlineRef = useRef<HTMLDivElement>(null);

	const [startClientX, setStartClientX] = useState(0);
    const [startClientY, setStartClientY] = useState(0);
	const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
	const [xPos, setXPos] = useState(x);
	const [yPos, setYPos] = useState(y);
	const [dragging, setDragging] = useState(false);

	//If centering is needed, then calculate here
	useLayoutEffect(() => {
		if (!outlineRef.current) return;

		if (center) {
			let height = outlineRef.current.offsetHeight;
			let offsetY = window.pageYOffset;
			let scrollY = window.scrollY;
			let newPos = (yPos - height/2) + 20; //move to a centered position
			if (newPos < 30 + offsetY) newPos = 30 + offsetY; //if it then goes off the top, move to 0
			else if (newPos + height + 50 > window.innerHeight + offsetY) newPos = window.innerHeight - height + scrollY; //if it goes off the bottom after moving up, move to bottom
	
			setYPos(newPos);
		}

		if (reposition) {
			let height = outlineRef.current.offsetHeight;
			let offsetY = window.pageYOffset;

			let newPos = yPos;
			if (yPos + height + 50 > window.innerHeight + offsetY) newPos = yPos - height - 40; //if it'll go off the bottom, move above
			if (newPos < 70 + offsetY) newPos = yPos; //if it then goes off the top, then move back down (user can scroll down)
	
			setYPos(newPos);
		}
	}, []);

	const onMouseDown = (e: React.MouseEvent<HTMLHeadingElement, MouseEvent>) => {
		setStartClientX(e.clientX);
        setStartClientY(e.clientY);
        setStartX(xPos);
        setStartY(yPos);
        setDragging(true);
	}

	const onMouseMove = (e: React.MouseEvent<HTMLHeadingElement, MouseEvent>) => {
		if (dragging) {
			if (outlineRef === undefined || outlineRef.current === null) return;
			
			let width = outlineRef.current.offsetWidth;
			let height = outlineRef.current.offsetHeight;
            let xDiff = e.clientX - startClientX;
            let yDiff = e.clientY - startClientY;
            let newX = startX + xDiff;
            let newY = startY + yDiff;

			const pageHeight = Math.max(document.body.scrollHeight, window.innerHeight);

            //prevent going off the side
            if (newY < 30) newY = 30; //should be set to header height
            if (newY > pageHeight-height) newY = pageHeight-height;
            if (newX < 0) newX = 0;
            if (newX > window.innerWidth-width) newX = window.innerWidth-width;
            
            setXPos(newX);
            setYPos(newY);
        }
	}

	const onMouseUp = () => {
		setDragging(false);
	}

	return (
		<StyledModal width={width} headingColor={headingColor} color={color} dragging={dragging} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}>
			<div className='outline' style={{top: yPos, left: xPos}} ref={outlineRef}>
				<h4 ref={headerRef} onMouseDown={onMouseDown}>
					{ heading }
					<button className='closeBtn' onClick={onClickClose}><MdClose/></button>
				</h4>
				<div className='content'>
					{ children }
				</div>
			</div>
		</StyledModal>
	);
}

export default Modal;
