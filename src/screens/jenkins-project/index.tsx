import {useDocumentTitle} from "utils";
import {JenkinsList} from "./jenkins-list";
import {Button, Link, Typography} from "@mui/material";
import {Row} from "components/lib";
import {useProjectDrawer} from "./util";
import {useJenkinsJobs} from "utils/jenkins";
import {ProjectDrawer} from "../../components/project-drawer";
import {LinkButton} from "../../components/link-button";


export const JenkinsProject = () => {
    const {projectCreateOpen} = useProjectDrawer();
    useDocumentTitle("项目详情");
    const {data: jenkinsJobs, isLoading} = useJenkinsJobs()

    return (
        <>
            <Row between={true} marginBottom={"2"}>
                <Typography sx={{fontSize: "4rem", fontWeight: 300}}>Jenkins列表</Typography>
                <LinkButton onClick={projectCreateOpen}
                        sx={{backgroundColor: 'transparent', fontSize: "2rem", fontWeight: 300}}>
                    创建项目
                </LinkButton>
            </Row>
            <ProjectDrawer>
                <div>aaaa</div>
            </ProjectDrawer>
            <JenkinsList jobs={jenkinsJobs|| []} loading={isLoading}/>
        </>
    )
}
