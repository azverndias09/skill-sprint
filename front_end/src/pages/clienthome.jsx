import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ServiceCard from '../components/servicecard';
import Navbar from '../components/navbar';
import SortButton from '../components/sortbutton';
import StickyFooter from '../components/footer';

const ClientHome = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [sort, setSort] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3001/clienthome`)
      .then((response) => response.json())
      .then((data) => setServices(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Sort the services array based on the selected option
  let sortedServices = services.slice(); // Create a copy to avoid mutating the original array

  if (sort === 'priceLowToHigh') {
    sortedServices.sort((a, b) => a.price - b.price);
  } else if (sort === 'priceHighToLow') {
    sortedServices.sort((a, b) => b.price - a.price);
  }

  const handleSortChange = (selectedSort) => {
    setSort(selectedSort);
  };

  return (
    <Box>
      <Navbar />

      <Box sx={{ margin: '64px' }}>
        <Grid container justifyContent="end">
          <SortButton onChange={handleSortChange} />
        </Grid>

        <Grid container spacing={2} flex={4} py={4} sx={{ display: 'flex', justifyContent: 'start', wrap: true }}>
          {sortedServices.map((service) => (
            <Grid item key={service.SId} xs={12} md={3}>
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
    </Box>
  );
};

export default ClientHome;
