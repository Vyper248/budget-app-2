import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import StyledPopoutMessage from "./PopoutMessage.style";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import IconButton from "../IconButton/IconButton";
import { setMessage } from "@/redux/generalSlice";

const PopoutMessage = () => {
	const dispatch = useAppDispatch();
	const [hidden, setHidden] = useState(false);
	const message = useAppSelector(state => state.general.message);

	//Make sure it displays again when a new message is sent
	//Hide after 5 seconds
	useEffect(() => {
		let timeout: NodeJS.Timeout | null = null;
		if (message.text.length > 0) {
			setHidden(false);
			timeout = setTimeout(() => {
				onClickClose();
			}, 5000);
		}

		return () => {
			if (timeout) clearTimeout(timeout);
			timeout = null;
		}
	}, [message]);

	const onClickClose = () => {
		setHidden(true);
		setTimeout(() => {
			dispatch(setMessage({text: '', type: ''}));
		}, 300);
	}

	const classes = [];
	if (message.text.length > 0 && !hidden) classes.push('display');
	if (message.type === 'error') classes.push('error');
	else if (message.type === 'success') classes.push('success');

	return (
		<StyledPopoutMessage className={classes.join(' ')}>
			<p>{ message.text }</p>
			<div className='closeBtn'>
				<IconButton Icon={MdClose} onClick={onClickClose} title='Close Message'/>
			</div>
		</StyledPopoutMessage>
	);
}

export default PopoutMessage;
