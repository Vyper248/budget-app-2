import { useState } from "react";
import StyledPieChart from "./PieChart.style";

import { getPercentages, getSVGData } from "./PieChart.utils";
import { useResponsive } from "@/utils/customHooks.utils";

type PieChartProps = {
	data: {
		value: number;
		label: string;
	}[];
	heading?: string;
	width?: number;
}

const PieChart = ({heading='', data, width=600}: PieChartProps) => {
    const [selected, setSelected] = useState(-1);
    const { isMobile } = useResponsive();

    let pieWidth = width-200;

    let mappedData = getPercentages(data);

    if (mappedData.length === 0) return (
        <div>
            <h4>{heading}</h4>
            <div className='centered'>No data to display</div>
        </div>
    );

    const onClickPath = (id: number) => () => {
        if (id === selected) setSelected(-1);
        else setSelected(id);
	}

    const { pieData, selectedData, colors } = getSVGData(mappedData, selected, isMobile);

    return (
        <StyledPieChart labelWidth={200+'px'} pieWidth={pieWidth+'px'} selected={selected}>
            <h4>{heading}</h4>
            <div id='container'>
                <div id='pie'>
                    <svg width='400' height='400'>
                        { pieData.map(data => <path key={data.id} {...data} onClick={onClickPath(data.dataid)}></path>) }
                        { selectedData && <path {...selectedData} onClick={onClickPath(selectedData.dataid)}></path> }
                    </svg>
                </div>
                <div id='labels'>
                    {
                        mappedData.map((obj,i) => {
                            let color = colors[i%colors.length];
                            const border = selected === obj.id ? '1px solid var(--text-color)' : '';
                            return (
                                <div key={i} id='label'>
                                    <div title={obj.percentageSmall+'%'} id='color' style={{backgroundColor: color, border}} onClick={onClickPath(obj.id)}></div>
                                    <div title={obj.percentageSmall+'%'} id='text'>{obj.label} <span>{`(${obj.value < 0 ? '-' : ''}${obj.percentageSmall}%)`}</span></div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </StyledPieChart>
    );
}

export default PieChart;
