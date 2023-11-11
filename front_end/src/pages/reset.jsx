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
import { makeStyles } from '@mui/styles';
//import { Card, CardContent } from '@mui/material';
import emailjs from '@emailjs/browser';


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
    },

    palette: {
       mode: 'dark',
        primary: {
            main: '#82cbe8', // Set primary color to white
        },
        background: {
            default: '#0f0926',
            Card: '#0f0926',
        },
        text: {
            primary: '#ffffff', // Set primary text color to white
        },
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
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [focused, setFocused] = useState(false); 
    const [isRegistered, setIsRegistered] = useState(false);
    const [showOTPInput, setShowOTPInput] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [otpVerificationAttempted, setOtpVerificationAttempted] = useState(false);

   // const classes = useStyles();


    useEffect(() => {
        console.log(passwordResetSuccess);
        if (passwordResetSuccess == true) {
            console.log("kys")
           
            navigate("/login");
        }

    }, [passwordResetSuccess]);

    const handleEmailChange = (value) => {
        setEmail(value);
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        setEmailError(!isValidEmail);
    };

    const handleReset = async () => {

        // if (username === 'user' && password === 'password') {
        //     setIsLoggedIn(true);
        // }

        const response = await fetch('http://localhost:3001/resetpass', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),

        });

        console.log(response);
          if (response.ok) {
     
            console.log("Reset Password done brother");
           setPasswordResetSuccess(true);



        }
        else {
            console.error("no bro check code");
        }
        // console.log(response);
   
    };

    const sendOTPTest = (e) => {
        const newGeneratedOtp = Math.floor(1000 + Math.random() * 9000);
        setGeneratedOtp(newGeneratedOtp);
        console.log("hello");
        console.log(newGeneratedOtp);
        //e.preventDefault();
        console.log("hello");
        const templateParams = {
            user_name: name,
            user_email: email,
            message: newGeneratedOtp,
        };



        emailjs
            .send('service_5dqwn3h', 'template_309hj8f', templateParams, 'fg0vs7jHRI7Fm0CsK')
            .then(
                (result) => {

                    setShowOTPInput(true);
                },
                (error) => {
                    //error stuff here
                }
            );
        //   setShowOTPInput(true);

    };

    const handleVerifyOTP = () => {
        if (testOtp == generatedOtp) {
            console.log("OTP is correct!");
           setIsRegistered(true);
            setOtpVerified(true); // Set OTP verification success
        } else {
            console.log("OTP is incorrect!");
            setOtpVerified(false); // Set OTP verification failure
        }
        setOtpVerificationAttempted(true); // Indicate that OTP verification was attempted
    };


    return (
        <ThemeProvider theme={customTheme}>
            <Grid container component="main" sx={{
                display:'flex',
                height: '120vh', justifyContent: 'center', alignItems: 'center', backgroundColor: '#84c2f5',
                backgroundImage:  'url(/artifact.gif)',
                backgroundRepeat: 'no-repeat',
                backgroundSize:'cover'


             }}>


                <Box item xs={12} sm={8} md={5} elevation={6} m={4} mb={4}
                sx={{
                    backgroundColor:'#0f0926',
                    borderRadius: '16px',
                    justifyContent:'center'
                }} >

                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                           
                            
                        }}
                    >
                        {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar> */}

                        <Grid item xs={12} sm={6} md={4} lg={3}
                        sx={{
                           display:'flex',
                           justifyContent:'center',
                            
                        }}>
                            <img src="/skillsprint.png" alt="Logo"
                             style={{
                                 width: '430px',
                                  height: '130px',
                                
                                
                                  }} />
                        </Grid>

                        <Typography  variant="h5" color='white'>Reset Password</Typography>
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
                                label="Email"
                                type="text"
                                name="user_email"
                                value={email}
                                onChange={(e) => handleEmailChange(e.target.value)}
                                //variant="outlined"
                                error={emailError} // Use the emailError state to control error display
                                helperText={emailError ? 'Invalid email address' : ''}

                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="New Password"
                                type="password"
                                value={password}
                                onChange={(e) => handlePasswordChange(e.target.value)}
                                onFocus={() => setFocused(true)}
                                onBlur={() => setHasTypedPassword(true)}
                                error={emailError || (focused && !isPasswordValid)}
                                helperText={
                                    emailError
                                        ? 'Invalid password'
                                        : focused && !isPasswordValid
                                            ? 'Password should be at least 6 characters long'
                                            : ''
                                } // Display error message for password after focus
                                
                                disabled={!isRegistered}
                            />
                            {!showOTPInput && (
                                <Button variant="contained" color="primary" disabled={emailError} onClick={sendOTPTest}>
                                    Send OTP
                                </Button>
                            )}



                            {showOTPInput && (
                                <div>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Enter OTP"
                                        variant="outlined"
                                        value={testOtp}
                                        onChange={(e) => setTestOtp(e.target.value)}
                                    />
                                    <Button variant="contained" color="primary" onClick={handleVerifyOTP}>
                                        Verify
                                    </Button>
                                    {otpVerificationAttempted && (
                                        <Typography
                                            variant="body2"
                                            style={{ color: otpVerified ? 'green' : 'red', marginTop: '8px' }}
                                        >
                                            {otpVerified ? 'OTP verified successfully' : 'Try again'}
                                        </Typography>
                                    )}
                                </div>
                            )}















                            <Button type="button" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleReset}>
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
                            <Grid container spacing={8} justifyContent='space-between'>

                                <Grid item>
                                    <Typography variant="body2" >
                                    <Link to="/register" >
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                    </Typography>
                                </Grid>
                                <Grid item >
                                    <Link to="/login" variant="body2">
                                        {"Have one? Login "}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />

                        </Box>
                    </Box>
                </Box>
            </Grid>
        </ThemeProvider>


    );
};



export default Reset;
