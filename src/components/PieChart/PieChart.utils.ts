type PieData = {
    id: number;
    percentage: string;
    percentageSmall: string;
    value: number;
    label: string;
}

export const getGradient = (data: PieData[], colors: string[], selectedColor='') => {
    const grayColors = ['#4D4D4D', '#A1A1A1', '#686868', '#2C2C2C', '#595959', '#535353', '#797979', '#BBBBBB', '#D2D2D2', '#B9B9B9', '#DFDFDF', '#ABABAB', '#6A6A6A', '#222222', '#070707', '#C6C6C6', '#E5E5E5', '#D4D4D4', '#B2B2B2', '#9F9F9F'];

    let percentages = data.map(obj => obj.percentage);
    let pieString = 'conic-gradient(';
    let currentPercent = 0;

    percentages.forEach((percent,i) => {
        let color = colors[i%colors.length];
        let grayColor = grayColors[i%grayColors.length];
        let nextPercent = currentPercent + parseFloat(percent);
        if (selectedColor.length === 0 || selectedColor === color) pieString += `${color} ${currentPercent.toFixed(2)}%, ${color} ${nextPercent.toFixed(2)}%, `;
        else pieString += `${grayColor} ${currentPercent.toFixed(2)}%, ${grayColor} ${nextPercent.toFixed(2)}%, `;
        currentPercent = nextPercent;
    });

    pieString = pieString.slice(0,-2);
    pieString += ')';

    return pieString;
}

export const getPercentages = (data: {value: number, label: string}[]) => {
    let total = data.reduce((a,c) => {
        return a + c.value;
    }, 0);

    let mappedData = data.map((obj, i) => {
        let newObj = {...obj} as PieData;
        newObj.id = i;
        newObj.percentage = (obj.value / total * 100).toFixed(3);
        newObj.percentageSmall = (obj.value / total * 100).toFixed(1);
        return newObj;
    });

    return mappedData;
}