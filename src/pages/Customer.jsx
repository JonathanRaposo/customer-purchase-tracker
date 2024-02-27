/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Table from '../components/Table.jsx';

import axios from 'axios';

const API_URL = 'http://localhost:5005/api';

const Customer = () => {

    const { id } = useParams();
    const [customer, setCustomer] = useState([]);
    const [message, setMessage] = useState(undefined);

    const navigate = useNavigate();

    const getCustomer = async () => {

        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${API_URL}/user/customers/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setCustomer(response.data);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getCustomer();
    }, [id]);

    const handleDeleteCustomer = () => {
        window.confirm('This will delete customer permanently from the database.');

        const token = localStorage.getItem('token');
        axios
            .delete(`${API_URL}/user/customers/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            .then((response) => {
                console.log(response.data)
                const { message } = response.data;
                setCustomer(null)
                setMessage(message)
                setTimeout(() => {
                    navigate('/customers');
                }, 2000);

            })
            .catch((err) => console.log('Error deleting customer: ', err));
    }

    return (
        <div className='Customer'>
            {message && <h3>{message}</h3>}
            {customer && (
                <>
                    <Table customer={customer} />
                    <div>
                        <Link to={`/customers/${id}/update`} className='update-link'>Update |</Link>
                        <button className='delete-btn' onClick={handleDeleteCustomer}>Delete</button>
                    </div>
                </>
            )}
        </div>
    );
}


export default Customer;