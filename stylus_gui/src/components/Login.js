import React, {useState, useContext} from 'react';
import {Link} from "react-router-dom"
import {UserContext} from "./contexts/UserContext";


function Login(props) {
    const [email, set_email] = useState("")
    const [password, set_password] = useState("")
    const {error, log_in_user} = useContext(UserContext)


    const log_in_handler = (e) => {
        e.preventDefault()

        if(email.length === 0) return
        if(password.length === 0) return

        log_in_user(email, password)
    }

    return (
        <div className="form-container">
            <form action="">
                <h2><i className="fas fa-user-lock"/> Megrendelései kezeléséhez jelentkezzen be:</h2>
                <input type="email" placeholder="Email" value={email} onChange={e => set_email(e.target.value)}/>
                <input type="password" placeholder="Jelszó" value={password} onChange={e => set_password(e.target.value)}/>

                {
                    error&& <small>{error}</small>
                }

                <button onClick={log_in_handler}>Bejelentkezés</button>
                <hr/>
                <small>Elfelejtette jelszavát? <Link to="/password_reset">Jelszóemlékeztető</Link></small>
                <small>Nincs még regisztrálva? <Link to="/registration">Regisztráció</Link></small>
            </form>
        </div>
    );
}

export default Login;