import { ProjectCodeMirror } from "components/project-code-mirror";
import { Box, Typography, Theme, Button, Divider, TextField } from "@mui/material";
import { useAddConfigFile } from "utils/config-file";
import { useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { useProjectDrawer } from "utils";
import { LoadingButton } from "@mui/lab";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fileNameInput: {
            width: "12vw",
            height: "2.3rem",
            fontSize: "1.4rem",
            padding: "0.4rem 1rem"
        }
    })
);


export const PipelineCreate = () => {
    const [codeValue, setCodeValue] = useState("")
    const [fileName, setFileName] = useState("")
    const classes = useStyles();
    const { close } = useProjectDrawer()
    const { mutate: addConfigFile, isLoading } = useAddConfigFile()

    const handleClick = () => {
        addConfigFile({ file_name: fileName, file_data: codeValue })
        close()
    }

    return (
        <Box sx={{ m: "2rem 0 0 2rem", width: "78.5vw" }}>
            <Box sx={{ height: "91vh" }}>
                <Box>
                <Typography display="inline" sx={{ fontSize: "1.5rem", lineHeight: "3rem" }}>
                    文件名称：
                </Typography>
                <TextField
                    sx={{ "-webkit-autofill": { p: "2rem" } }}
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    onChange={(event) => { setFileName(event.target.value) }}
                    inputProps={{ className: classes.fileNameInput }}
                />
                </Box>
                <Box sx={{ mt: "3rem", display: "flex" }}>
                <Typography display="inline" sx={{ fontSize: "1.5rem", lineHeight: "3rem" }}>
                    文件内容：
                </Typography>
                <ProjectCodeMirror maxHeight="83vh" maxWidth="72vw" setCodeValue={setCodeValue} />
            </Box>
            </Box>


            <Box sx={{ '& > button': { mt: "1rem" }, ml: "64vw", bottom: 0 }}>

                <LoadingButton
                    sx={{ mr: "4rem" }}
                    color="primary"
                    loading={isLoading}
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="contained"
                    onClick={handleClick}
                >
                    提交
                </LoadingButton>
                <Button
                    color="inherit"
                    onClick={close}
                    startIcon={<CancelIcon />}
                    variant="contained"
                >
                    取消
                </Button>
            </Box>

        </Box>
    )
}

export const EditConfigFile = () => {
    const [codeValue, setCodeValue] = useState("")
    const { close, editingFileName, editingFile } = useProjectDrawer()
    const { mutate: addConfigFile, isLoading } = useAddConfigFile()


    return <Box>
        <ProjectCodeMirror maxHeight="93vh" value={editingFile} setCodeValue={setCodeValue} />
        <Divider />
        <Box sx={{ '& > button': { mt: "1rem" }, ml: "64vw" }}>

            <LoadingButton
                sx={{ mr: "4rem" }}
                color="primary"
                loading={isLoading}
                onClick={() => {
                    addConfigFile({ file_name: editingFileName, file_data: codeValue })
                    close()
                }}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
            >
                保存
            </LoadingButton>
            <Button
                color="inherit"
                onClick={close}
                startIcon={<CancelIcon />}
                variant="contained"
            >
                取消
            </Button>
        </Box>
    </Box>
}
