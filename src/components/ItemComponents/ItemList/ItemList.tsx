import StyledItemList from "./ItemList.style";
import { FaEdit } from "react-icons/fa";

import { useResponsive } from "@/utils/customHooks.utils";

import Button from "@/components/Button/Button";
import IconButton from "@/components/IconButton/IconButton";
import ItemDropdownHeading from "@/components/Mobile/ItemDropdownHeading/ItemDropdownHeading";

export type BasicItem = {
	id: number;
	name: string;
	hidden: boolean;
}

type ItemListProps = {
	heading: string;
	items: BasicItem[];
	selectedItemId: number;
	onSelect: (id: number)=>void;
	onEdit: ()=>void;
}

const ItemList = ({heading, items, selectedItemId, onSelect, onEdit}: ItemListProps) => {
	const { isMobile } = useResponsive();

	const onClick = (id: number) => () => {
		onSelect(id)
	}

	const currentItems = items.filter((item: BasicItem) => item.hidden === false);
	const hiddenItems = items.filter((item: BasicItem) => item.hidden === true);

	if (isMobile) return (
		<StyledItemList>
			<ItemDropdownHeading items={currentItems} hiddenItems={hiddenItems} selectedItemId={selectedItemId} onSelect={onSelect} onEdit={onEdit}/>
		</StyledItemList>
	);

	return (
		<StyledItemList>
			<div className='heading'>
				<h4>{heading}</h4>
				<IconButton Icon={FaEdit} onClick={onEdit} fontSize="1.2em" title='Edit Items'/>
			</div>
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