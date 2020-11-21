import React from 'react';
import {Link} from "react-router-dom";

function Navbar(props) {
    return (
        <div>
            <Link to="/"><h1>Stylus Shop</h1></Link>

            <Link to="/shop">Shop</Link>
            <Link to="/contact">Contact</Link>
        </div>
    );
}

export default Navbar;