import React from 'react';
import {Link} from "react-router-dom"

function Login(props) {
    return (
        <div className="form-container">
            <h2><i className="fas fa-user-lock"/> Megrendelései kezeléséhez jelentkezzen be:</h2>
            <input type="email" placeholder="Email"/>
            <input type="password" placeholder="Jelszó"/>

            <button>Bejelentkezés</button>
            <hr/>
            <small>Elfelejtette jelszavát? <Link to="/password_reset">Jelszóemlékeztető</Link></small>
            <small>Nincs még regisztrálva? <Link to="/registration">Regisztráció</Link></small>
        </div>
    );
}

export default Login;