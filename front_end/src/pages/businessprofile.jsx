import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    const [businessname, setBusinessname] = useState('');
    const [businessdescription, setBusinessdescription] = useState('');
    const [contactnumber, setContactnumber] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [location, setLocation] = useState(null);
    const [isLocationObtained, setIsLocationObtained] = useState(false);
    const navigate = useNavigate();
   
    const handleLocationRequest = () => {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
    
              // Use OpenCage Geocoding API to get city and state from latitude and longitude
              const apiKey = '9681afafd27c4f2c8d03f4cfb109b9e8';
              const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;
    
              try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                console.log(data);
                if (data.results.length > 0) {
                  const addressComponents = data.results[0].components;
                  setCity(addressComponents.city || '');
                  setState(addressComponents.state || '');
                }
              } catch (error) {
                console.error('Error fetching location data:', error);
              }
    
              setLocation({ latitude, longitude });
              setIsLocationObtained(true);
            },
            (error) => {
              console.error('Error getting location:', error.message);
            }
          );
        } else {
          console.error('Geolocation is not supported by this browser.');
        }
      };
    const handleSubmit = () => {
      const loggedInUser = localStorage.getItem('user');
      const foundUser = JSON.parse(loggedInUser);
        console.log(location);
        // Create a JSON object from the form data
        const formData = {
            businessname,
            businessdescription,
            contactnumber,
            city,
            state,
            uid:foundUser.userId,
            latitude : location.latitude,
            longitude : location.longitude,
            
        };
    console.log(formData);
        // Save the form data to localStorage
        localStorage.setItem('businessProfile', JSON.stringify(formData));
        const test = localStorage.getItem('businessProfile');
        const test2 = JSON.parse(test);
        console.log(test2);
        fetch(`http://localhost:3001/businessprofile/${foundUser.userId}`, {
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
            console.log("Done");
            navigate("/businesshome");
          })
          .catch((error) => {
            setErrorMessage('Try again later ' + error.message);
          });
        // Navigate to the next page
        
    }
    
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
                                    id="businessname"
                                    name="businessname"
                                    label="Business Name"
                                    fullWidth
                                    onChange={(e) => setBusinessname(e.target.value)}
                                    autoComplete="given-name"
                                    variant="standard"
                                />
                            </Grid>
                            
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id="businessdescription"
                                    name="businessdescription"
                                    label="Business Description"
                                    fullWidth
                                    onChange={(e) => setBusinessdescription(e.target.value)}
           
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
                                    value={contactnumber}
                                    onChange={(e) => setContactnumber(e.target.value)}

                                    type='number'
                                    variant="standard"
                                />
                            </Grid>
                            
                            <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
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
            value={state}
            onChange={(e) => setState(e.target.value)}
            fullWidth
            variant="standard"
          />
        </Grid>
        </Grid>
        <Button
          size="large"
          fullWidth
          type="button"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleLocationRequest}
          disabled={isLocationObtained}
        >
          Request Location
        </Button>
        <Button
          size="large"
          fullWidth
          type="button"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSubmit}
          disabled={!isLocationObtained}
        >
          Next
        </Button>
      </Paper>

                <Copyright />
            </Container>
            </ThemeProvider>
        </React.Fragment>
    );
}