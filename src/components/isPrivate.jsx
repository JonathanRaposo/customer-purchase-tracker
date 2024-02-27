
import PropTypes from 'prop-types';
import { useContext } from "react";
import { AuthContext } from '../context-api/auth.context.jsx';
import { Navigate } from 'react-router-dom';

const IsPrivate = ({ children }) => {
    const { isLoggedIn } = useContext(AuthContext);

    if (!isLoggedIn) {

        return <Navigate to="/login" />
    } else {
        return children;
    }
}
IsPrivate.propTypes = {
    children: PropTypes.node.isRequired
}

export default IsPrivate;