import { useState } from "react";

import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import Dropdown from "@/components/Dropdown/Dropdown";

import type { Account } from "@/redux/accountsSlice";
import type { Category } from "@/redux/categoriesSlice";
import type { Fund } from "@/redux/fundsSlice";
import ToggleInput from "@/components/ToggleInput/ToggleInput";

export const AccountsForm = ({item, onComplete}: {item?: Account, onComplete: (partialObj: Partial<Account>)=>void}) => {
    const [defaultAccount, setDefaultAccount] = useState(item?.defaultAccount || false);
    const [extraCharges, setExtraCharges] = useState(item?.extraCharges || 0);
    const [interestRate, setInterestRate] = useState(item?.interestRate || 0);

    const onChangeDefault = (value: boolean) => setDefaultAccount(value);
    const onChangeExtraCharges = (value: string) => setExtraCharges(parseFloat(value));
    const onChangeInterestRate = (value: string) => setInterestRate(parseFloat(value));

    const onSave = () => {
        onComplete({
            defaultAccount,
            extraCharges: extraCharges || 0,
            interestRate: interestRate || 0
        });
    }

    const labelWidth = '140px';

    return (
        <>
            <ToggleInput labelWidth={labelWidth} label='Default' value={defaultAccount} onChange={onChangeDefault}/>
            <Input type='number' labelWidth={labelWidth} label='Extra Charges' value={extraCharges} onChange={onChangeExtraCharges}/>
            <Input type='number' labelWidth={labelWidth} label='Interest Rate' value={interestRate} onChange={onChangeInterestRate}/>
            <div style={{textAlign: 'center'}}>
                <Button label='Save' onClick={onSave}/>
            </div>
        </>
    );
}

export const CategoryForm = ({item, onComplete}: {item?: Category, onComplete: (partialObj: Partial<Category>)=>void}) => {
    const [type, setType] = useState(item?.type || 'expense');

    const onChangeType = (value: string) => setType(value as 'expense' | 'income');

    const onSave = () => {
        onComplete({ type });
    }

    const labelWidth = '140px';

    return (
        <>
            <Dropdown labelWidth={labelWidth} label='Type' value={type} options={[{value: 'expense', label: 'Expense'}, {value: 'income', label: 'Income'}]} onChange={onChangeType}/>
            <div style={{textAlign: 'center'}}>
                <Button label='Save' onClick={onSave}/>
            </div>
        </>
    );
}

export const FundForm = ({item, onComplete}: {item?: Fund, onComplete: (partialObj: Partial<Fund>)=>void}) => {
    const [targetAmount, setTargetAmount] = useState(item?.targetAmount || 0);

    const onChangeTarget = (value: string) => setTargetAmount(parseFloat(value));

    const onSave = () => {
        onComplete({ 
            targetAmount: targetAmount ? targetAmount : 0
        });
    }

    const labelWidth = '140px';

    return (
        <>
            <Input type='number' labelWidth={labelWidth} label='Target' value={targetAmount} onChange={onChangeTarget}/>
            <div style={{textAlign: 'center'}}>
                <Button label='Save' onClick={onSave}/>
            </div>
        </>
    );
}