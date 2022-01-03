import {useDocumentTitle} from "utils";
import {JenkinsList} from "./jenkins-list";
import { Typography } from "@mui/material";
import {Row} from "components/lib";
import {useProjectDrawer} from "./util";
import {useJenkinsJobs} from "utils/jenkins";
import {ProjectDrawer} from "../../components/project-drawer";
import {LinkButton} from "../../components/project-button";


export const JenkinsProject = () => {
    const {projectCreateOpen} = useProjectDrawer();
    useDocumentTitle("项目详情");
    const {data: jenkinsJobs, isLoading} = useJenkinsJobs()

    return (
        <>
            <Row between={true} marginBottom={"2"}>
                <Typography sx={{fontSize: "4rem", fontWeight: 300}}>Jenkins 列表</Typography>
                <LinkButton onClick={projectCreateOpen}
                        sx={{ fontSize: "2rem", fontWeight: 300}}>
                    创建项目
                </LinkButton>
            </Row>
            <ProjectDrawer>
                <div>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
            </ProjectDrawer>
            <JenkinsList jobs={jenkinsJobs|| []} loading={isLoading}/>
        </>
    )
}
