import StyledTable from "./Table.style";

import type { ReactNode } from "react";

type TableProps = {
	children: ReactNode | ReactNode[];
}

const Table = ({children}: TableProps) => {
	return (
		<StyledTable>
			<table>
				 { children }
			</table>
		</StyledTable>
	);
}

export default Table;
