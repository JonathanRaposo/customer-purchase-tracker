/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context-api/auth.context.jsx';
import axios from 'axios'

const API_URL = 'http://localhost:5005/api';

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [successMessage, setSuccessMessage] = useState(undefined);
    const { user, authenticateUser } = useContext(AuthContext);
    const { user_id } = user;

    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const getCustomers = async () => {

        try {
            const response = await axios(`${API_URL}/user/customers`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            const data = response.data;
            setCustomers(data)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getCustomers();
    }, []);

    const handleDeleteAccount = async () => {
        window.confirm('This action will delete your account.');
        try {
            const response = await axios.delete(`${API_URL}/users/${user_id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSuccessMessage(response.data.message);
            localStorage.removeItem('token');
            authenticateUser()
            setTimeout(() => {
                navigate('/');
            }, 2000)
        } catch (error) {
            console.log('Error while deleting account: ', error)
        }
    }

    return (
        <div className='Customers'>
            <div className='editAccount-link-wrapper'>
                <Link to={`/users/${user_id}/update`}
                    className='editAccount-link'>
                    Edit account
                </Link>
                <button className='deleteAccount-btn' onClick={handleDeleteAccount}>Close Account</button>
            </div>
            {customers.length > 0 ? (
                <>
                    <h3 className='customers-heading'> Customer list</h3>
                    {customers.map(({ first_name, last_name, customer_id }) => (

                        <Link to={`/customers/${customer_id}`}
                            key={customer_id}
                            className='customers-list'>
                            {first_name} {last_name}
                        </Link>
                    ))}
                </>
            ) : (
                <h3 className='customers-heading'>No customers added to your lists </h3>
            )}
            {successMessage && <p className='deletionMessage'>{successMessage}</p>}
        </div>
    )

}
export default Customers;