import { useState } from "react";
import type { ReactNode } from "react";
import StyledConfirmationContainer from "./ConfirmationContainer.style";

import { useClickOutside } from "@/utils/customHooks.utils";

import Button from "@/components/Button/Button";

type ConfirmationContainerProps = {
	onClick: ()=>void;
	children: ReactNode;
	position?: 'top' | 'bottom' | 'left' | 'right';
}

const ConfirmationContainer = ({onClick, position='top', children}: ConfirmationContainerProps) => {
	const [open, setOpen] = useState(false);
	const ref = useClickOutside(() => {
		onClickCancel();
	}, open);

	const onClickContainer = () => {
		setOpen(true);
	}

	const onClickConfirm = () => {
		setOpen(false);
		onClick();
	}

	const onClickCancel = () => {
		setOpen(false);
	}

	return (
		<StyledConfirmationContainer ref={ref} onClick={open ? ()=>{} : onClickContainer}>
			{ open && <div className={`popup ${position}`}>
				<Button label='Confirm' onClick={onClickConfirm} width='70px'/>
				<Button label='Cancel' onClick={onClickCancel} width='70px'/>
			</div> }
			{ children }
		</StyledConfirmationContainer>
	);
}

export default ConfirmationContainer;
