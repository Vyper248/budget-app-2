import { useAppSelector } from "@/redux/hooks";

const getYear = (adj: number) => {
    let year = new Date().getFullYear();
    return {
        from: `${year + adj}-01-01`,
        to: `${year + adj}-12-31`
    }
}

export const getCurrentYear = () => getYear(0);
export const getPreviousYear = () => getYear(-1);

const getTaxYear = (adj: number) => {
    let year = new Date().getFullYear();
    let month = new Date().getMonth();
    let day = new Date().getDate();

    //check if after 5th April
    if (month > 3 || (month === 3 && day > 5)) {
        return {
            from: `${year + adj}-04-06`,
            to: `${year + 1 + adj}-04-05`
        }
    } else {
        return {
            from: `${year - 1 + adj}-04-06`,
            to: `${year + adj}-04-05`
        }
    }
}

export const getCurrentTaxYear = () => getTaxYear(0);
export const getPreviousTaxYear = () => getTaxYear(-1);

const toDouble = (number: number) => {
    if (number < 10) return `0${number}`;
    else return `${number}`;
}

const getMonth = (adj: number) => {
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1 + adj;
    let day = new Date(year, month, 0).getDate();

    return {
        from: `${year}-${toDouble(month)}-01`,
        to: `${year}-${toDouble(month)}-${toDouble(day)}`
    }
}

export const getCurrentMonth = () => getMonth(0);
export const getPreviousMonth = () => getMonth(-1);

const getAllPeriods = () => {
    const settings = useAppSelector(state => state.settings);
    const startDate = settings.startDate;
    const endDate = getMonth(0).to;

    return {
        from: startDate,
        to: endDate
    }
}

export const getAll = () => getAllPeriods();