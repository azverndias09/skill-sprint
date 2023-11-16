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
  const [searchTerm, setSearchTerm] = useState('');
  const [originalServices, setOriginalServices] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loggedInUser = localStorage.getItem('user');
        const foundUser = JSON.parse(loggedInUser);
        console.log(foundUser);
        const response = await fetch(`http://localhost:3001/clienthome/${foundUser.userId}`, {
          method: 'GET', // or 'GET' depending on your API requirements
          headers: {
            'Content-Type': 'application/json',
          },
        
        });
        const data = await response.json();
        setServices(data.distances);
        setOriginalServices(data.distances);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []); // Run only once on mount

  useEffect(() => {
    if (originalServices.length > 0) {
      let updatedServices = [...originalServices];

      if (sort === 'priceLowToHigh') {
        updatedServices.sort((a, b) => a.Price - b.Price);
      } else if (sort === 'priceHighToLow') {
        updatedServices.sort((a, b) => b.Price - a.Price);
      } else if (sort === 'distance') {
        // Sort by distance using the 'distance' property
        updatedServices.sort((a, b) => a.distance - b.distance);
      }

      // Filter services based on search term
      if (searchTerm.trim() !== '') {
        updatedServices = updatedServices.filter((service) =>
          service.Servicename.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Update the state with the filtered or sorted services
      setServices(updatedServices);
    }
  }, [originalServices, sort, searchTerm]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setServices(originalServices);
    }
  }, [searchTerm, originalServices]);

  const loggedInUser = localStorage.getItem('user');
  const foundUser = JSON.parse(loggedInUser);
  const userFirstNameInitial = foundUser.name.charAt(0);

  const handleSortChange = (selectedSort) => {
    setSort(selectedSort);
  };

  return (
    <Box>
      <Navbar
        userFirstNameInitial={userFirstNameInitial}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />

      <Box sx={{ margin: '64px' }}>
        <Grid container justifyContent="end">
          <SortButton onChange={handleSortChange} />
        </Grid>

        <Grid
          container
          spacing={2}
          flex={4}
          py={4}
          sx={{ display: 'flex', justifyContent: 'start', wrap: true }}
        >
          {services.map((service) => (
            <Grid item key={service.SId} xs={12} md={3}>
              <Link
                to={`/service/${service.SId}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
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
