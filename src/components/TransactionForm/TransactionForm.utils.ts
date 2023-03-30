export type TransactionCheck = {
    type: string;
    date: string;
    amount: number;
    [key: string]: string | number | boolean | undefined;
}

export const validateTransaction = (obj: TransactionCheck) => {
    //make sure amount is a number
    if (typeof obj.amount !== 'number' || Number.isNaN(obj.amount)) return {valid: false, error: 'Amount is not valid.'};

    //make sure date is a string and correct format
    if (/\b[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(obj.date) === false) return {valid: false, error: 'Date is not valid, please use the format YYYY-MM-DD.'};

    //make sure a group is selected
    if (obj.type === 'spend' && (!obj.fund || typeof obj.fund !== 'number') && (!obj.category || typeof obj.category !== 'number')) return {valid: false, error: 'Must choose a group.'};

    //make sure account is selected
    if (obj.type === 'spend' && (!obj.account || typeof obj.account !== 'number')) return {valid: false, error: 'Must choose an account.'};

    //make sure fund is selected
    if (obj.type === 'fundAddition' && (!obj.fund || typeof obj.fund !== 'number')) return {valid: false, error: 'Must choose a fund.'};

    //make sure from and to are selected
    if (obj.type === 'transfer' && (!obj.from || typeof obj.from !== 'number')) return {valid: false, error: 'Must choose a "From" account.'};
    if (obj.type === 'transfer' && (!obj.to || typeof obj.to !== 'number')) return {valid: false, error: 'Must choose a "To" account.'};

    return {valid: true, error: ''};
}

export const LABEL_WIDTH = '105px';