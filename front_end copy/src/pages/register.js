import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
//import './background.css';

import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles} from '@mui/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Alert from '@mui/material/Alert';
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
            paper: '#000003',
        },
        text: {
            primary: '#ffffff', // Set primary text color to white
        },
    },
        
    
    spacing: 8,
});

const useStyles = makeStyles((theme) => ({
    whiteText: {
        color: 'white',
    },
   

    
    whiteRadio: {
        '& .MuiRadio-root': {
            color: 'white',
        },
    },
    whiteTextField: {
        '& .MuiInputBase-input': {
            color: 'white',
        },
    },




}));




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
    const [userType, setSelectedValue] = useState(''); // State to hold the selected value
    const classes = useStyles();

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
            body: JSON.stringify({ name, email, password ,userType}),

        });

        // console.log(response);
           if (response.ok) {
        //if (true) {
            console.log("registration done brother");
            let userTemp={
                name,
                email,
                userType,
            };
            setUser(userTemp);
            localStorage.setItem('user',JSON.stringify(user));
            console.log(user);
            const data=JSON.parse(localStorage.getItem('user'));
            console.log("data");
               console.log(data);

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

    

        const handleRadioChange = (event) => {
            setSelectedValue(event.target.value);
        };

   

    return (
        <ThemeProvider theme={customTheme}>
            {/* <div className='background-container'> */}
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
                        backgroundImage: 'url(/artifact.gif)',
                        backgroundRepeat: 'no-repeat',
                        // backgroundColor: (t) =>
                        //      t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],

                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                    >
            

                    <Box
                       
                        component="img"
                        sx={{
                            height: 500,
                            width: 500,
                            // maxHeight: { xs: 233, md: 167 },
                            // maxWidth: { xs: 400, md: 250 },
                            // justifyContent: 'center',
                            // alignItems: 'center',
                            //textAlign: 'center',
                            

                        }}
                        
                        src="/skillsprintlogo3.png"
                    />

                 </Grid>
                <Grid item xs={12} sm={8} md={5}  elevation={20} square 
                    
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
                        <Typography component="h1" variant="h4" className={classes.whiteText}>
                            Sign in to SkillSprint®
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
                            <br></br>
                            <br></br>

                            <FormControl
                                required
                                disabled={!isRegistered || emailError || (!isPasswordValid && hasTypedPassword) || (!otpVerified && otpVerificationAttempted)}
                                >
                                <FormLabel  id="demo-row-radio-buttons-group-label"
                                sx={{
                                    color:'black'
                                }}>
                                Register As</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    value={userType} // Set the selected value
                                    onChange={handleRadioChange} // Update selected value

                                >
                                    <FormControlLabel value="Client" control={<Radio />} label="Client" />
                                    <FormControlLabel value="Business" control={<Radio />} label="Business" />
                                    
                                 
                                </RadioGroup>
                            </FormControl>
                            
                            <Button
                                
                                type="button"
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
                            {isRegistered && <Alert severity="success">You have successfully registered!</Alert>}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            {/* </div> */}
        </ThemeProvider>

    );
};

export default Register;