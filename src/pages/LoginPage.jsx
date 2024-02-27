import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios';
import { AuthContext } from '../context-api/auth.context.jsx';

const API_URL = 'http://localhost:5005';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [otherError, setOtherError] = useState(undefined);

    const navigate = useNavigate();
    const { storeToken, authenticateUser } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();

        const payload = {
            email,
            password
        }
        try {
            const response = await axios.post(`${API_URL}/auth/login`, payload);
            console.log('response: ', response.data)
            storeToken(response.data.authToken);
            authenticateUser()
            navigate('/');

        } catch (error) {
            console.log('Error: ', error.response.data)

            if (error.response.data.message) {
                setOtherError(error.response.data.message);
                return;
            }
            setErrorMessage(error.response.data.error);
        }

    }

    return (
        <div className='LoginPage'>
            <h3>Login</h3>
            <form onSubmit={handleLogin}>

                <label htmlFor='email' id="email-label">email</label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor='password' >Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className='login-btn'>Login</button>

                {errorMessage && errorMessage.map((error, i) => (
                    <p key={i} className='error'>
                        {error}
                    </p>

                ))}
                {otherError && <p className='error'>{otherError}</p>}
            </form>
            <Link to="/signup" className='signup-link'>Dont have an account? Sign up</Link>
        </div>
    )
}

export default LoginPage;