import {screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import TransactionGroups from "./TransactionGroups";

import { render } from "../../utils/test.utils";

it("Loads element without crashing", () => {
	const mockMonthlyTransactions = [
		{
			month: 'January',
			transactions: [
				{
					runningBalance: 0,
					transaction: {
						id: 1,
						amount: 10,
						date: '2021-01-01',
						updated: 12,
						type: 'fundAddition' as 'fundAddition',
						description: 'Test',
						fund: 2
					}
				}
			]
		}
	];

	render(<TransactionGroups monthlyTransactions={mockMonthlyTransactions}/>);
});
