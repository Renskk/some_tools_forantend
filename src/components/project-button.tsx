import styled from "@emotion/styled";
import { Button, Link } from "@mui/material";

export const LinkButton = (props: any) => {
    return <Button
        component={Link}
        disableRipple={true}
        style={{ backgroundColor: 'transparent' }}
        {...props}
    />
}

export const ActionButton = styled(Button)(() => ({
    fontSize: "1.4rem",
    fontWeight: 600,
}));

