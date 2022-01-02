import {useEffect, useRef } from "react";

// 重置路由
export const resetRouter = () => (window.location.href = window.location.origin);

// 设置网页title
export const useDocumentTitle = (title: string) => {
    const oldTitle = useRef(document.title).current;

    useEffect( () => {
        document.title = title
        // 卸载时恢复初始title
        return () => {
            document.title = oldTitle
        }
    },[title, oldTitle]);
}

export const isVoid = (value: unknown) => value === undefined || value === null || value === ""


export const cleanObject = (object: { [key: string]: unknown }) => {
    const result = {...object};
    Object.keys(object).forEach(key => {
        const value = object[key]
        if (isVoid(value)) {
            delete result[key]
        }
    })
    return result
}


export const subset = <O extends { [key in string]: unknown }, K extends keyof O>(obj: O, keys: K[]) => {
    const filteredEntries = Object.entries(obj).filter(([key]) =>
        keys.includes(key as K)
    )
    return Object.fromEntries(filteredEntries) as Pick<O, K>
}
