import styled from "@emotion/styled";
import {Navigate, Route, Routes, useLocation} from "react-router";
import {Row} from "components/lib";
import {JenkinsProject} from "../jenkins-project";
import {JenkinsConfig} from "../jenkins-config";
// import { ReactComponent as Logo } from "assets/bee.svg";
import {Button, List, ListItemButton, ListItemIcon, Typography} from '@mui/material';
import { resetRouter } from "utils";
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import SettingsEthernetOutlinedIcon from '@mui/icons-material/SettingsEthernetOutlined';
import { Link } from "react-router-dom";


export const HomePage = () => {
    return (
        <Container>
            <Header>
                <Button onClick={resetRouter} style={{backgroundColor: 'transparent', margin: "2rem"}}
                        disableRipple={true}>
                     {/*<Logo width={'5rem'} height={'5rem'} />*/}
                    <Typography variant={"h3"} style={{color: "#000000", margin: "1rem"}}> some tools</Typography>
                </Button>
            </Header>
            <NavPage/>
            <Main>
                <Routes>
                    <Route path="/" element={<Navigate to="projects"/>}/>
                    <Route path={"/projects"} element={<JenkinsProject/>}/>
                    <Route path={"/jenkins-config"} element={<JenkinsConfig/>}/>
                </Routes>
            </Main>

        </Container>
    )
}

const useUrlType = () => {
    const units = useLocation().pathname.split("/");
    return units[units.length - 1]
}

const navData = [
    { icon: <FactCheckOutlinedIcon />, label: "projects", name: "项目详情" },
    { icon: <SettingsEthernetOutlinedIcon />, label: "jenkins-config", name: "配置文件" },
]

const NavPage = () => {
    const urlType = useUrlType();

    return (
        <Nav aria-label="main mailbox folders">
            <NavList>
                <ListItemButton disabled={true}>
                    <Typography style={{fontSize: "1.8rem", fontWeight: 400}}>Jenkins</Typography>
                </ListItemButton>
                {
                    navData.map((item) => (
                        <Link to={`/${item.label}`} key={item.label} style={{ textDecoration: 'none' }}>
                            <ListItemButton
                                disableRipple={true}
                                style={{
                                    minHeight: "4rem",
                                    color: "rgba(0,0,0)",
                                    padding: "0 0 0 4rem",
                                    margin: "0.5rem 0",
                                    borderRadius: "0.5rem"
                                }}
                                selected={urlType === item.label}
                            >
                                <ListItemIcon sx={{minWidth: "25px"}}>
                                    {item.icon}
                                </ListItemIcon>
                                    <Typography style={{fontSize: "1.4rem"}}>{item.name}</Typography>
                            </ListItemButton>
                        </Link>
                    ))
                }
            </NavList>
        </Nav>
    )
}


const NavList = styled(List)({
    '&& .Mui-selected, && .Mui-selected:hover': {
        backgroundColor: '#ebebeb',
        '&, & .MuiListItemIcon-root': {
            color: 'steelblue',
        },
    },
    // hover states
    '& .MuiListItemButton-root:hover': {
        backgroundColor: '#f5f5f5f5',
        '&, & .MuiListItemIcon-root': {
            color: 'steelblue',
        },
    },
});


const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  grid-template-columns: 25rem 1fr;
  grid-template-areas: 
	"header header"
	"nav main";
  height: 100vh;
`
const Header = styled(Row)`
  background-color: #fafafa;
  grid-area: header;
  box-shadow: 0 0 5px 0 rgb(0, 0, 0, 0.1);
  z-index: 1;
`
const Nav = styled.nav`
  grid-area: nav;
  padding: 1rem 1.8rem 0 1.8rem;
`
const Main = styled.main`
  grid-area: main;
  background-color: #f5f5f5;
  padding: 3rem;
`
