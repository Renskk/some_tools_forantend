import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { cleanObject, subset } from "./index";

// const [param, setParam] = useUrlQueryParam(["name", "personId"])
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
    const [searchParams] = useSearchParams();
    const [stateKeys] = useState(keys);
    const setSearchParam = useSetUrlSearchParam();
    return [
        useMemo(
            () => subset(Object.fromEntries(searchParams), stateKeys) as { [key in K]: string }
            , [searchParams, stateKeys]),
        (params: Partial<{ [key in K]: unknown }>) => {
            return setSearchParam(params)
        },
    ] as const;
}

export const useSetUrlSearchParam = () => {
    const [searchParams, setSearchParam] = useSearchParams()
    return (params: { [key: string]: unknown }) => {
        const o = cleanObject({
            ...Object.fromEntries(searchParams),
            ...params,
        }) as URLSearchParamsInit;
        return setSearchParam(o);
    }
}
