import StyledIconButton from "./IconButton.style";

import type { IconType } from "react-icons";

type IconButtonProps = {
	Icon: IconType;
	fontSize?: string;
	color?: string;
	onClick: ()=>void;
	cursor?: string;
	[key: string]: any;
}

const IconButton = ({Icon, fontSize='1em', color='var(--text-color)', onClick, cursor='pointer', ...props}: IconButtonProps) => {
	return (
		<StyledIconButton onClick={onClick} cursor={cursor} {...props}>
			<Icon style={{fontSize, color}}/>
		</StyledIconButton>
	);
}

export default IconButton;
