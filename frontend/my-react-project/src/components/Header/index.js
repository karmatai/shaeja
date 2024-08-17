import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import TempleBuddhistIcon from '@mui/icons-material/TempleBuddhist';
const Logo = styled('img')({
    height: '10vh',
    marginRight: 'auto',
});

const NavBar = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: 'yellow' }}>
            <Toolbar>
                {/* <Logo src="logo.png" alt="Logo" /> */}
                <TempleBuddhistIcon style={{ fontSize: 50, color: 'black' }} />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                </Typography>
                <Button sx={{ color:"black" }}>Register</Button>
                <Button sx={{ color: "black" }}>Login</Button>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
