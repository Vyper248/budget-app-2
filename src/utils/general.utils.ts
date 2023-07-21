import { Category } from "@/redux/categoriesSlice";

type ObjectWithName = {
	id: number;
	name: string;
}

export const getObjectName = (id: number | undefined, objects: ObjectWithName[], addition?: string) => {
	let foundObj = objects.find(obj => obj.id === id);

	if (foundObj !== undefined) return addition !== undefined ? foundObj.name + addition : foundObj.name;
	else return '';
}

export const joinStrings = (joiner: string, ...strings: string[]) => {
	return strings.flatMap(str => str.length > 0 ? str : []).join(joiner);
}

export const changeColourScheme = (scheme: string) => {
    let root = document.documentElement;

    if (scheme === 'dark') {
        root.style.setProperty('--bg-color', '#222');
        root.style.setProperty('--text-color', 'white');
        root.style.setProperty('--light-text-color', '#CCC');
		root.style.setProperty('--text-color-warning', 'red');
		root.style.setProperty('--text-color-positive', 'lightgreen');
        root.style.setProperty('--icon-color', '#4dc6ff');

        root.style.setProperty('--menu-bg-color', '#009fe8');
        root.style.setProperty('--menu-selected-bg-color', '#0076ad');
        root.style.setProperty('--menu-text-color', 'white');
        root.style.setProperty('--menu-selected-text-color', 'white');
        root.style.setProperty('--menu-border-color', '#BBB');
        
        root.style.setProperty('--footer-bg', '#222');
        root.style.setProperty('--footer-border', '#009fe8');
        
        root.style.setProperty('--table-heading-bg-color', '#009fe8');
        root.style.setProperty('--table-heading-text-color', 'white');
        
        root.style.setProperty('--obj-highlight-bg', '#444');
        root.style.setProperty('--obj-highlight-text', 'white');

        root.style.setProperty('--mild-highlight', '#333');
		root.style.setProperty('--chrome-calendar-icon', 'invert(1)');
    }

    if (scheme === 'black') {
        root.style.setProperty('--bg-color', 'black');
        root.style.setProperty('--text-color', 'white');
        root.style.setProperty('--light-text-color', '#CCC');
		root.style.setProperty('--text-color-warning', 'red');
		root.style.setProperty('--text-color-positive', 'lightgreen');
        root.style.setProperty('--icon-color', '#4dc6ff');

        root.style.setProperty('--menu-bg-color', '#009fe8');
        root.style.setProperty('--menu-selected-bg-color', '#0076ad');
        root.style.setProperty('--menu-text-color', 'white');
        root.style.setProperty('--menu-selected-text-color', 'white');
        root.style.setProperty('--menu-border-color', '#BBB');
        
        root.style.setProperty('--footer-bg', 'black');
        root.style.setProperty('--footer-border', '#009fe8');
        
        root.style.setProperty('--table-heading-bg-color', '#009fe8');
        root.style.setProperty('--table-heading-text-color', 'white');

        root.style.setProperty('--obj-highlight-bg', '#444');
        root.style.setProperty('--obj-highlight-text', 'white');

        root.style.setProperty('--mild-highlight', '#222');
		root.style.setProperty('--chrome-calendar-icon', 'invert(1)');
    }

    if (scheme === 'light') {
        root.style.setProperty('--bg-color', 'white');
        root.style.setProperty('--text-color', 'black');
        root.style.setProperty('--light-text-color', '#555');
		root.style.setProperty('--text-color-warning', 'red');
		root.style.setProperty('--text-color-positive', 'green');
        root.style.setProperty('--icon-color', 'black');

        root.style.setProperty('--menu-bg-color', '#009fe8');
        root.style.setProperty('--menu-selected-bg-color', '#0076ad');
        root.style.setProperty('--menu-text-color', 'white');
        root.style.setProperty('--menu-selected-text-color', 'white');
        root.style.setProperty('--menu-border-color', 'black');
        
        root.style.setProperty('--footer-bg', 'white');
        root.style.setProperty('--footer-border', 'black');
        
        root.style.setProperty('--table-heading-bg-color', '#AAA');
        root.style.setProperty('--table-heading-text-color', 'black');

        root.style.setProperty('--obj-highlight-bg', '#CCC');
        root.style.setProperty('--obj-highlight-text', 'black');

        root.style.setProperty('--mild-highlight', '#EEE');
		root.style.setProperty('--chrome-calendar-icon', 'invert(0)');
    }
}

export const getStartingBalance = (item: Category | undefined) => {
    if (item === undefined) return 0;
    if (item.startingBalance === undefined) return 0;
    if (item.type === 'income') return item.startingBalance;
    return -item.startingBalance;
}