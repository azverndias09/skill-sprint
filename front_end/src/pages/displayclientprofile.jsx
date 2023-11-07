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
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from '../components/navbar';
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




export default function Displayclientprofile() {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [contactnumber, setContactnumber] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = () => {
        // Create a JSON object from the form data
        const formData = {
            first_name: firstname,
            last_name: lastname,
            contact_number: contactnumber,
            city,
            state,
        };

        // Send formData to the backend
        fetch('http://localhost:3001/clientprofile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(() => {
                setSuccessMessage('Client profile details updated!');
                setErrorMessage('');
            })
            .catch((error) => {
                setSuccessMessage('');
                setErrorMessage('Error updating client profile: ' + error.message);
            });
    };


    return (

        <React.Fragment>
            <ThemeProvider theme={customTheme}>

                <Box bgcolor={"background.default"} color={"text.primary"}>
                    <Navbar />

                </Box>

                <br />
                <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                    <Typography component="h1" variant="h4" align="center" fontWeight="semibold" p={4}>
                        SkillSprint Profile

                    </Typography>


                    <Paper variant="outlined"
                        sx={{
                            m: { xs: 4, md: 2 },
                            
                            px: { xs: 4, md: 4 },
                            py: { xs: 4, md: 6 },
                            display: 'flex',
                            flexDirection: 'column',
                            //alignItems: 'center',
                            
                            
                        }}>

                        <Grid container py={6} sx={{justifyContent:'center'}}>
                            <Avatar src="/broken-image.jpg" 
                                sx={{
                                    width: '100px',
                                    height: '100px',
                                
                                }} />
                        </Grid>

                        <Grid container spacing={3} pr={4} pl={4}>

                            <Grid container pb={4} sx={{ textAlign: 'center' }}>
                                <Grid item xs={12} sm={12}   >

                                    <Typography variant="h5" color="initial" > Jason Miranda</Typography>
                                </Grid>

                                <Grid item xs={12} sm={12} >

                                    <Typography variant="h6" color="textSecondary"> @jason999</Typography>
                                </Grid>

                            </Grid>

                            <Grid container spacing={1} >
                                <Grid item xs={12} sm={6} sx={{ justifyContent: 'flex-start' }}>
                                    <Typography variant="h6" color="initial" p={1}>Contact Number</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ textAlign:'end' }}>
                                    <Typography variant="h6" color="textSecondary" p={1}>123467590</Typography>
                                </Grid>

                                <Grid item xs={12} sm={6} sx={{  }}>
                                    <Typography variant="h6" color="initial" p={1}>City</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ textAlign: 'end' }}>
                                    <Typography variant="h6" color="textSecondary" p={1}>Margao</Typography>
                                </Grid>

                                <Grid item xs={12} sm={6} sx={{ justifyContent: 'flex-start' }}>
                                    <Typography variant="h6" color="initial" p={1}>State</Typography>
                                </Grid>

                                <Grid item xs={12} sm={6} sx={{ textAlign: 'end' }}>
                                    <Typography variant="h6" color="textSecondary" p={1}>Goa</Typography>
                                </Grid>




                            </Grid>

                         

                        </Grid>



                    </Paper>
                </Container>
                <Box sx={{ marginTop: '-600px' }}>
                    <StickyFooter />
                </Box>
            </ThemeProvider>
        </React.Fragment>
    );
}