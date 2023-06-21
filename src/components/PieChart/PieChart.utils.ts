type PieData = {
    id: number;
    percentage: number;
    percentageSmall: string;
    value: number;
    label: string;
}

type PathData = {
    id: string;
    dataid: number;
    d: string;
    fill: string;
    stroke: string;
    strokeWidth: string;
}

export const getPercentages = (data: {value: number, label: string}[]) => {
    let total = data.reduce((a,c) => {
        return a + Math.abs(c.value);
    }, 0);

    let mappedData = data.flatMap((obj, i) => {
        let newObj = {...obj} as PieData;
        const value = Math.abs(obj.value);
        newObj.id = i;
        newObj.percentage = (value / total * 100);
        newObj.percentageSmall = (value / total * 100).toFixed(1);

        if (newObj.percentageSmall === '0.0') return [];
        if (newObj.value === 0) return [];
        return newObj;
    });

    return mappedData;
}

//Credit for path functions (with some changes) - https://stackoverflow.com/a/18473154 =======
export const polarToCartesian = (center: number, radius: number, angleInDegrees: number) => {
	const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

	return {
		x: center + (radius * Math.cos(angleInRadians)),
		y: center + (radius * Math.sin(angleInRadians))
	};
}

export const describeArc = (center: number, radius: number, startAngle: number, endAngle: number) => {
	const start = polarToCartesian(center, radius, endAngle);
	const end = polarToCartesian(center, radius, startAngle);

	const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

	const d = [
		"M", start.x, start.y,
		"L", center, center,
		"M", start.x, start.y,
		"A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
		"L", center, center
	].join(" ");

	return d;
}
//============================================================================================

export const getSVGData = (data: PieData[], selected: number, isMobile: boolean) => {
    const colors = ['#8b0000','#ff0000','#b03060','#008b8b','#9acd32','#00ff00','#00d89a','#00ffff','#00bfff','#4169e1','#0000ff','#00006a','#d8bfd8','#eee8aa','#ffd700','#ffa07a','#ff8c00','#6a3d9a','#ee82ee','#ff00ff'];

    let currentAngle = 0;
    let selectedData = null as PathData | null;

    const pieData = data.flatMap((obj, i) => {
        const percentage = obj.percentage;
        const angle = (360/100) * percentage;
        const start = currentAngle;
        const end = currentAngle + angle;
        currentAngle = end;
        
        const pieSize = isMobile ? 175 : 200;
        const pathSize = obj.value < 0 ? pieSize - 22 : pieSize - 2; //if negative value, make segment smaller

        const pathData: PathData = {
            id: `path${obj.id}`,
            dataid: obj.id,
            d: describeArc(pieSize, pathSize, start, end),
            fill: colors[i%colors.length],
            stroke: obj.id === selected ? 'var(--text-color)' : '',
            strokeWidth: '0.8',
        }
        
        //if it's selected, leave out of this array and return as separate obj
        if (obj.id === selected) {
            selectedData = pathData;
            return [];
        }

        return pathData;
    });

    return { pieData, selectedData, colors };
}