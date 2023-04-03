import StyledItemList from "./ItemList.style";

import Button from "../Button/Button";

type Item = {
	id: number;
	name: string;
	hidden: boolean;
}

type ItemListProps = {
	heading: string;
	items: Item[];
	selectedItemId: number;
	onSelect: (id: number)=>void;
}

const ItemList = ({heading, items, selectedItemId, onSelect}: ItemListProps) => {
	const onClick = (id: number) => () => {
		onSelect(id)
	}

	const currentItems = items.filter((item: Item) => item.hidden === false);
	const hiddenItems = items.filter((item: Item) => item.hidden === true);

	return (
		<StyledItemList>
			<h4>{heading}</h4>
			{
				currentItems.map(obj => {
					return <Button key={obj.id} label={obj.name} onClick={onClick(obj.id)} rounded={false} width='100%' selected={selectedItemId === obj.id}/>
				})
			}
			{ hiddenItems.length > 0 ? <hr/> : null }
			{
				hiddenItems.map(obj => {
					return <Button key={obj.id} label={obj.name} onClick={onClick(obj.id)} rounded={false} width='100%' selected={selectedItemId === obj.id} hidden={true}/>
				})
			}
		</StyledItemList>
	);
}

export default ItemList;
