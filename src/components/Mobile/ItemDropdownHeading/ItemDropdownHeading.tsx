import { FaEdit } from "react-icons/fa";

import StyledItemDropdownHeading from "./ItemDropdownHeading.style";

import Dropdown from "@/components/Dropdown/Dropdown";
import IconButton from "@/components/IconButton/IconButton";

import type { BasicItem } from "@/components/ItemComponents/ItemList/ItemList";

type ItemDropdownHeadingProps = {
	items: BasicItem[];
	hiddenItems: BasicItem[];
	selectedItemId: number;
	onSelect: (id: number)=>void;
	onEdit: ()=>void;
}

const ItemDropdownHeading = ({items, hiddenItems, selectedItemId, onSelect, onEdit}: ItemDropdownHeadingProps) => {
	const onChangeDropdown = (val: string) => {
		onSelect(parseInt(val));
	}

	return (
		<StyledItemDropdownHeading>
			{ selectedItemId !== 0 && <Dropdown width='250px' value={selectedItemId} onChange={onChangeDropdown} options={[{
				value: '',
				label: 'Active',
				options: items.map(item => ({value: item.id, label: item.name}))
			}, {
				value: '',
				label: 'Hidden',
				options: hiddenItems.map(item => ({value: item.id, label: item.name}))
			}]}/> }
			{ selectedItemId !== 0 && <div className='editButton'>
				<IconButton Icon={FaEdit} onClick={onEdit} fontSize='1.5em' title='Edit Items'/>
			</div> }
		</StyledItemDropdownHeading>
	);
}

export default ItemDropdownHeading;
