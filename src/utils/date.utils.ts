import { format } from "date-fns"

export const getDateNumber = () => {
    return Number(format(new Date(),'yyyyMMddHHmmssSSS'));
}

export const today = () => {
    return format(new Date(), 'yyyy-MM-dd');
}