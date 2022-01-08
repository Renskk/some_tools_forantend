import { JenkinsJob } from "types/JenkinsJob";
import { Loading } from "../../components/loading";
import { green, red } from '@mui/material/colors';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import {
    Paper, SxProps, Table, TableBody, TableCell,
    TableContainer, TableHead, TableProps, TableRow, Theme, Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { useDeleteJenkinsJob } from "utils/jenkins";
import { useState } from "react";
import { DelPopover, useProjectPopover } from "components/Project-popover";
import { ActionButton, LinkButton } from "components/project-button";
import { grey } from "@mui/material/colors";


interface ListProps extends TableProps {
    jobs: JenkinsJob[];
    loading: boolean;
}


export const JenkinsList = ({ jobs, loading }: ListProps) => {
    const { open, popoverOpen, popoverClose, anchorEl } = useProjectPopover()
    const { mutate: deleteJenkinsJob, isLoading } = useDeleteJenkinsJob(popoverClose);
    const [delJobName, setDelJobName] = useState("")


    return (
        <>
            <TableContainer component={Paper} sx={{ maxHeight: "73vh" }}>
                <Table stickyHeader>
                    <TableHead sx={{ backgroundColor: grey[500] }} >
                        <TableRow >
                            <TableHeadCell title="状态" sx={{ width: "10vw" }} />
                            <TableHeadCell title="名称" sx={{ width: "20vw" }} />
                            <TableHeadCell sx={{ width: "25vw" }} />
                            <TableHeadCell title="操作" />
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {jobs?.map((job) => (
                            <TableRow
                                key={job.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, p: 0 }}
                            >
                                <TableCell component="th" scope="row" align="center">
                                    <ListIcon  color={job.color} />
                                </TableCell>
                                <TableCell align="center">
                                    <LinkButton target="_blank" href={job.url} sx={{ fontSize: "1.6rem", fontWeight: 400, textTransform: "none" }}>{job.name}</LinkButton>
                                </TableCell>
                                <TableCell />
                                <TableCell align="center" >
                                    <ActionButton sx={{ color: green[400] }}>构建</ActionButton>
                                    <ActionButton
                                        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                                            setDelJobName(job.name)
                                            popoverOpen(event)
                                        }} sx={{ color: red[400] }}>删除</ActionButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Loading isLoading={loading} />
            <DelPopover open={open} anchorEl={anchorEl} onClose={popoverClose} isLoading={isLoading} callback={() => deleteJenkinsJob(delJobName)} />
        </>
    )
};


const ListIcon = ({ color }: { color: string }) => {
    if (color === "blue") {
        return <CheckCircleIcon sx={{ fontSize: 25, color: green[400] }} />
    }
    return <CancelIcon sx={{ fontSize: 25, color: red[400] }} />
};

const TableHeadText = styled(Typography)`
  font-size: 1.7rem;
  font-weight: 700;
  color: white
`

const TableHeadCell = ({ ...props }: { title?: string | "", sx?: SxProps<Theme> | undefined }) => {
    return <TableCell align="center"
        style={{ backgroundColor: grey[800] }}
        {...props}
    >
        <TableHeadText>{props.title}</TableHeadText>
    </TableCell>
}