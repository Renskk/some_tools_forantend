import { useMutation, useQuery, useQueryClient } from "react-query";
import { useHttp } from "./http";


export const useConfigFiles = () => {
    const client = useHttp()
    return useQuery<string[]>(
        ["config-files"],
        () => client("files")
    )
}

export const useDeleteConfigFile = (callback: () => void) => {
    const client = useHttp();
    const queryClient = useQueryClient();
    return useMutation(
        (fileName: string) =>
            client(`file?filename=${fileName}`,
                { method: "DELETE" }
            ),
        {
            onSuccess: () => {
                callback()
                queryClient.invalidateQueries("config-files")
            },
        }
    )
}

export const useConfigFile = (fileName: string) => {
    const client = useHttp()
    return useQuery<string>(
        ["config-file"],
        () => client(`file?filename=${fileName}`),
        {
            enabled: Boolean(fileName)
        }
    )
}


export const useAddConfigFile = () => {
    const client = useHttp()
    const queryClient = useQueryClient();
    return useMutation(
        (data: { file_name: string, file_data: string }) =>
            client(`file`, {
                method: "POST",
                data: data
            }),
        {
            onSuccess: () => queryClient.invalidateQueries("config-files")
        }
    )
}
