import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context-api/auth.context.jsx';



const Header = () => {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext)

    return (
        <div className="main-header">
            <div className='name-wrapper'>
                {user && <span>Welcome {user.username}</span>}
            </div>
            <nav className="main-menu">
                <ul>
                    {isLoggedIn ? (<>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/dashboard">dashboard</Link>
                        </li>
                        <li>
                            <Link to="/addCustomer">Add Customer</Link>
                        </li>

                        <li>
                            <Link>
                                <button className='logout-btn' onClick={logOutUser}>Log out</button>
                            </Link>
                        </li>
                    </>
                    ) : (<>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/signup">sign up</Link>
                        </li>
                        <li>
                            <Link to="/login">Log in</Link>
                        </li>
                    </>
                    )}

                </ul>
            </nav>
        </div>
    );
}

export default Header;