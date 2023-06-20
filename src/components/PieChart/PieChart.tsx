import { useState } from "react";
import StyledPieChart from "./PieChart.style";

import { getPercentages, getGradient } from "./PieChart.utils";

type PieChartProps = {
	data: {
		value: number;
		label: string;
	}[];
	heading?: string;
	width?: number;
}

const PieChart = ({heading='', data, width=600}: PieChartProps) => {
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedVisible, setSelectedVisible] = useState(false);

    const onClickColor = (color: string) => () => {
        setSelectedColor(color);
        if (selectedColor.length === 0) setSelectedVisible(true);
        else if (color === selectedColor && selectedVisible) setSelectedVisible(false);
        else if (color === selectedColor && !selectedVisible) setSelectedVisible(true);
        else if (color !== selectedColor) setSelectedVisible(true);
    }

    const onClickChart = () => {
        setSelectedVisible(false);
    }

    const colors = ['#8b0000','#ff0000','#b03060','#008b8b','#9acd32','#00ff00','#00d89a','#00ffff','#00bfff','#4169e1','#0000ff','#00006a','#d8bfd8','#eee8aa','#ffd700','#ffa07a','#ff8c00','#6a3d9a','#ee82ee','#ff00ff'];
    let labelWidth = 200;
    let pieWidth = width-labelWidth;

    let mappedData = getPercentages(data);
    let gradient = getGradient(mappedData, colors);
    let gradientSingle = getGradient(mappedData, colors, selectedColor);

    if (mappedData.length === 0) return (
        <div>
            <h4>{heading}</h4>
            <div className='centered'>No data to display</div>
        </div>
    );

    return (
        <StyledPieChart labelWidth={labelWidth+'px'} pieWidth={pieWidth+'px'} gradient={gradient} gradientTwo={gradientSingle} selectedVisible={selectedVisible}>
            <h4>{heading}</h4>
            <div id='container'>
                <div id='pie' onClick={onClickChart}></div>
                <div id='labels'>
                    {
                        mappedData.map((obj,i) => {
                            let color = colors[i%colors.length];
                            return (
                                <div key={i} id='label'>
                                    <div title={obj.percentageSmall+'%'} id='color' style={{backgroundColor: color}} onClick={onClickColor(color)}></div>
                                    <div title={obj.percentageSmall+'%'} id='text'>{obj.label} <span>{`(${obj.percentageSmall}%)`}</span></div>
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
