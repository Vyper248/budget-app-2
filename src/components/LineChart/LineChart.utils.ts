type LineData = {
	label: string;
	income: number;
	realIncome: number;
	realExpense: number;
	expense: number;
	incomeOutlier?: boolean;
	expenseOutlier?: boolean;
}

type PercentData = {
	from: number;
	to: number;
	val: number;
	realVal: number;
	outlier?: boolean;
}

export const removeOutliers = (data: LineData[], key: 'income' | 'expense') => {
	const medianObj = [...data].sort((a, b) => b[key] - a[key])[Math.round(data.length/2)];
	const median = medianObj.income;

	//split outliers and normal points into separate arrays
	const normalData = [] as LineData[];
	const outliers = [] as number[];
	data.forEach(obj => {
		if (obj[key] > -median * 8 && obj[key] < median * 8) normalData.push(obj);
		else outliers.push(obj[key]);
	});

	//calculate the normal average without outliers
	const normalAverage = normalData.reduce((a,c) => {
		return a += c[key];
	}, 0) / normalData.length;

	//use the normal average instead of the actual value
	const newData = data.map(obj => {
		if (outliers.includes(obj[key])) return {...obj, [key]: normalAverage, [`${key}Outlier`]: true};
		return obj;
	});

	return newData;
}

export const getMinMax = (data: LineData[]) => {
	let maxValue = 0;
	let minValue = Infinity;
	data.forEach(obj => {
		if (obj.income > maxValue) maxValue = obj.income;
		if (obj.income < minValue) minValue = obj.income;
		if (obj.expense > maxValue) maxValue = obj.expense;
		if (obj.expense < minValue) minValue = obj.expense;
	});

	maxValue = Math.ceil(maxValue);
	minValue = Math.floor(minValue);
	if (minValue < 200) minValue = 0;

	return [minValue, maxValue];
}

export const getPercentages = (data: LineData[], min: number, max: number) => {
	const padding = Math.round((max - min) / 50);
	const difference = (max - min) + (padding * 2);

	const income = [] as PercentData[];
	const expense = [] as PercentData[];
	data.forEach((obj, i) => {
		const next = data[i+1];
		// if (!next) return [];

		income.push({ 
			from: ((obj.income - min + padding) / difference) * 100, 
			to: next ? ((next.income - min + padding) / difference) * 100 : -1,
			val: obj.income,
			realVal: obj.realIncome,
			outlier: obj.incomeOutlier
		});
		expense.push({ 
			from: ((obj.expense - min + padding) / difference) * 100, 
			to: next ? ((next.expense - min + padding) / difference) * 100 : -1,
			val: obj.expense,
			realVal: obj.realExpense,
			outlier: obj.expenseOutlier
		});
	});

	return [income, expense];
}