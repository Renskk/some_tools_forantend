import { Box, Typography, Theme } from "@mui/material";
import { Row } from "components/lib";
import { ProjectDrawer } from "components/project-drawer";
import { ActionButton, LinkButton } from "components/project-button";
import { useConfigFiles, useDeleteConfigFile } from "utils/config-file";
import { Loading } from "components/loading";
import { useProjectPopover, DelPopover } from "components/Project-popover";
import { red, teal, indigo } from "@mui/material/colors";
import { useState } from "react";
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { createStyles, makeStyles } from "@mui/styles";
import { useProjectDrawer } from "utils";
import { EditConfigFile, PipelineCreate } from "./config-drawer";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        box: {
            padding: "0.7rem",
            marginBottom: "1rem",
            backgroundColor: "white",
            borderRadius: "0.5rem",
            marginRight: "1rem",
        },
        linkButtonText: {
            fontSize: "1.7rem",
            fontWeight: 400,
            pl: 0,
            textTransform: "none"
        }
    })
);


export const JenkinsConfig = () => {
    const classes = useStyles();
    const { pipelineCreateOpen, startEditFile } = useProjectDrawer()
    const { open, popoverOpen, popoverClose, anchorEl } = useProjectPopover()
    const { mutate: deleteConfigFile, isLoading: delFileLoading } = useDeleteConfigFile(popoverClose)
    const { data: files, isLoading: loading } = useConfigFiles()
    const [delFileName, setDelFileName] = useState("")
    const editFile = (fileName: string) => startEditFile(fileName)
    const [drawerPage, setDrawerPage] = useState("")
    const handleSetDrawPage = (pageName: string) => {
        setDrawerPage(pageName)
    }


    return (
        <>
            <Row between={true} marginBottom={"2"}>
                <Typography style={{ fontSize: "4rem", fontWeight: 300 }}>Jenkins file</Typography>
                <LinkButton onClick={() => {
                    handleSetDrawPage("pipelineCreate")
                    pipelineCreateOpen()
                }}>???????????????</LinkButton>
            </Row>
            {
                files?.map(fileName => (
                    <Box
                        key={fileName}
                        className={classes.box}
                    >
                        <Row between={true} >
                            <LinkButton
                                onClick={() => {
                                    handleSetDrawPage("editingFileName")
                                    editFile(fileName)
                                }}>
                                <ArticleOutlinedIcon sx={{ fontSize: "2.5rem", ml: 2, mr: 2 }} />
                                <Typography className={classes.linkButtonText} >{fileName}</Typography>
                            </LinkButton>
                            <Box >
                                <ActionButton
                                    onClick={() => {
                                        handleSetDrawPage("editingFileName")
                                        editFile(fileName)
                                    }}
                                    sx={{ color: teal[500] }}>
                                    ??????
                                </ActionButton>
                                <ActionButton sx={{ color: indigo[500] }}> ?????? </ActionButton>
                                <ActionButton
                                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                                        setDelFileName(fileName)
                                        popoverOpen(event)
                                    }}
                                    sx={{ color: red[400] }}>
                                    ??????
                                </ActionButton>
                            </Box>
                        </Row>
                    </Box>
                ))
            }
            <Loading isLoading={loading} />
            <DelPopover open={open} anchorEl={anchorEl} onClose={popoverClose} isLoading={delFileLoading} callback={() => deleteConfigFile(delFileName)} />
            <ProjectDrawer>
                {drawerPage === "editingFileName" ? <EditConfigFile /> : <PipelineCreate />}
            </ProjectDrawer>
        </>
    )
}

