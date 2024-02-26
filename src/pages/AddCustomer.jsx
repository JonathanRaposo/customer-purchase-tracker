
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5005/api';

const AddCustomer = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [emailError, setEmailError] = useState(undefined);

    const navigate = useNavigate()

    const handleSignupSubmit = (e) => {
        e.preventDefault();

        const requestBody = {
            firstName,
            lastName,
            email
        }
        const token = localStorage.getItem('token');

        axios
            .post(`${API_URL}/user/customers`,
                requestBody,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            .then((response) => {
                console.log('response: ', response.data,)
                setFirstName('');
                setlastName('');
                setEmail('');
                navigate('/customers');
            })
            .catch((err) => {
                console.log('Error: ', err);
                let error;
                if (err.response.data.message) {
                    error = err.response.data.message;
                    setEmailError(error);
                    return
                }
                else {
                    error = err.response.data.error;
                    setErrorMessage(error);
                }
            });
    }
    return (
        <div className='AddCustomer'>

            <h3>Add customer</h3>
            <form onSubmit={handleSignupSubmit}>
                <label htmlFor='firstName'>First name</label>
                <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <label htmlFor='lastName'>Last name</label>
                <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                />
                <label htmlFor='email' id="email-label">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button className='add-btn'>Add</button>

                {errorMessage && errorMessage.map((error, i) => (
                    <p key={i} className='error'>
                        {error}
                    </p>
                ))}
                {emailError && <p className='error'>{emailError}</p>}
            </form>
        </div>

    )
}

export default AddCustomer;