
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context-api/auth.context.jsx';
import axios from 'axios';

const API_URL = 'http://localhost:5005/api';

const UpdatePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [successMessage, setSuccessMessage] = useState(undefined);

    const { user } = useContext(AuthContext);
    const { user_id } = user;
    const navigate = useNavigate();

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        const updatedPassword = {
            currentPassword,
            newPassword
        }

        try {
            const response = await axios.put(`${API_URL}/users/${user_id}/password`, updatedPassword,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log(response.data.message)
            setSuccessMessage(response.data.message);
            setCurrentPassword('');
            setNewPassword('');
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
        } catch (err) {
            console.log('Error updating customer: ', err)
            setErrorMessage(err.response.data.message);
        }
    }

    return (
        <div className='UpdatePassword'>

            {successMessage ? <h3>{successMessage}</h3> : (
                <>
                    <h3>Update Password</h3>
                    <form onSubmit={handleUpdateSubmit}>
                        <label htmlFor='currentPassword'>Enter current password</label>
                        <input
                            type="password"
                            id="currentPassword"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />

                        <label htmlFor='newPassword'>Enter new password</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <button className='update-btn'>Update</button>
                        {errorMessage && <p className='error'>{errorMessage}</p>}

                    </form>
                </>
            )}

        </div>
    );
}

export default UpdatePassword;

