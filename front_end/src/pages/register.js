import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './AnimatedBackground.css';
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
        fontFamily: 'Nunito, sans-serif',
    },

    spacing: 8,
});





const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState(null);
    const [testOtp, setTestOtp] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(null);
    const [focused, setFocused] = useState(false);
    const [hasTypedPassword, setHasTypedPassword] = useState(false);
    const [showOTPInput, setShowOTPInput] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [otpVerificationAttempted, setOtpVerificationAttempted] = useState(false);

    const [user, setUser] = useState();


    const handlePasswordChange = (value) => {
        setPassword(value);
        setHasTypedPassword(true);
        setIsPasswordValid(value.length >= 6);
    };

    const handleEmailChange = (value) => {
        setEmail(value);
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        setEmailError(!isValidEmail);
    };


    const handleRegister = async () => {
        const response = await fetch('http://localhost:3001/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),

        });

        // console.log(response);
           if (response.ok) {
        //if (true) {
            console.log("registration done brother");

            navigate('/login');

        }
        else {
            console.error("no bro check code");
        }
        //     console.log(response);
    };

    // const form = useRef();

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
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    // className='new-background'
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                    >
            

                    <Box
                        component="img"
                        sx={{
                            height: 233,
                            width: 600,
                            maxHeight: { xs: 233, md: 167 },
                            maxWidth: { xs: 400, md: 250 },
                            // justifyContent: 'center',
                            // alignItems: 'center',
                            textAlign: 'center',
                            

                        }}
                        alt="The house from the offer."
                        src="/skillsprint.png"
                    />

                 </Grid>
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
                        <Typography component="h1" variant="h5">
                            Register
                        </Typography>


                        <Box component="form" noValidate sx={{ mt: 1 }}>

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Name"
                                type="text"
                                name="user_name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            //variant="outlined"
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
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => handlePasswordChange(e.target.value)}
                                onFocus={() => setFocused(true)}
                                onBlur={() => setHasTypedPassword(true)}
                                error={emailError || (focused && !isPasswordValid)}
                                helperText={
                                    emailError
                                        ? 'Invalid email address'
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

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleRegister}
                                disabled={!isRegistered || emailError || (!isPasswordValid && hasTypedPassword) || (!otpVerified && otpVerificationAttempted)} // Disable the button based on conditions
                            >
                                Register
                            </Button>

                            <Grid container>
                                <Grid item>

                                    <Link to="/login" variant='body2'>Already Registered? Login here</Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                            {isRegistered && <p>You have successfully registered!</p>}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>

    );
};

export default Register;