
import { NavigationEnum } from '../../constants/constants'
import { Link } from "react-router-dom";
import { AppBar, Button, Dialog, Hidden, IconButton, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import { Close, Menu } from '@mui/icons-material';
import { useState } from 'react';

const navigationItems = [
    {
        label: "Home",
        route: NavigationEnum.home,
    },
    {
        label: "New Exercise",
        route: NavigationEnum.exercises,
    },
    {
        label: "New Outline",
        route: NavigationEnum.outlines,
    },
    {
        label: "History",
        route: NavigationEnum.records,
    },
    {
        label: "Logout",
        route: NavigationEnum.logout,
    }
]

const Navigation = () => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"))

    const openMenu = () => {setOpen(true)}
    const closeMenu = () => {setOpen(false)}

    const navItemComponents = (
        navigationItems.map(({ label, route }) => {
            return (
                <Link to={`/${route}`} key={route}>
                    <Button color="primary" size="large" fullWidth={isSmall}>
                        {label}
                    </Button>
                </Link>
            );
        })
    )

    return (
        <>
            <Hidden smDown>
                <Box>
                    {navItemComponents}
                </Box>
            </Hidden>
            <Hidden smUp>
                <IconButton color="primary" onClick={openMenu}>
                    <Menu />
                </IconButton>
                <Dialog
                    open={open}
                    fullScreen
                    fullWidth
                    sx={{
                        background: "black"
                    }}
                >
                    <AppBar position="static" sx={{ background: "black"}}>
                        <Toolbar>
                            <Typography variant="h5" sx={{ flexGrow: 1 }} color="primary">
                                Menu
                            </Typography>
                            <IconButton color="primary" onClick={closeMenu}>
                                 <Close />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <Box display="flex" flexDirection="column" py={3} width="100%" height="100%" sx={{ background: "black" }}>
                        {navItemComponents}
                    </Box>
                </Dialog>
            </Hidden>
        </>
    );
}

export default Navigation;