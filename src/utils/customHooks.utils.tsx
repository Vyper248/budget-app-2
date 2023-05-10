import { useEffect, useRef } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setSelectedItem } from "@/redux/generalSlice";

import { Item } from "@/redux/generalSlice";

type ReturnType = [Item | undefined, (val: number) => void];

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