import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        // Simulate login logic (replace with your actual login logic)
        if (username === 'user' && password === 'password') {
            setIsLoggedIn(true);
        }
    };

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
            <nav>
                <ul>
                    <li>
                        <Link to="/numbers">Numbers</Link>
                    </li>
                </ul>
            </nav>
            {isLoggedIn && <p>You are logged in!</p>}
        </>
    );
};

export default Login;
