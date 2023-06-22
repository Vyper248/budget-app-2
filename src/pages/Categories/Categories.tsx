import { memo } from "react";
import { useAppSelector } from "@/redux/hooks";
import { selectCategories } from "@/redux/categoriesSlice";

import ItemPage from "@/components/ItemComponents/ItemPage/ItemPage";

import type { Transaction } from "@/redux/transactionsSlice";

const Categories = () => {
    const categories = useAppSelector(selectCategories);
    const selectedItem = useAppSelector(state => state.general.selectedItem);

    const filter = (tr: Transaction) => {
        if (tr.type === 'spend' && tr.category === selectedItem) return true;
		return false;
    } 

    let categoryObj = categories.find(obj => obj.id === selectedItem);

    let totalText = 'Total Earned';
    if (categoryObj && categoryObj.type === 'expense') {
        totalText = 'Total Spent';
    }

    return (
        <ItemPage heading='Categories' type='category' items={categories} trFilter={filter} totalTextLabel={totalText}/>
    );
}

export default memo(Categories);