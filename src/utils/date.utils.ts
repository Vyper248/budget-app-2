import { format } from "date-fns"

export const getDateNumber = () => {
    return Number(format(new Date(),'yyyyMMddHHmmssSSSS'));
}