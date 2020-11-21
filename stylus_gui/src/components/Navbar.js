import React from 'react';
import {Link} from "react-router-dom";

function Navbar(props) {
    return (
        <div className="navbar">
            <div className="nav-button-layout">
                <Link to="/"><h1>Stylus Shop</h1></Link>
                <Link to="/shop" className="nav-button">Shop</Link>
                <Link to="/contact" className="nav-button">Contact</Link>
            </div>

            <div className="nav-button-layout">
                <i className="fas fa-search nav-button"/>
                <i className="fas fa-shopping-cart nav-button"/>

                <Link to="/login">
                    <i className="fas fa-user nav-button"/>
                </Link>

            </div>
        </div>
    );
}

export default Navbar;