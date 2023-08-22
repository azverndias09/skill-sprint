import React from 'react';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate();

  const reset = () => {
    localStorage.removeItem('user');
    navigate("/login");
  }

  return (
  
      <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={reset}>
        Logout
      </Button>
   
  );
};

export default Home;
