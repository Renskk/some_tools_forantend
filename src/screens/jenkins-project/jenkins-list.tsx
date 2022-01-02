import {JenkinsJob} from "types/JenkinsJob";
import {Loading} from "../../components/loding";
import {green, red} from '@mui/material/colors';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import LoadingButton from '@mui/lab/LoadingButton';

import {
    Button, Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TableProps, TableRow, Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import {useDeleteJenkinsJob} from "utils/jenkins";
import {useState} from "react";
import { DelPopover, useProjectPopover } from "components/Project-popover";


interface ListProps extends TableProps {
    jobs: JenkinsJob[];
    loading: boolean;
}


export const JenkinsList = ({jobs, loading}: ListProps) => {
    const {open, popoverOpen, popoverClose, anchorEl} = useProjectPopover()
    const {mutate: deleteJenkinsJob, isLoading} = useDeleteJenkinsJob(popoverClose);
    const [delJobName, setDelJobName] = useState("")


    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">
                                <TableHeadText>状态</TableHeadText>
                            </TableCell>
                            <TableCell align="center">
                                <TableHeadText>名称</TableHeadText>
                            </TableCell>
                            <TableCell align="center">
                                <TableHeadText>操作</TableHeadText>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {jobs?.map((job) => (
                            <TableRow
                                key={job.name}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row" align="center">
                                    <ListIcon color={job.color}/>
                                </TableCell>
                                <TableCell align="center">
                                    <TableBodyText>{job.name}</TableBodyText>
                                </TableCell>
                                <TableCell align="center" sx={{fontSize: "0.5rem"}}>
                                    <Button>
                                        <TableBodyButtonText sx={{color: green[400]}}>构建</TableBodyButtonText>
                                    </Button>
                                        <Button
                                            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                                                setDelJobName(job.name)
                                                popoverOpen(event)
                                            }}>
                                            <TableBodyButtonText sx={{color: red[400]}}>删除</TableBodyButtonText>
                                        </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Loading isLoading={loading}/>
            <DelPopover open={open} anchorEl={anchorEl} onClose={popoverClose} isLoading={isLoading} callback={() => deleteJenkinsJob(delJobName)}/>
        </>
    )
};


const ListIcon = ({color}: { color: string }) => {
    if (color === "blue") {
        return <CheckCircleIcon sx={{fontSize: 25, color: green[400]}}/>
    }
    return <CancelIcon sx={{fontSize: 25, color: red[400]}}/>
};

const TableHeadText = styled(Typography)`
  font-size: 1.5rem;
  font-weight: 700;
`

const TableBodyText = styled(Typography)`
  font-size: 1.6rem;
  font-weight: 400;
`
export const TableBodyButtonText = styled(Typography)(() => ({
    fontSize: "1.4rem",
    fontWeight: 600,
}));

