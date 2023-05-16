import type { Transaction } from "@/redux/transactionsSlice";
import type { Item } from "@/redux/generalSlice";

export const getInUseObj = (transactions: Transaction[]) => {
	const inUseObj = {} as {[key: number]: boolean};
	
	transactions.forEach(transaction => {
		if (transaction.type === 'spend'){
			if (transaction.category !== undefined) inUseObj[transaction.category] = true;
			if (transaction.fund !== undefined) inUseObj[transaction.fund] = true;
			inUseObj[transaction.account] = true;
		} else if (transaction.type === 'fundAddition') {
			inUseObj[transaction.fund] = true;
		} else if (transaction.type === 'transfer') {
			inUseObj[transaction.from] = true;
			inUseObj[transaction.to] = true;
		}
	});

	return inUseObj;
}

export const mapArrayToMoveableArray = (array: Item[], inUseObj: {[key: number]: boolean}) => {
	return array.map((item) => ({id: item.id, item: item, inUse: inUseObj[item.id] ? true : false}));
}