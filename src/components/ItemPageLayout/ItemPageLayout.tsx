import { ReactNode } from "react";
import StyledItemPageLayout from "./ItemPageLayout.style";

type ItemPageLayoutProps = {
	children: ReactNode[];
}

const ItemPageLayout = ({children}: ItemPageLayoutProps) => {
	return (
		<StyledItemPageLayout>
			{ children }
		</StyledItemPageLayout>
	);
}

export default ItemPageLayout;