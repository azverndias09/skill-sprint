import React, { Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
//import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems } from '../components/listItems';
import { mainAppBar } from '../components/appbar';

import Navbar from '../components/navbar';
import ServiceCard from '../components/servicecard';
import SortButton from '../components/sortbutton'
import StickyFooter from '../components/footer';


const customTheme = createTheme({
    typography: {
        fontFamily: 'Poppins, sans-serif',
    },
    spacing: 8,

});


const ServicePage = () => {
    const navigate = useNavigate();
    //const [user, setUser] = useState();
    const reset = () => {
        localStorage.removeItem('user');
        navigate("/login");
    }


    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (

        <ThemeProvider theme={customTheme}>

           
            <Box bgcolor={"background.default"} color={"text.primary"}>
                <Navbar />
            </Box>



            <Box sx={{ margin: '64px' }}>
                
                <Grid >
                    
                </Grid>
            </Box>

            <Box sx={{ marginTop: '-600px' }}>
                <StickyFooter />
            </Box>

            
        </ThemeProvider>

    );
};

export default ServicePage;
