import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import emailjs from '@emailjs/browser';
const Register = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState(null);
    const [testOtp, setTestOtp] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const [showOTPInput, setShowOTPInput] = useState(false);

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
            body: JSON.stringify({ name,email, password }),

        });

        console.log(response);
        if (response.ok) {
            console.log("registration done brother");

        }
        else {
            console.error("no bro check code");
        }
        console.log(response);
    };

    const form = useRef();

    const sendOTP = (e) => {
        const newGeneratedOtp = Math.floor(1000 + Math.random() * 9000);
        setGeneratedOtp(newGeneratedOtp);
        console.log(newGeneratedOtp);
        e.preventDefault();

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
       /// setShowOTPInput(true);

    };

    const handleVerifyOTP = () => {
        if (testOtp == generatedOtp) {
            console.log("OTP is correct!");
            setIsRegistered(true);
        } else {
            console.log("OTP is incorrect!");
            console.log(generatedOtp);
            console.log(testOtp);

        }
    };

    return (
        <>
            <h1>Register</h1>
            <form ref={form} onSubmit={sendOTP}>
                <div>
                    <TextField
                        label="Name"
                        type="text"
                        name="user_name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        variant="outlined"
                    />
                </div>
                <div>
                    <TextField
                        label="Email"
                        type="text"
                        name="user_email"
                        value={email}
                        onChange={(e) => handleEmailChange(e.target.value)}
                        variant="outlined"
                        error={emailError} // Use the emailError state to control error display
                        helperText={emailError ? 'Invalid email address' : ''}

                    />
                </div>
                <div>
                    <TextField
                        label="Password"
                        type="password"         
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        variant="outlined"
                        disabled={!isRegistered}
                    />
                </div>
                {!showOTPInput && (
                    <Button variant="contained" color="primary" disabled={emailError} onClick={sendOTP}>
                        Send OTP
                    </Button>
                )}
            </form>
            {showOTPInput && (
                <div>
                    <TextField
                        label="Enter OTP"
                        variant="outlined"
                        value={testOtp}
                        onChange={(e) => setTestOtp(e.target.value)}
                    />
                    <Button variant="contained" color="primary" onClick={handleVerifyOTP}>
                        Verify
                    </Button>
                </div>
            )}
            <Button onClick={handleRegister} disabled={!isRegistered}>
                Register
            </Button>
            <h1>Already Registered? </h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/login">Login here</Link>
                    </li>
                </ul>
            </nav>
            {isRegistered && <p>You are logged in!</p>}
        </>
    );
};

export default Register;