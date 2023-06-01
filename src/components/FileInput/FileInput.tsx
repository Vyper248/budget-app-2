import { useRef, useState } from "react";
import StyledFileInput from "./FileInput.style";

import { convertOldData } from "../BackupRestore/BackupRestore.utils";

import Button from "../Button/Button";

import type { BackupData } from "../BackupRestore/BackupRestore";

type FileInputProps = {
	label: string;
	onChange: (obj: any)=>void;
	onSubmit: ()=>void;
}

const FileInput = ({label, onChange, onSubmit}: FileInputProps) => {
	const fileInput = useRef<HTMLInputElement>(null);
	const [fileName, setFileName] = useState('Choose a File');

	const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : undefined;
        if (file === undefined) return;

        if (file.type.match('application/json')) {
            const reader = new FileReader();
			setFileName(file.name);

            reader.onload = () => {
                let text = reader.result;
				if (!text) return;

                let obj = JSON.parse(text as string);
				onChange(obj);
            }

            reader.readAsText(file);
        } else {
			onChange(null);
			setFileName('Incorrect File Type');
        }
    }

	const onClickSubmit = () => {
		if (fileInput.current) fileInput.current.value = '';
		setFileName('Choose a File');
		onSubmit();
	}

	const uniqueId = 'fileUpload-' + Math.floor(Math.random() * 100);

	return (
		<StyledFileInput>
			<input type='file' id={uniqueId} onChange={onFileChange} ref={fileInput} data-testid="file-input"/>
			<label id='filename' htmlFor={uniqueId}>{fileName}</label>
			<Button label={label} onClick={onClickSubmit} disabled={fileName === 'Choose a File' || fileName === 'Incorrect File Type'}/>
		</StyledFileInput>
	);
}

export default FileInput;
