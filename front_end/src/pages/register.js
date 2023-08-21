import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);

    const handleRegister = async () => {
              
        // if (username === 'user' && password === 'password') {
        //     setIsRegistered(true);
        // }

        const response = await fetch('http://localhost:3001/Register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),

        });
        console.log(response);
        if (response.ok) {
            console.log("Register done brother");

        }
        else {
            console.error("no bro check code");
        }
        console.log(response);
    };

    return (
        <>
            <h1>Register</h1>
            <div>
                <label>
                    Email:
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
            </div>
            <button onClick={handleRegister}>Register</button>
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
