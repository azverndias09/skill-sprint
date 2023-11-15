import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ServiceCard from '../components/servicecard';
import Navbar from '../components/navbar';
import SortButton from '../components/sortbutton';
import StickyFooter from '../components/footer';

const customTheme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
  spacing: 8,
});

const ClientHome = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [open, setOpen] = React.useState(true);

  useEffect(() => {
    // Fetch data from the API (localhost:3001/clienthome)
    // Make sure to replace this URL with the correct endpoint
    fetch('http://localhost:3001/clienthome')
      .then((response) => response.json())
      .then((data) => setServices(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const reset = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box bgcolor={'background.default'} color={'text.primary'}>
        <Navbar />
      </Box>

      <Box sx={{ margin: '64px' }}>
        <Grid container sx={{ justifyContent: 'end' }}>
          <SortButton />
        </Grid>

        <Grid container className="servicecards" spacing={2} flex={4} py={4} maxRows={4} sx={{ display: 'flex', justifyContent: 'start', wrap: true }}>
          {services.map((service) => (
            <Grid item key={service.SId} xs={12} md={3}>
              <ServiceCard service={service} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ marginTop: '-600px' }}>
        <StickyFooter />
      </Box>
    </ThemeProvider>
  );
};

export default ClientHome;
