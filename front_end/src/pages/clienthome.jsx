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

// ... Import statements

const ClientHome = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [sort, setSort] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3001/clienthome?sort=${sort}`)
      .then((response) => response.json())
      .then((data) => setServices(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, [sort]);

  const reset = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleSortChange = (selectedSort) => {
    setSort(selectedSort);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box bgcolor={'background.default'} color={'text.primary'}>
        <Navbar />
      </Box>

      <Box sx={{ margin: '64px' }}>
        <Grid container sx={{ justifyContent: 'end' }}>
          {/* Include the SortButton component with the handleSortChange callback */}
          <SortButton onChange={handleSortChange} />
        </Grid>

        <Grid container className="servicecards" spacing={2} flex={4} py={4} sx={{ display: 'flex', justifyContent: 'start', wrap: true }}>
          {services.map((service) => (
            <Grid item key={service.SId} xs={12} md={3}>
              {/* Wrap ServiceCard with Link */}
              <Link to={`/service/${service.SId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <ServiceCard service={service} />
              </Link>
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
