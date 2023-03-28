import { ReactNode, useEffect, useRef, useState } from "react";
import StyledModal from "./Modal.style";
import { MdClose } from 'react-icons/md';

type ModalProps = {
	onClickClose: ()=>void;
	heading: string;
	children: ReactNode;
	width?: string;
	headingColor?: string;
	x?: number;
	y?: number;
}

const Modal = ({heading, onClickClose, children, width='300px', headingColor='var(--menu-bg-color)', x=0, y=0}: ModalProps) => {
	const headerRef = useRef<HTMLHeadingElement>(null);
	const outlineRef = useRef<HTMLDivElement>(null);

	const [startClientX, setStartClientX] = useState(0);
    const [startClientY, setStartClientY] = useState(0);
	const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
	const [xPos, setXPos] = useState(x);
	const [yPos, setYPos] = useState(y);
	const [dragging, setDragging] = useState(false);

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

            //prevent going off the side
            if (newY < 40) newY = 40; //should be set to header height
            if (newY > window.innerHeight-height) newY = window.innerHeight-height;
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
		<StyledModal width={width} headingColor={headingColor} dragging={dragging} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}>
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
