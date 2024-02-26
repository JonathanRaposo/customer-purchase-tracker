/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

const Table = ({ customer }) => {

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Email</th>
                        <th>Purchase history</th>

                    </tr>

                </thead>
                <tbody>
                    {customer.map(({ customer_id, first_name, last_name, email }) => (
                        <tr key={customer_id}>
                            <td>{first_name}</td>
                            <td>{last_name}</td>
                            <td>{email}</td>
                            <td>
                                <Link
                                    to={`/PurchaseHistory/${customer_id}`}
                                    className='expenses'>
                                    See history
                                </Link>
                            </td>

                        </tr>
                    ))}
                </tbody>

            </table>

        </>



    );
}

export default Table;

