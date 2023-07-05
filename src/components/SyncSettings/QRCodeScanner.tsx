import { useEffect, useLayoutEffect, useRef, useState } from "react";
import QrScanner from 'qr-scanner';

import Grid from "../styled/Grid";
import Button from "../Button/Button";
import Input from "../Input/Input";

const QRCodeScanner = ({ onFinish, onCancel }: { onFinish: (val: string) => void, onCancel: () => void }) => {
	const [manualQRCode, setManualQRCode] = useState('');
	const video = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		if (video.current) {
            //when scanner opens, scroll to the bottom
            window.scrollTo({ top: 10000 });

			const qrScanner = new QrScanner(video.current, (result) => handleScan(result), {
				highlightScanRegion: true,
				maxScansPerSecond: 4,
				onDecodeError: () => { }
			});
			qrScanner.start();

            //make sure the scanner is stopped when the element is unmounted
            return () => {
                qrScanner.stop();
                qrScanner.destroy();
            }
		}
		// Dependency array missing handleScan, since it should not set Scanner on handleScan change
		// eslint-disable-next-line
	}, [video]);

	const onChangeManualCode = (val: string) => {
		setManualQRCode(val);
	}

	const onUseManual = () => {
		if (manualQRCode.length === 0) return;

		onFinish(manualQRCode);
	}

	const handleScan = (result: QrScanner.ScanResult) => {
		if (result.data) {
			onFinish(result.data);
		}
	}

	const onClickCancel = () => {
		onCancel();
	}

	return (
		<div>
			<div>Scan the QR code or enter manually</div>
			<video ref={video}></video>
			<Grid template="180px 50px 80px" width='fit-content'>
				<Input value={manualQRCode} onChange={onChangeManualCode} />
				<Button label='Go' onClick={onUseManual} />
				<Button label='Cancel' onClick={onClickCancel} />
			</Grid>
		</div>
	);
}

export default QRCodeScanner;