import { toast } from 'react-hot-toast'

export const shortenAddress = (address: string, length=4, start=0): string => {
    let res = ''
    if (address) {
        const first = address?.substring(start, start + length)
        const last = address?.substring(address?.length - length, address?.length)
        res = first + '...' + last
    }
    return res
}

export const remove0x = (str: string): string => {
    if (str.slice(0, 2) === "0x") {
        return str.slice(2);
    }
    return str;
}

export const getFormatedValue = (val: string, type: string): string => {
    switch (type) {
        case 'address':
            return shortenAddress(val, 8)
        default:
            return val
    }
}

export const isABI = (input: string): boolean => {
    if (!input) return false
    try {
        JSON.parse(input)
        return true

    } catch (error) {
        toast.error("Sorry, couldn't parse ABI.")
        console.log(error)
        return false
    }
}

export const isCode = (input: any): boolean => {
    // TODO - try parse solidity code
    return true
}

export function classNames(...classes: any) { return classes.filter(Boolean).join(' ')}