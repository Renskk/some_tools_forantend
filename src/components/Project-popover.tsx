import { useState } from "react";
import { Box, Popover, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

export const useProjectPopover = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return {
        open: Boolean(anchorEl),
        popoverOpen: handleClick,
        popoverClose: handleClose,
        anchorEl
    }
}

export const DelPopover = (
    { open, anchorEl, onClose, callback, isLoading }:
        {
            open: boolean,
            anchorEl: HTMLButtonElement | null,
            onClose: () => void,
            callback: any,
            isLoading: boolean
        }) => {

    const id = open ? 'delete-popover' : undefined;

    return <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
    >
        <Box sx={{ p: "0.5rem", }}>
            <Typography sx={{ fontSize: "1.3rem", fontWeight: 600, ml: 1, mt: 0.8 }}>确认删除项目</Typography>
            <LoadingButton
                loading={isLoading}
                sx={{ ml: 5, mt: 0.1 }}
                onClick={() => {
                    callback()
                }}>
                <Typography sx={{ fontSize: "1.3 rem" }}>确认</Typography>
            </LoadingButton>
        </Box>
    </Popover>
}
