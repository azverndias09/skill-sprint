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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import {styled} from "@mui/material";


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


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});



export default function CreateAd() {
 

    return (

        <React.Fragment>
            <ThemeProvider theme={customTheme}>

                <AppBar
                    position="absolute"
                    
                    elevation={0}
                    sx={{
                        position: 'relative',
                        backgroundColor: '#f5f5f5',
                        borderBottom: '#f5f5f5',
                    }}
                >
                    <Toolbar
                        sx={{
                            justifyContent: 'start'
                        }}>

                        <Button size='large' startIcon={<ArrowBackIcon />}
                            sx={{
                            }}>
                        
                        </Button>

                           
                      
                    </Toolbar>
                    
                </AppBar>

                <br />
                <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                    <Typography component="h1" variant="h4" align="center" fontWeight="semibold">
                            Post Your Ad
                    </Typography>


                    <Paper variant="outlined" 
                        sx={{
                            my: { xs: 3, md: 4 },
                            p: { xs: 2, md: 5 },
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            backgroundColor:'#f5f5f5'
                        }}>

                        <Paper  variant='outlined' 
                        sx={{
                            p: { xs: 2, md: 10 },
                            marginBottom:'32px'
                        }}> 
                      
            

                            <Button component="label" variant="default" startIcon={<AddAPhotoIcon />}>
                                Upload picture
                                <VisuallyHiddenInput type="file" />
                            </Button> 
                         </Paper>

                        <Grid container spacing={3}>
                            <Grid item xs={12} >

                                <TextField
                                    required
                                    id="servicename"
                                    name="servicename"
                                    label="Service Name"
                                    fullWidth
                                    variant="standard"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id="servicedescription"
                                    name="servicedescription"
                                    label="Service Description"
                                    fullWidth
                                    variant="outlined"  
                                    multiline  
                                    rows={5}
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    required
                                    type='number'
                                    id="price"
                                    name="price"
                                    label="Price"
                                    fullWidth
                                    variant="standard"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                ₹ 
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            

                            <Button size='large' fullWidth type="button" variant="contained" sx={{ mt: 3, mb: 2 }} >
                                Post
                            </Button>





                        </Grid>



                    </Paper>
                    <Copyright />
                </Container>
            </ThemeProvider>
        </React.Fragment>
    );
}