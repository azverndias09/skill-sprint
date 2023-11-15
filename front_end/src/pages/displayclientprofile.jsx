import * as React from 'react';
import { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from '../components/navbar';
import StickyFooter from '../components/footer';

function Displayclientprofile() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    const foundUser = JSON.parse(loggedInUser);

  
    setFirstname(foundUser.name.split(' ')[0] || ''); 
    setLastname(foundUser.name.split(' ')[1] || ''); 
    setEmail(foundUser.email || ''); 



  }, []);
    

  const customTheme = createTheme({
    typography: {
      fontFamily: 'Poppins, sans-serif',
    },
    palette: {
      mode: 'light',
      primary: {
        main: '#1976D2',
      },
      secondary: {
        main: '#388E3C',
      },
      background: {
        default: '#FFFFFF',
        paper: '#F5F5F5',
      },
      text: {
        primary: '#000000',
        secondary: '#616161',
      },
    },
  });

  return (
    <React.Fragment>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
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
              justifyContent: 'center',
            }}
          >
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <img
                src="/skillsprint.png"
                alt="Logo"
                style={{
                  width: '360px',
                  height: '100px',
                }}
              />
            </Grid>
          </Toolbar>
        </AppBar>

        <br />
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Typography
            component="h1"
            variant="h4"
            align="center"
            fontWeight="semibold"
            p={4}
          >
            SkillSprint Profile
          </Typography>

          <Paper
            variant="outlined"
            sx={{
              m: { xs: 4, md: 2 },
              px: { xs: 4, md: 4 },
              py: { xs: 4, md: 6 },
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Grid container py={6} sx={{ justifyContent: 'center' }}>
              <Avatar
                src="/broken-image.jpg"
                sx={{
                  width: '100px',
                  height: '100px',
                }}
              />
            </Grid>

            <Grid container spacing={3} pr={4} pl={4}>
              <Grid container pb={4} sx={{ textAlign: 'center' }}>
                <Grid item xs={12} sm={12}>
                  <Typography variant="h5" color="initial" sx={{ display: 'inline' }}>
                    {firstname}
                  </Typography>
                  <Typography variant="h5" color="initial" sx={{ display: 'inline' }}>
                    {lastname}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography variant="h6" color="textSecondary">
                    @{email}
                  </Typography>
                </Grid>
              </Grid>

              <Grid container spacing={1}>
                <Grid item xs={12} sm={6} sx={{ justifyContent: 'flex-start' }}>
                  <Typography variant="h6" color="initial" p={1}>
                    Email
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ textAlign: 'end' }}>
                  <Typography variant="h6" color="textSecondary" p={1}>
                    {email}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6} sx={{}}>
                  <Typography variant="h6" color="initial" p={1}>
                    City
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ textAlign: 'end' }}>
                  <Typography variant="h6" color="textSecondary" p={1}>
                    {city}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6} sx={{ justifyContent: 'flex-start' }}>
                  <Typography variant="h6" color="initial" p={1}>
                    State
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ textAlign: 'end' }}>
                  <Typography variant="h6" color="textSecondary" p={1}>
                    {state}
                  </Typography>
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

export default Displayclientprofile;