import {useMutation, useQuery, useQueryClient} from "react-query";
import {useHttp} from "./http";
import {JenkinsJob} from "types/JenkinsJob";


export const useJenkinsJobs = () => {
    const client = useHttp()
    return useQuery<JenkinsJob[]>(
        ["jenkins-jobs"],
        () => client("jenkins/jobs")
    )
}

export const useDeleteJenkinsJob = (callback: ()=> void) => {
    const client = useHttp();
    const queryClient = useQueryClient();
    return useMutation(
        (jobName:string ) =>
            client(`jenkins/job?jobName=${jobName}`,
                {method: "DELETE"}
            ),
        {
            onSuccess: () => {
                callback()
                queryClient.invalidateQueries("jenkins-jobs")
            },
        }
    )
}
