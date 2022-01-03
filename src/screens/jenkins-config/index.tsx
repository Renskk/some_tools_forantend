import { ProjectCodeMirror } from "components/project-code-mirror";
import { Box, Button, Typography } from "@mui/material";
import { Row } from "components/lib";
import { useProjectDrawer } from "../jenkins-project/util";
import { ProjectDrawer } from "components/project-drawer";
import { ActionButton, LinkButton } from "components/project-button";
import { useConfigFiles, useDeleteConfigFile } from "utils/config-file";
import { Loading } from "components/loading";
import { useProjectPopover, DelPopover } from "components/Project-popover";
import { red, teal } from "@mui/material/colors";
import { useState } from "react";
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

export const JenkinsConfig = () => {
    const { pipelineCreateOpen } = useProjectDrawer()
    const { open, popoverOpen, popoverClose, anchorEl } = useProjectPopover()
    const { mutate: deleteConfigFile, isLoading } = useDeleteConfigFile(popoverClose)
    const { data: files, isLoading: loading } = useConfigFiles()
    const [delFileName, setDelFileName] = useState("")

    return (
        <>
            <Row between={true} marginBottom={"2"}>
                <Typography style={{ fontSize: "4rem", fontWeight: 300 }}>Jenkins file</Typography>
                <LinkButton
                    sx={{ backgroundColor: 'transparent', fontSize: "2rem", fontWeight: 300 }}>
                    添加流水线
                </LinkButton>
            </Row>
            {
                files?.map(file => (
                    <Box
                        key={file}
                        sx={{
                            padding: "1.2rem",
                            marginBottom: "1rem",
                            backgroundColor: "white",
                            borderRadius: "0.5rem",
                            marginRight: "1rem",
                        }}
                    >
                        <Row between={true} >
                            <LinkButton
                                onClick={pipelineCreateOpen}>
                                <ArticleOutlinedIcon sx={{ fontSize: "2.5rem", ml: 2, mr: 2 }} />
                                <Typography sx={{
                                    fontSize: "1.7rem",
                                    fontWeight: 400,
                                    pl: 0,
                                    textTransform: "none"
                                }}>{file}</Typography>
                            </LinkButton>
                            <Box>
                                <ActionButton
                                    onClick={pipelineCreateOpen}
                                    sx={{ color: teal[500], }}>
                                    编辑
                                </ActionButton>
                                <ActionButton
                                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                                        setDelFileName(file)
                                        popoverOpen(event)
                                    }}
                                    sx={{ color: red[400] }}>
                                    删除
                                </ActionButton>
                            </Box>
                        </Row>
                    </Box>
                ))
            }
            <Loading isLoading={loading} />
            <DelPopover open={open} anchorEl={anchorEl} onClose={popoverClose} isLoading={isLoading} callback={() => deleteConfigFile(delFileName)} />
            <ProjectDrawer>
                <ProjectCodeMirror />
            </ProjectDrawer>
        </>
    )
}

