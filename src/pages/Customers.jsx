/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Link, } from 'react-router-dom';
import axios from 'axios'

const API_URL = 'http://localhost:5005/api';

const Customers = () => {
    const [customers, setCustomers] = useState([]);

    const getCustomers = async () => {
        const token = localStorage.getItem('token');

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

    return (
        <>
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
                <h3 className='customers-heading'>No customers added to your list </h3>
            )}
        </>
    )

}
export default Customers;