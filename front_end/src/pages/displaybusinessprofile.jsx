import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import { FormControlLabel } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BusinessNavbar from '../components/businessnavbar';
import StickyFooter from '../components/footer';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                SkillSprint
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const customTheme = createTheme({
    typography: {
        fontFamily: 'Poppins, sans-serif',
    },

    palette: {
        mode: 'light', // Set the mode to 'light' for light mode
        primary: {
            main: '#1976D2', // Set the primary color to your desired color
        },
        secondary: {
            main: '#388E3C', // Set the secondary color to your desired color
        },
        background: {
            default: '#FFFFFF', // Set the default background color to white
            paper: '#F5F5F5',   // Set the paper background color to a light gray
        },
        text: {
            primary: '#000000', // Set the primary text color to black
            secondary: '#616161', // Set the secondary text color to a gray color
        },
    }


});


export default function Displaybusinessprofile() {
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const businessProfileData = JSON.parse(localStorage.getItem('businessProfile'));

    return (
        <React.Fragment>
            <ThemeProvider theme={customTheme}>
                <Box bgcolor={"background.default"} color={"text.primary"}>
                    <BusinessNavbar />
                </Box>
                <br />
                <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                  
                <Grid item sx={{textAlign:'center'}}>
                    <Typography component="h1" variant="h4" fontWeight="semibold" p={4}>
                        SkillSprint Business Profile
                    </Typography>
                    </Grid>
                    <Box
                        item
                        elevation={4}
                        sx={{
                            m: { xs: 4, md: 2 },
                            px: { xs: 4, md: 4 },
                            py: { xs: 4, md: 6 },
                            display: 'flex',
                            flexDirection: 'column',
                            marginLeft: '2',
                            backgroundColor: '#f0f0f0',
                            borderRadius: '16px',
                            justifyContent: 'center',
                            border: '1px solid',
                            borderColor: '#636363',
                        }}
                    >
                       <Grid container pb={6}  sx={{justifyContent:'center'}}>
                            <Avatar src="/broken-image.jpg" 
                                sx={{
                                    width: '100px',
                                    height: '100px',
                                    
                                }} />
                            </Grid>
                        <Grid container spacing={1} pl={4} pr={3}>
                            <Grid item xs={12} sm={12} sx={{ textAlign: 'center' }}>
                                <Typography variant="h5" color="initial">
                                    {businessProfileData.businessname}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} sx={{ textAlign: 'center' }}>
                                <Typography variant="h6" color="textSecondary">
                                    @{businessProfileData.businessname} {/* You may replace this with the actual username */}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} sx={{ textAlign: 'start' }}>
                                <Typography variant="h7" color="initial">
                                    {businessProfileData.businessdescription}
                                </Typography>
                            </Grid>
                        </Grid>
                        {/* ... (other components) */}
                        <Divider variant="middle" color="black" />
                        <br />
                        <Grid container spacing={1} pl={4} pr={3}>
                            <Grid item xs={12} sm={6} sx={{ textAlign: 'start' }}>
                                <Typography variant="h6" color="initial" p={1}>
                                    Contact Number
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ textAlign: 'end' }}>
                                <Typography variant="h6" color="textSecondary" p={1}>
                                    {businessProfileData.contactnumber}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{}}>
                                <Typography variant="h6" color="initial" p={1}>
                                    City
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ textAlign: 'end' }}>
                                <Typography variant="h6" color="textSecondary" p={1}>
                                    {businessProfileData.city}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ justifyContent: 'flex-start' }}>
                                <Typography variant="h6" color="initial" p={1}>
                                    State
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ textAlign: 'end' }}>
                                <Typography variant="h6" color="textSecondary" p={1}>
                                    {businessProfileData.state}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
                <Box sx={{ marginTop: '-600px' }}>
                    <StickyFooter />
                </Box>
            </ThemeProvider>
        </React.Fragment>
    );
}
