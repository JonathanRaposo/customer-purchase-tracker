/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UpdatePassword from './UpdatePassword';
import axios from 'axios';

const API_URL = 'http://localhost:5005/api';

const UpdateUser = () => {
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [emailError, setEmailError] = useState(undefined);
    const [successMessage, setSuccessMessage] = useState(undefined);

    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {

        axios
            .get(`${API_URL}/users/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            .then((response) => {
                setUserName(response.data.username);
                setEmail(response.data.email);

            })
            .catch((err) => console.log('Error: ', err))
    }, [id])

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        const updatedData = {
            username,
            email
        }

        try {
            const response = await axios.put(`${API_URL}/users/${id}`, updatedData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log(response.data.message)
            setSuccessMessage(response.data.message);
            setUserName('');
            setEmail('');
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
        } catch (err) {
            console.log('Error updating customer: ', err)
            if (err.response.data.message) {
                setEmailError(err.response.data.message);
                return;

            }

            setErrorMessage(err.response.data.error);
        }
    }

    return (
        <div className='UpdateUser'>

            {successMessage ? <h3>{successMessage}</h3> : (
                <>
                    <h3>Update Account</h3>
                    <form onSubmit={handleUpdateSubmit}>
                        <label htmlFor='username'>username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                        />

                        <label htmlFor='email' id="email-label">Email</label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button className='update-btn'>Update</button>

                        {errorMessage && errorMessage.map((error, i) => (
                            <p key={i} className='error'>
                                {error}
                            </p>

                        ))}
                        {emailError && <p className='error'>{emailError}</p>}

                    </form>
                    <UpdatePassword />
                </>
            )}

        </div>
    );
}

export default UpdateUser;

