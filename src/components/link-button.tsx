import * as React from "react";
import {Button, Link} from "@mui/material";

export const LinkButton = (props: any) => {
    return <Button
        component={Link}
        disableRipple={true}
        {...props}
    />
}

