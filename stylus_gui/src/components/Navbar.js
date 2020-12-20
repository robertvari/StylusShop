import React, {useContext, useEffect, Fragment} from 'react';
import {Link} from "react-router-dom";
import ShoppingCart from "./shop/ShoppingCart";

import {UserContext} from "./contexts/UserContext";


function Navbar(props) {
    const {logged_in, log_out_user, check_token} = useContext(UserContext)

    useEffect(() => {
        check_token()
    }, [])

    return (
        <div className="navbar">
            <div className="nav-button-layout">
                <Link to="/"><h1>Stylus Shop</h1></Link>
                <Link to="/shop" className="nav-button">Shop</Link>
                <Link to="/contact" className="nav-button">Contact</Link>
            </div>

            <div className="nav-button-layout">
                <i className="fas fa-search nav-button"/>

                <ShoppingCart/>

                {
                    logged_in?
                        <Fragment>
                            <Link to="/profile">
                                <i className="fas fa-user nav-button"/>
                            </Link>

                            <i className="fas fa-sign-out-alt nav-button" onClick={() => log_out_user()}/>
                        </Fragment>
                        :
                        <Link to="/login">
                            <i className="fas fa-user nav-button"/>
                        </Link>
                }

            </div>
        </div>
    );
}

export default Navbar;