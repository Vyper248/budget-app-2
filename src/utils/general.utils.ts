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