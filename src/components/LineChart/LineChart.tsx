import { Fragment, useState } from "react";
import StyledLineChart from "./LineChart.style";

import { parseCurrency } from "@/utils/transactions.utils";
import { formatMonthYear } from "@/utils/date.utils";
import { removeOutliers, getMinMax, getPercentages } from "./LineChart.utils";

import Grid from "../styled/Grid";
import ScrollText, { useScrollText } from "../ScrollText/ScrollText";

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

type LineChartProps = {
	data: LineData[];
}

const Line = ({start, gap, index, color, data}: 
	{start: number, gap: number, index: number, color: string, data: PercentData}) => {
	return <line 
		className='line' 
		x1={`${start + index * gap}%`} 
		y1={`${100-data.from}%`} 
		x2={`${start + gap + index * gap}%`} 
		y2={`${100-data.to}%`} 
		stroke={color}
	/>
}

const Circle = ({start, gap, index, color, data, onEnter, onLeave}: 
	{start: number, gap: number, index: number, color: string, data: PercentData, onEnter: (e: React.MouseEvent<SVGCircleElement>)=>void, onLeave: ()=>void}) => {
	return 	<circle 
		className='point'
		data-val={data.outlier ? data.realVal : data.val} 
		cx={`${start + index * gap}%`} 
		cy={`${100-data.from}%`} 
		r='5' 
		stroke={data.outlier ? 'red' : color} 
		fill={data.outlier ? 'red' : color} 
		onMouseEnter={onEnter} 
		onMouseLeave={onLeave}
	/>
}

const LineChart = ({data}: LineChartProps) => {
	const [popupData, setPopupData] = useState({left: '0', top: '0', transform: '', val: 0});
	const [hideOutliers, setHideOutliers] = useState(false);

	const {showScroll, scrollRef, onScroll} = useScrollText<HTMLDivElement>([data], true);

	if (!data) return null;
	if (data.length < 2) return null;

	let newData = data;

	//check for outliers
	if (hideOutliers) {
		newData = removeOutliers(newData, 'income');
		newData = removeOutliers(newData, 'expense');
	}

	//get the x position values for points and labels
	const gap = 100 / newData.length;
	const start = gap / 2;

	const [minValue, maxValue] = getMinMax(newData);
	const [incomePercentages, expensePercentages] = getPercentages(newData, minValue, maxValue);

	//get evenly split values between min and max values
	const valueDiff = (maxValue - minValue) / 9;
	const values = new Array(10).fill(0).map((_, i) => Math.round(minValue + (i * valueDiff))).reverse();

	const mouseEnter = (e: React.MouseEvent<SVGCircleElement>) => {
		//calculate adjustments based on position to make sure it's not within hidden overlap
		let topVal = e.currentTarget.cy.baseVal.value; //px value
		let transformTop = '-100%';
		let adjustTop = '-10px';
		if (topVal < 40) {
			transformTop = '50%';
			adjustTop = '-5px';
		}

		let leftVal = e.currentTarget.cx.baseVal.valueInSpecifiedUnits; //percent value, don't always know width of container
		let transformLeft = '-50%';
		if (leftVal < 10) {
			transformLeft = '0%';
		}

		if (leftVal > 90) {
			transformLeft = '-100%';
		}

		setPopupData({
			left: e.currentTarget.cx.baseVal.valueAsString, 
			top: e.currentTarget.cy.baseVal.valueAsString,
			transform: `translate(${transformLeft}, ${transformTop}) translate(0px, ${adjustTop})`,
			val: parseFloat(e.currentTarget.dataset.val || '0')
		});
	}

	const mouseLeave = () => {
		setPopupData({ left: '0', top: '0', transform: '', val: 0 });
	}

	const onChangeHideOutliers = () => {
		setHideOutliers(a => !a);
	}

	let chartWidth = newData.length * 25;
	if (chartWidth < 600) chartWidth = 600;

	return (
		<StyledLineChart minWidth={chartWidth}>
			<Grid template="120px 1fr 120px" margin="0px">
				<div></div>
				<h4>Income vs Expenses</h4>
				<div style={{display: 'flex', alignItems: 'center', margin: '15px auto 10px'}}><label>Hide Outliers</label><input type='checkbox' checked={hideOutliers} onChange={onChangeHideOutliers}/></div>
			</Grid>
			<ScrollText left={showScroll.left} right={showScroll.right}/>
			<div className='chart' ref={scrollRef} onScroll={onScroll}>
				<div className='numbers'>
				{
					values.map(val => <div key={`val-${val}`} className='number'>{parseCurrency(val, true)}</div>)
				}
				</div>
				<div className='lineChart'>
					{ 	//Amount Popup
						popupData.left !== '0' && <div className='popup' style={{left: popupData.left, top: popupData.top, transform: popupData.transform}}>{parseCurrency(popupData.val)}</div> 
					}
					{	//Labels
						newData.map((data, i) => {
							return <div key={data.label} className='label' style={{left: `${start + i * gap}%`}}>{formatMonthYear(data.label)}</div>
						})
					}
					<svg height='100%' width='100%'>
						{	// horizontal lines
							values.map((_, i) => {
								const y = ((100 - 4)/9 * i) + 2;
								return <line key={`line-${y}`} x1='0%' y1={`${y}%`} x2='100%' y2={`${y}%`} stroke='var(--text-color)' opacity={0.3}/>
							})
						}

						{	//Income data
							incomePercentages.map((data, index) => {
								const svgData = { start, gap, data, index, color: 'green' };
								return (
									<Fragment key={`income-${index}`}>
										{ data.to !== -1 && <Line {...svgData}/>}
										<Circle {...svgData} onEnter={mouseEnter} onLeave={mouseLeave}/>
									</Fragment>
								);
							})
						}

						{	//Expense Data
							expensePercentages.map((data, index) => {
								const svgData = { start, gap, data, index, color: 'darkorange' };
								return (
									<Fragment key={`expense-${index}`}>
										{ data.to !== -1 && <Line {...svgData}/> }
										<Circle {...svgData} onEnter={mouseEnter} onLeave={mouseLeave}/>
									</Fragment>
								);
							})
						}
					</svg>
				</div>
			</div>
		</StyledLineChart>
	);
}

export default LineChart;
