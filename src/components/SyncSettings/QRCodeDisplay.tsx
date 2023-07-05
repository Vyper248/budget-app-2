import { useEffect } from "react";
import QRCode from 'react-qr-code';
import { FaCopy } from "react-icons/fa";

import Button from "../Button/Button";
import IconButton from "../IconButton/IconButton";

const QRCodeDisplay = ({ uniqueId, onCancelSync }: { uniqueId: string, onCancelSync: () => void }) => {
	useEffect(() => {
        //when code display opens, scroll to the bottom
		window.scrollTo({ top: 10000 });
	}, []);

	const onClickManualCodeCopy = () => {
		try {
			navigator.clipboard.writeText(uniqueId);
		} catch (err) {
			alert("Can only copy over https.");
			console.log('Can\'t copy on an unsecure server.');
		}
	}

	return (
		<div id='qrCode'>
			<QRCode value={uniqueId} size={300} />
			<div id='qrCodeValue'>{uniqueId} <IconButton Icon={FaCopy} onClick={onClickManualCodeCopy}/></div>
			<div>
				Scan the QR code on the device you want to sync with, or enter the above number.
			</div>
			<Button label='Cancel' onClick={onCancelSync} />
		</div>
	);
}

export default QRCodeDisplay;