import {Drawer} from "@mui/material"
import React, { ReactNode } from "react"
import { useProjectDrawer } from "utils";
import { Loading } from "./loading";


export const ProjectDrawer = ({children}: {children: ReactNode}) => {
    const {projectDrawerOpen, close, isLoading} = useProjectDrawer();

    return (
        <div>
            <React.Fragment key={'right'}>
                <Drawer
                    anchor={'right'}
                    open={projectDrawerOpen}
                    onClose={close}
                    transitionDuration={450}
                >
                    <Loading isLoading={isLoading} />
                    {children}
                </Drawer>
            </React.Fragment>
        </div>
    )
}
