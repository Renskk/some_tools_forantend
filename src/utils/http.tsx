import qs from "qs";

const apiUrl = process.env.REACT_APP_API_URL



interface Config extends RequestInit {
    data?: object,
    token?: string,
}


export const http = async (endpoint: string, {data, headers, ...customConfig}: Config = {}) => {
    const config = {
        method: "GET",
        headers: {
            "Content-Type": data ? "application/json" : "",
        },
        ...customConfig
    }
    if (config.method.toUpperCase() === "GET" ) {
        if (Boolean(data)) {
            endpoint += `?${qs.stringify(data)}`
        }
    } else {
        config.body = JSON.stringify(data || {})
    }

    return window
        .fetch(`${apiUrl}/${endpoint}`, config)
        .then(async response => {
            const data = await response.json()
            if (response.ok) {
                return data?.data
            } else {
                return Promise.reject(data)
            }
        })
}

export const useHttp = () =>{
    return (...[endpoint, config]: Parameters<typeof http>) =>
        http(endpoint, {...config})
}
