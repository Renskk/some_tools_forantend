import {CircularProgress, Theme} from "@mui/material";
import {createStyles, makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            position: "absolute",
            top: 0,
            width: "75vw",
            height: "100%",
            justifyContent: "center",
            alignItems: "center"
        }
    })
);


export const Loading = ({isLoading}: { isLoading: boolean }) => {
    const classes = useStyles();
    return <>
        {isLoading ? (
            <div
                className={classes.root}
            >
                <CircularProgress/>
            </div>
        ) : ([])
        }
    </>
}
