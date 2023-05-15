import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { FiMove } from 'react-icons/fi';

import Grid from "@/components/styled/Grid";
import IconButton from "@/components/IconButton/IconButton";
import ConfirmationContainer from "@/components/ConfirmationContainer/ConfirmationContainer";

export const LabelledText = ({label, value}: {label: string, value: string}) => {
	if (value.length === 0) value = 'None';

	return (
		<div className='labelledText'>
			<label>{label}:</label>
			<span style={{textTransform: 'capitalize'}}>{value}</span>
		</div>
	);
}

export const ItemTemplate = ({name, description, inUse, onClickEdit, onClickDelete}: {name: string, description: string, inUse: boolean, onClickEdit: ()=>void, onClickDelete: ()=>void}) => {
	return (
		<>
			<Grid template={'auto 25px 25px 25px'} width='100%'>
				<h4>{name}</h4>
				<IconButton Icon={FiMove} fontSize='1.5em' onClick={()=>{}} className='drag-handle' cursor='move' title='Move Item'/>
				<IconButton Icon={FaEdit} fontSize='1.5em' onClick={onClickEdit} title='Edit Item'/>
				{ inUse  
					? <IconButton Icon={FaTrashAlt} fontSize='1.5em' color={'gray'} onClick={()=>{}} cursor='default' title="Can't be deleted while in use"/>
					: <ConfirmationContainer onClick={inUse ? ()=>{} : onClickDelete} position='left'>
						  <IconButton Icon={FaTrashAlt} fontSize='1.5em' color='red' onClick={()=>{}} title='Delete Item'/>
					  </ConfirmationContainer> 
				}
			</Grid>
			<span>{description.length > 0 ? description : ''}</span>
		</>
	);
}