import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import RazorpayPaymentButton from "../components/PaymentButton";
import BasicModal from "../components/giverating";
import LocationComponent from './location';
import Navbar from '../components/navbar';
import StickyFooter from '../components/footer';
import ChatIcon from '@mui/icons-material/Chat';
const customTheme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
  spacing: 8,
});

const ServicePage = () => {
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const [serviceData, setServiceData] = useState({});
  const [ratingsData, setRatingsData] = useState({});
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/servicepage/${serviceId}`);
        const data = await response.json();
        setServiceData(data.serviceData[0]);
        setRatingsData(data.ratingsData[0]);
        setRating(data.ratingsData[0].Rating || 0);
      } catch (error) {
        console.error('Error fetching service data:', error);
      }
    };

    fetchServiceData();
  }, [serviceId]);

  const reset = () => {
    localStorage.removeItem('user');
    navigate("/login");
  };

  return (
    <ThemeProvider theme={customTheme}>
      <div>
        <Navbar />
        <Grid container spacing={4} sx={{ margin: '64px', display: 'flex' }}>
          <Grid item className='picturedescription'>
            <Card sx={{ maxWidth: 800 }}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: '500' }}>
                    Description
                  </Typography>
              
                    <Typography variant="body1" color="initial">
                                  <CardContent>
                                    <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: '500' }}>
                                      Description
                                    </Typography>
                                   
                                    <Typography variant="body1" color="initial">
                                      {serviceData.Servicedescription}
                                    </Typography>
                                  </CardContent>
                                    
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item className='servicenameandseller' ml={4} sx={{ flexGrow: 1, order: 1 }}>
            <Card>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h4" component="div" sx={{ fontWeight: '500' }}>
                    {serviceData.Servicename}
                  </Typography>
                  <Grid container sx={{ display: 'flex', alignItems: 'center' }} >
                    <Rating name="read-only" value={rating} readOnly size='small' sx={{ marginTop: '-8px' }} />
                    <Typography variant='body3' color='textSecondary' sx={{ marginBottom: '5px' }}>
                      ({ratingsData.Numberofratings || 0} ratings)
                    </Typography>
                  </Grid>
                  <Grid item style={{ display: 'flex', alignItems: 'center', marginTop: '4px', justifyContent: 'space-between' }}>
                    <Grid container sx={{ alignItems: 'center', justifyContent: 'start' }}>
                      <Typography variant="body1" sx={{ fontWeight: '500', mr: '8px' }}>
                        From
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: '500' }}>
                        ₹{serviceData.Price}
                      </Typography>
                    </Grid>
                    <Grid item sx={{ display: 'flex' }}>
                      <Typography variant="body2" color="grey" sx={{ display: 'inline' }}>{serviceData.City}</Typography>
                      <Typography variant="body2" color="grey" sx={{ display: 'inline', marginRight: '8px' }}>,</Typography>
                      <Typography variant="body2" color="grey" sx={{ display: 'inline' }}>{serviceData.State}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </CardActionArea>
            </Card>
            <Grid item mt={2} pb={16}>
              <Card>
                <CardContent>
                  <Grid sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ bgcolor: '#6f0094', mr: '8px' }} aria-label="recipe">
                      R
                    </Avatar>
                    <Typography variant="h6" sx={{ color: 'initial' }}>
                      {serviceData.Businessname}
                    </Typography>
                  </Grid>
                  <Grid mt={2}>
                    <Stack direction="row" spacing={4}>
                      <Button variant="outlined" startIcon={<ChatIcon />}>
                        Chat with Business
                      </Button>
                      <RazorpayPaymentButton amount={serviceData.Price} />
                      <BasicModal />
                    </Stack>
                    <Grid item xs={12} sm={12} mt={2}>
                      <Typography variant="body2" color="initial" sx={{ display: 'inline' }}> Ph No: </Typography>
                      <Typography variant="body2" color="initial" sx={{ display: 'inline' }} > {serviceData.Phone}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item mt={2} pb={16}>
              <LocationComponent />
            </Grid>
          </Grid>
        </Grid>
        <StickyFooter />
      </div>
    </ThemeProvider>
  );
};

export default ServicePage;
