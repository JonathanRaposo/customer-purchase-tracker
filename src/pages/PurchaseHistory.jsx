import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import axios from 'axios'


const API_URL = 'http://localhost:5005/api';

const PurchaseHistory = () => {
    const [customer, setCustomer] = useState([]);
    const [message, setMessage] = useState(undefined);
    const { id } = useParams();



    useEffect(() => {
        const token = localStorage.getItem('token')

        axios
            .get(`${API_URL}/user/customers/${id}/purchases`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            .then((response) => {
                console.log('response: ', response.data);
                if (response.data.message) {
                    let msg = response.data.message
                    setMessage(msg)
                    return;
                }
                setCustomer(response.data);

            })
            .catch((err) => console.log(err))
    }, [id]);
    return (
        <div className='Purchases'>

            {customer.length > 0 ? (
                <>
                    <p>Product list:</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Product name</th>
                                <th>Amount</th>
                                <th>Purchase date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customer.map(({ product_name, amount, order_date }, index) => (
                                <tr key={index}>
                                    <td>{product_name}</td>
                                    <td>{amount}</td>
                                    <td>{new Date(order_date).toLocaleDateString()}</td>

                                </tr>
                            ))}
                        </tbody>

                    </table>
                </>
            ) : <h1>{message}</h1>}
            <Link to="/"
                style={{
                    textDecoration: "none",
                    color: 'coral',
                    display: 'block',
                    width: '100px',
                    margin: '0 auto',
                    textAlign: 'center',
                    fontSize: '1.2em',
                    fontWeight: 'bolder'
                }}>Back</Link>
        </div>
    );
}

export default PurchaseHistory;