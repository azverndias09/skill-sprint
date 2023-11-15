import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from "@mui/material";
import StickyFooter from '../components/footer';
import { Link, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

const CreateAd = () => {
  const navigate = useNavigate();
  const [servicename, setServiceName] = useState('');
  const [servicedescription, setServiceDescription] = useState('');
  const [price, setPrice] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);

  const gotoHomepage = () => {
    navigate("/businesshome");
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };

      reader.readAsDataURL(file);

      // Save the image file
      setUploadedImage(file);
    }
  };

  useEffect(() => {
    console.log("Service Name:", servicename);
    console.log("Service Description:", servicedescription);
    console.log("Price:", price);
  }, [servicename, servicedescription, price]);

  const handlePostClick = async () => {
    let loggedInUser = localStorage.getItem('user');
    let foundUser = JSON.parse(loggedInUser);
  
    const requestData = {
      servicename,
      servicedescription,
      price: Number(price),
      uid: foundUser.userId,
    };
  
    console.log(requestData);
  
    try {
      // Step 1: Send textual data
      const textResponse = await fetch(`http://localhost:3001/createad/${foundUser.userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      if (!textResponse.ok) {
        console.error('Error creating service:', textResponse.statusText);
        return;
      }
  
      console.log('Textual data sent successfully.');
  
      // Step 2: Send image data
      if (uploadedImage) {
        const imageForm = new FormData();
        imageForm.append('image', uploadedImage);
  
        const imageResponse = await fetch(`http://localhost:3001/uploadimage/${foundUser.userId}`, {
          method: 'POST',
          body: imageForm,
        });
  
        if (!imageResponse.ok) {
          console.error('Error uploading image:', imageResponse.statusText);
        } else {
          console.log('Image uploaded successfully.');
        }
      }
  
      // Navigate after both textual data and image are sent
      navigate("/businesshome");
  
    } catch (error) {
      console.error('Error creating service:', error.message);
    }
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={customTheme}>
        <AppBar position="absolute" elevation={0} sx={{ position: 'relative', backgroundColor: '#f5f5f5', borderBottom: '#f5f5f5' }}>
          <Toolbar sx={{ justifyContent: 'start' }}>
            <Button size="large" startIcon={<ArrowBackIcon />} onClick={gotoHomepage} sx={{}}></Button>
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
              backgroundColor: '#f5f5f5'
            }}>

            <Paper variant='outlined'
              sx={{
                p: { xs: 2, md: 10 },
                marginBottom: '32px'
              }}>

              <Button component="label" variant="default" startIcon={<AddAPhotoIcon />}>
                Upload picture
                <VisuallyHiddenInput type="file" onChange={handleImageChange} />
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
                  value={servicename}
                  onChange={(e) => setServiceName(e.target.value)}
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
                  value={servicedescription}
                  onChange={(e) => setServiceDescription(e.target.value)}
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
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Grid>

              <Button size='large' fullWidth type="button" variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handlePostClick}>
                Post
              </Button>
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

export default CreateAd;
