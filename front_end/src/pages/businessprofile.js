import * as React from 'react';
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
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';


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




export default function Businessprofile() {
   

    return (
        
        <React.Fragment>
        <ThemeProvider theme={customTheme}>

            <AppBar
                position="absolute"
                color="default"
                elevation={0}
                sx={{
                    position: 'relative',
                    backgroundColor: '#FFFFFF',
                    borderBottom: '#FFFFFF',
                }}
            >
                <Toolbar 
                sx={{
                    justifyContent:'center'
                }}>
                        <Grid item xs={12} sm={6} md={4} lg={3}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',

                            }}>
                            <img src="/skillsprint.png" alt="Logo"
                                style={{
                                    width: '360px',
                                    height: '100px',


                                }} />
                        </Grid>
                </Toolbar>
            </AppBar>

            <br/>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                    <Typography component="h1" variant="h4" align="center" fontWeight="semibold">
                        Welcome! Complete your Business profile
                    </Typography>


                <Paper variant="outlined" 
                sx={{ 
                    my: { xs: 3, md: 4 }, 
                    p: { xs: 2, md: 5 }, 
                    display:'flex',
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    textAlign:'center'
                    }}>
                   
                    <Avatar src="/broken-image.jpg" align="center"
                     sx={{
                        width:'100px',
                        height:'100px'
                     }}/>

                        <Grid container spacing={3}>
                            <Grid item xs={12} >

                                <TextField
                                    required
                                    id="business name"
                                    name="business name"
                                    label="Business Name"
                                    fullWidth
                                    autoComplete="given-name"
                                    variant="standard"
                                />
                            </Grid>
                            
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id="business description"
                                    name="business description"
                                    label="Business Description"
                                    fullWidth
                                    autoComplete="shipping address-line1"
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    required
                                    id="contact number"
                                    name="contact number"
                                    label="Contact Number"
                                    fullWidth
                                    autoComplete="phone"
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="city"
                                    name="city"
                                    label="City"
                                    fullWidth
                                    autoComplete="shipping address-level2"
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="state"
                                    name="state"
                                    label="State/Province/Region"
                                    fullWidth
                                    variant="standard"
                                />
                            </Grid>

                            
                            <Button size='large' fullWidth type="button" variant="contained" sx={{  mt: 3, mb: 2}} >
                               Next
                            </Button>
                            
                           
                          
                        
                            
                        </Grid>

                   
                    
                </Paper>
                <Copyright />
            </Container>
            </ThemeProvider>
        </React.Fragment>
    );
}