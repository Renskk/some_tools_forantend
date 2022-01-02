import {useSetUrlSearchParam, useUrlQueryParam} from "../../utils/url";

export const useProjectDrawer = () => {
    const [{ projectCreate }, setProjectCreate] = useUrlQueryParam(["projectCreate"]);
    const [{ pipelineCreate }, setPipelineCreate] = useUrlQueryParam(["pipelineCreate"]);
    const setUrlParams = useSetUrlSearchParam();

    const projectCreateOpen = () => setProjectCreate({ projectCreate: true });
    const pipelineCreateOpen = () => setPipelineCreate({ pipelineCreate: true });
    const close = () => setUrlParams({projectCreate: "", pipelineCreate: ""});

    return {
        projectDrawerOpen: projectCreate === "true" || pipelineCreate === "true",
        projectCreateOpen,
        pipelineCreateOpen,
        close
    }
}
