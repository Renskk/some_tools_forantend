import {Drawer} from "@mui/material"
import React, { ReactNode } from "react"
import {useProjectDrawer} from "../screens/jenkins-project/util";


export const ProjectDrawer = ({children}: {children: ReactNode}) => {
    const {projectDrawerOpen, close} = useProjectDrawer();

    return (
        <div>
            <React.Fragment key={'right'}>
                <Drawer
                    anchor={'right'}
                    open={projectDrawerOpen}
                    onClose={close}
                >
                    {children}
                </Drawer>
            </React.Fragment>
        </div>
    )
}
