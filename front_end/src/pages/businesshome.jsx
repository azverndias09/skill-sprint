import React, { Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

import Box from '@mui/material/Box';

import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';


import BusinessNavbar from '../components/businessnavbar';
import ServiceCard from '../components/servicecard';
import SortButton from '../components/sortbutton'
import StickyFooter from '../components/footer';


const customTheme = createTheme({
    typography: {
        fontFamily: 'Poppins, sans-serif',
    },
    spacing: 8,

});



const BusinessHome = () => {
    const navigate = useNavigate();


    return (

        <ThemeProvider theme={customTheme}>

            <Box bgcolor={"background.default"} color={"text.primary"}>
                <BusinessNavbar />
            </Box>

            <Box sx={{ margin: '64px' }}>
               <Grid>
                <Typography variant='h4'> My Ads </Typography>
                </Grid> 


                <Grid container spacing={2} flex={4} py={4} maxRows={4} sx={{ display: 'flex', justifyContent: 'start', wrap: true, }}>
                    <Grid item xs={12} md={3}>
                        <ServiceCard />
                    </Grid>
                   
                   
                </Grid>
            </Box>

            <Box sx={{ marginTop: '-600px' }}>
                <StickyFooter />
            </Box>
        </ThemeProvider>

    );
};

export default BusinessHome;
