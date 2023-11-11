import React, { Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import { CardHeader } from '@mui/material'
import { Avatar } from '@mui/material';
import Stack from '@mui/material/Stack';



import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

import ChatIcon from '@mui/icons-material/Chat';
import PaymentIcon from '@mui/icons-material/Payment';


import Navbar from '../components/navbar';
import StickyFooter from '../components/footer';

const customTheme = createTheme({
    typography: {
        fontFamily: 'Poppins, sans-serif',
    },
    spacing: 8,

});


const ServicePage = () => {
    const navigate = useNavigate();
    //const [user, setUser] = useState();
    const reset = () => {
        localStorage.removeItem('user');
        navigate("/login");
    }

    const [rating, setRating] = React.useState(4);
    

    return (

        <ThemeProvider theme={customTheme}>

           
            <Box bgcolor={"background.default"} color={"text.primary"}>
                <Navbar />
            </Box>



            <Box main sx={{ margin:'64px' , display:'flex', }}>
                
                
                <Grid className='picturedescription' >
                    <Card sx={{ maxWidth: 800 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="560"
                                
                                image="/freelancing.jpg"
                                alt="freelancing picture"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" sx={{fontWeight:'500'}}>
                                    Description
                                </Typography>
                                <Typography variant="body1" color="initial">
                                    Royal Event Planners is a premier event management company that delivers
                                     exceptional experiences for its clients. 
                                     With a proven track record of successfully executed events, 
                                     our team of experts provides personalized service, creative ideas, 
                                     and strong vendor relationships to ensure that your event runs smoothly 
                                     and exceeds your expectations. Whether it's a corporate conference,
                                    social celebration, or outdoor festival, we'll work closely with you
                                    to design and execute a flawless event that fits your vision and budget.<br />
                                    
                                    Why choose Royal Event Planners?<br />

                                    -Personalized service and attention to detail<br/>
                                    -Creativity and innovative ideas<br />
                                    -Strong relationships with vendors and suppliers<br />
                                    -Budget-friendly solutions without compromising quality<br />
                                    -Flexibility and adaptability to accommodate last-minute changes or unexpected challenges<br />
                                    Let us help you make your next event a royal success!
                                    
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
                                Event Planning
                            </Typography>

                            
                                
                               
                            <Grid container sx={{ display: 'flex', alignItems: 'center' }} >
                                <Rating name="read-only" value={rating} readOnly size='small'
                                    sx={{ marginTop: '-8px' }} />

                                <Typography variant='body3' color='textSecondary' sx={{ marginBottom: '5px' }}>(12)</Typography>
                            </Grid>

                            <Grid item style={{ display: 'flex', alignItems: 'center', marginTop: '4px', justifyContent: 'space-between' }}>
                                <Grid container sx={{ alignItems: 'center', justifyContent: 'start' }}>
                                    <Typography variant="body1" sx={{ fontWeight: '500', mr: '8px' }}>
                                        From
                                    </Typography>
                                    <Typography variant="h4" sx={{ fontWeight: '500' }}>
                                        ₹1000
                                    </Typography>
                                </Grid>

                                    

                                    <Grid item sx={{display:'flex'}}>

                                        <Typography variant="body2" color="grey" sx={{ display: 'inline' }}>Margao</Typography>
                                        <Typography variant="body2" color="grey" sx={{ display: 'inline', marginRight:'8px' }}>,</Typography>
                                        <Typography variant="body2" color="grey" sx={{ display: 'inline' }} > Goa</Typography>
                                    </Grid>
                                


                            </Grid>
                        </CardContent>
                    </CardActionArea>

                    </Card>

                    <Grid item mt={2} pb={16}>

                        <Card>
                            <CardContent>

                                <Grid sx={{display:'flex', alignItems:'center'}}>
                                <Avatar sx={{ bgcolor: '#6f0094', mr:'8px'}} aria-label="recipe">
                                    R
                                </Avatar>
                                <Typography variant="h6" sx={{ color: 'initial' }}>
                                    Royal Event Planners
                                </Typography>
                                </Grid>



                                <Grid mt={2}>
                                <Stack direction="row" spacing={4}>
                                    <Button variant="outlined" startIcon={<ChatIcon />}>
                                        Chat with Business
                                    </Button>
                                    <Button variant="outlined" endIcon={<PaymentIcon />}>
                                        Pay Business
                                    </Button>
                                </Stack>

                                    <Grid item xs={12} sm={12} mt={2}   >

                                        <Typography variant="body2" color="initial" sx={{ display: 'inline' }}> Ph No: </Typography>
                                        <Typography variant="body2" color="initial" sx={{ display: 'inline' }} > 1234567890</Typography>
                                    </Grid>

                                </Grid>
                                
  



                            </CardContent>
                        </Card>
                   
                    </Grid>
                </Grid>

            


            </Box>

            <Box className='footer' sx={{ marginTop: '-600px' }}>
                <StickyFooter />
            </Box>

            
        </ThemeProvider>

    );
};

export default ServicePage;
