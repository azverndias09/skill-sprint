import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

//  import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
        fontFamily: 'Roboto, sans-serif',
    },
});

const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
);

const Reset = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);


    useEffect(() => {
        if (passwordResetSuccess == true) {
            console.log("hello")
            // const goLogin = async () => { await delay(1500);  }
            // goLogin();
            navigate("/login");
        }

    }, [passwordResetSuccess]);

    const handleReset = async () => {

        // if (username === 'user' && password === 'password') {
        //     setIsLoggedIn(true);
        // }

        // const response = await fetch('http://localhost:3001/resetpass', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ username, password }),

        // });

        // console.log(response);
        //   if (response.ok) {
        if (true) {
            console.log("Reset Password done brother");
            setPasswordResetSuccess(true);



        }
        else {
            console.error("no bro check code");
        }
        // console.log(response);
    };



    return (
        <ThemeProvider theme={customTheme}>
            <Grid container component="main" sx={{ height: '100vh',justifyContent: 'center', alignItems: 'center' }}>
                <CssBaseline />

                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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

                        <Typography component="h1" variant="h5">Reset Password</Typography>
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
                                label="New Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleReset}>
                                Reset Password
                            </Button>
                            {passwordResetSuccess && (
                                <Typography
                                    variant="body2"
                                    style={{ color: 'green', marginTop: '8px' }}
                                >
                                    Password reset successfully!
                                </Typography>
                            )}
                            <Grid container spacing={8}>

                                <Grid item>
                                    <Link to="/register" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link to="/login" variant="body2">
                                        {"Have one? Login "}
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

export default Reset;
