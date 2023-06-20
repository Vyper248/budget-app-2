import { useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setSelectedItem, setSelectedTotal } from "@/redux/generalSlice";

import type { Item } from "@/redux/generalSlice";
import type { Transaction } from "@/redux/transactionsSlice";
import type { TransactionDisplay } from "./summary.utils";

type ReturnType = [Item | undefined, (val: number) => void];

type DataObj = {
	[key: string]: {
        [key: number]: TransactionDisplay;
    };
}

export const useItemObj = (selectedItem: number, arr: Item[]): ReturnType => {
    const itemObj = arr.find(obj => obj.id === selectedItem);
    const dispatch = useAppDispatch();

	useEffect(() => {
		//make sure the first item is selected
		if (selectedItem === 0 && arr.length > 0) {
			dispatch(setSelectedItem(arr[0].id));
		}
	}, []);

    const onSelectItem = (val: number) => {
        dispatch(setSelectedItem(val));
    }
    
    return [itemObj, onSelectItem];
}

export const useClickOutside = (callback: ()=>void, open: boolean) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onClickOutside = (e: MouseEvent) => {
            let target = e.target as Node;
            if (ref.current && !ref.current.contains(target)) {
                if (open) callback();
            }
        }

        document.addEventListener('click', onClickOutside);
        return () => {
            document.removeEventListener('click', onClickOutside);
        }
    }, [open, callback]);

    return ref;
}

export const useTransactionUpdate = (dataObj: DataObj, transactions: Transaction[]) => {
    const dispatch = useAppDispatch();
    const selectedTotal = useAppSelector(state => state.general.selectedTotal);

    useEffect(() => {
		if (!selectedTotal) return;
		const displayObj = dataObj[selectedTotal.date][selectedTotal.itemId];
		dispatch(setSelectedTotal({...selectedTotal, transactions: displayObj.transactions}));
	}, [transactions]);
}

export const useResponsive = () => {
    const isMobile = useMediaQuery({ maxWidth: 700 });

    return { isMobile };
}

export const useResizeListener = (callback: ()=>void, time: number) => {
    useEffect(() => {
        let timeout = null as NodeJS.Timeout | null;

        let resizeListener = () => {
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(callback, time);
        }
        
        window.addEventListener('resize', resizeListener);

        return () => {
            window.removeEventListener('resize', resizeListener);
        }
    }, [callback, time]);
}