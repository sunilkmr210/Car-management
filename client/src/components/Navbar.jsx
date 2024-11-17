import { useState } from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/userRedux';

const Navbar = ({setQuery}) => {

    const [query1, setQuery1] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleCar = () => {
        navigate('/addCar');
    }

    const handleChange = (e)=>{
        setQuery1(e.target.value);
    }

    const handleLogOut = () => {
        dispatch(logout());
        navigate('/');
    }

    const handleSearch = async () => {
        setQuery(JSON.stringify(query1));
    }

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search cars..."
                    value={query1}
                    onChange={handleChange}
                />
                <i className="material-icons search-icon" onClick={handleSearch} style={{"cursor": "pointer"}}>search</i>
            </div>
            <div className="navbar-right">
                <button className="add-car-btn" onClick={handleCar}>Add Car</button>
                <button className="logout-btn" onClick={handleLogOut}>Logout</button>
            </div>
        </nav>
    )
}

export default Navbar
