import React from 'react';
import {Link} from "react-router-dom";

function Navbar(props) {
    return (
        <div className="navbar">
            <Link to="/"><h1>Stylus Shop</h1></Link>

            <Link to="/shop" className="nav-button">Shop</Link>
            <Link to="/contact" className="nav-button">Contact</Link>

            <i className="fas fa-search"/>
            <i className="fas fa-shopping-cart"/>
            <i className="fas fa-user"/>
        </div>
    );
}

export default Navbar;