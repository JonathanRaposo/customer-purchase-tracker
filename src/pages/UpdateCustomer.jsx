/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5005/api';

const UpdateCustomer = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [emailError, setEmailError] = useState(undefined);

    const { id } = useParams();
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    useEffect(() => {

        axios
            .get(`${API_URL}/user/customers/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            .then((response) => {
                const { first_name, last_name, email } = response.data[0];
                setFirstName(first_name)
                setLastName(last_name)
                setEmail(email);
            })
            .catch((err) => console.log('Error: ', err))
    }, [id])

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        const updatedData = {
            firstName,
            lastName,
            email
        }

        try {
            await axios.put(`${API_URL}/user/customers/${id}`, updatedData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setFirstName('');
            setLastName('');
            setEmail('');
            navigate(`/customers/${id}`)
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
        <div className='UpdateCustomer'>

            <h3>Edit customer</h3>
            <form onSubmit={handleUpdateSubmit}>
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
                    onChange={(e) => setLastName(e.target.value)}
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

        </div>
    );
}

export default UpdateCustomer;
