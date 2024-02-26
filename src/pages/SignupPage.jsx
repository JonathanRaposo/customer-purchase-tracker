import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios';
import { AuthContext } from '../context-api/auth.context.jsx';

const API_URL = 'http://localhost:5005';

const SignupPage = () => {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [otherError, setOtherError] = useState(undefined);


    const navigate = useNavigate();
    const { storeToken, authenticateUser } = useContext(AuthContext);

    const handleSignup = async (e) => {
        e.preventDefault();

        const payload = {
            username,
            email,
            password
        }
        try {
            const response = await axios.post(`${API_URL}/auth/signup`, payload);
            console.log('response: ', response.data)
            storeToken(response.data.authToken);
            authenticateUser()
            navigate('/');
        } catch (error) {
            console.log('Error: ', error)

            if (error.response.data.message) {
                setOtherError(error.response.data.message);
                return;
            }
            setErrorMessage(error.response.data.error);
        }

    }

    return (
        <div className='SignupPage'>
            <h3>Sign up</h3>
            <form onSubmit={handleSignup}>
                <label htmlFor='username'>Username</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                />
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
                <button className='signup-btn'>Sign up</button>

                {errorMessage && errorMessage.map((error, i) => (
                    <p key={i} className='error'>
                        {error}
                    </p>

                ))}
                {otherError && <p className='error'>{otherError}</p>}
            </form>
            <Link to="/login" className='login-link'>Already have an account? Log in</Link>
        </div>
    )
}

export default SignupPage;