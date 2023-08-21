import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        
        console.log(response);
        if (response.ok) {
            console.log("login done brother");

        }
        else {
            console.error("no bro check code");
        }
        console.log(response);
    };

    const goToRegister = async () => {


    }
    return (
        <>
            <h1>Login</h1>
            <div>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
            <button onClick={handleLogin}>Login</button>
            <h1>Not a user? </h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/register">Register here</Link>
                    </li>
                </ul>
            </nav>
            {isLoggedIn && <p>You are logged in!</p>}
        </>
    );
};

export default Login;
