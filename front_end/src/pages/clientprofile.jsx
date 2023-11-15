import * as React from 'react';
import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

function ErrorTypography(props) {
  return (
    <Typography variant="body2" color="error" {...props}>
      {props.children}
    </Typography>
  );
}

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

export default function Clientprofile() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [contactnumber, setContactnumber] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const handleSubmit = () => {
    // Validation checks
    if (!firstname || !lastname || !contactnumber || !city || !state) {
      setSuccessMessage('');
      setErrorMessage('Please fill in all fields.');
      return;
    }

    if (!/^\d{10}$/.test(contactnumber)) {
      setSuccessMessage('');
      setErrorMessage('Please enter a valid 10-digit contact number.');
      return;
    }

    // Reset error messages
    setSuccessMessage('');
    setErrorMessage('');

    // Create a JSON object from the form data
    const formData = {
      first_name: firstname,
      last_name: lastname,
      contact_number: contactnumber,
      city,
      state,
    };
    const loggedInUser = localStorage.getItem('user');
    const foundUser = JSON.parse(loggedInUser);
    // Send formData to the backend
    fetch(`http://localhost:3001/clientprofile/${foundUser.userId}`, {
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
        console.log("Done")
        setSuccessMessage('Client profile details updated!');
        navigate("/clienthome");
      })
      .catch((error) => {
        setErrorMessage('Try again later ' + error.message);
      });
  };

  const reset = () => {
    localStorage.removeItem('user');
    navigate("/login");
  };

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
          >
            Welcome! Complete your <br />User profile
          </Typography>

          <Paper
            variant="outlined"
            sx={{
              my: { xs: 3, md: 4 },
              p: { xs: 2, md: 5 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <Avatar
              src="/broken-image.jpg"
              align="center"
              sx={{
                width: '100px',
                height: '100px',
              }}
            />

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="first_name"
                  name="first_name"
                  label="First Name"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  error={!!errorMessage}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="last_name"
                  name="last_name"
                  label="Last Name"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  error={!!errorMessage}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  id="contact_number"
                  name="contact_number"
                  label="Contact Number"
                  value={contactnumber}
                  onChange={(e) => setContactnumber(e.target.value)}
                  fullWidth
                  autoComplete="phone"
                  variant="standard"
                  error={!!errorMessage}
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
                  error={!!errorMessage}
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
                  error={!!errorMessage}
                />
              </Grid>

              {errorMessage && (
                <Grid item xs={12}>
                  <ErrorTypography>{errorMessage}</ErrorTypography>
                </Grid>
              )}

              <Button
                size="large"
                fullWidth
                type="button"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Next
              </Button>

              <Button
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={reset}
              >
                Logout
              </Button>
            </Grid>
          </Paper>
          {/* ... (unchanged code) ... */}
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}
