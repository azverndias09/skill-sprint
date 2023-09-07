import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
//  import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { lightBlue } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                SkillSprint
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const customTheme = createTheme({
    typography: {
        fontFamily: 'Poppins, sans-serif',
        body2: {
            color: '#69c2bf', // Set the color for the h4 variant
        },
    },
    palette: {
        mode: 'dark',
        primary: {
            main: '#82cbe8', // Set primary color to white
        },
        background: {
            default: '#0f0926',
            paper: '#000003',
        },
        text: {
            primary: '#ffffff', // Set primary text color to white
        },
    },


});

const useStyles = makeStyles((theme) => ({
    whiteText: {
        color: 'white',
    },


    whiteTextField: {
        '& .MuiInputBase-input': {
            color: 'white',
        },
    },




}));



const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState();
    const [loginError, setLoginError] = useState(null);
    const classes = useStyles();


    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        const data = JSON.parse(localStorage.getItem('user'));
        console.log(data);
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
            console.log(loggedInUser);
            setUser({});
            setUsername("");
            setPassword("");
            navigate("/home");
        }
    }, []);


    const handleLogin = async () => {

        // if (username === 'user' && password === 'password') {
        //     setIsLoggedIn(true);
        // }

        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),

        });

        // console.log(response);
        if (response.ok) {

            console.log("login done brother");
            setIsLoggedIn(true);
            let userData = { username, password };
            setUser(userData);

            localStorage.setItem('user', JSON.stringify(userData));
            console.log(userData);
        }
        else {
            console.error("no bro check code");
        }
        // console.log(response);
    };




    return (
        <ThemeProvider theme={customTheme}>

            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        display: 'flex',          // Use flexbox for vertical and horizontal centering
                        flexDirection: 'column',  // Align items vertically
                        justifyContent: 'center', // Center vertically
                        alignItems: 'center',
                        backgroundImage: 'url(/giphy.gif)',
                        backgroundRepeat: 'no-repeat',
                        // backgroundColor: (t) =>
                        //     t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <Box
                        component="img"
                        sx={{
                            height: 230,
                            width: '100%',
                            // objectFit: 'cover',
                            // maxHeight: { xs: 233, md: 167 },
                            // maxWidth: { xs: 400, md: 250 },
                            // textAlign: 'center',
                        }}
                        alt="The house from the offer."
                        src="/skillsprint.png"
                    />
                </Grid>


                <Grid item xs={12} sm={8} md={5} elevation={6} square
                // sx={{
                //     backgroundColor:'#ebf4f7',
                // }} 
                >
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>

                        <Typography component="h1" variant="h4" className={classes.whiteText}>Login</Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />


                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />


                            {loginError && <Alert severity="error" sx={{ mb: 2 }}>{loginError}</Alert>}
                            <Button type="button" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleLogin}>
                                Login
                            </Button>

                            <Grid container>
                                <Grid item xs>
                                    <Link to="/reset" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link to="/register" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />

                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>


    );
};


export default Login;
