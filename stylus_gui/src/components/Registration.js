import React, {useState} from 'react';
import axios from "axios"
import {useHistory} from "react-router-dom"


function Registration(props) {
    const API_URL = process.env.REACT_APP_API_URL

    const history = useHistory()
    const [email, set_email] = useState("")
    const [password1, set_password1] = useState("")
    const [password2, set_password2] = useState("")
    const [error, set_error] = useState(null)

    const register_handler = async (e) => {
        e.preventDefault()
        set_error(null)

        if(email.length === 0){
            set_error("Emailcím megadása kötelező")
            return
        }

        if(password1.length === 0){
            set_error("Nem adtál meg jelszót")
            return
        }

        if(password1 !== password2){
            set_error("Nem egyezik a két jelszó")
            return
        }

        console.log(email, password1, password2)

        await axios({
            method: "post",
            url: `${API_URL}auth/registration/`,
            data: {
                email: email,
                password1: password1,
                password2: password2
            }
        })

        history.push("/users/email_confirm_sent")
    }

    return (
        <div className="form-container">
            <h2><i className="fas fa-user-plus"/> Regisztráció</h2>
            <form action="">
                <input type="email" placeholder="Email" value={email} onChange={e => set_email(e.target.value)}/>
                <input type="password" placeholder="Jelszó" value={password1} onChange={e => set_password1(e.target.value)}/>
                <input type="password" placeholder="Jelszó megerősítése" value={password2} onChange={e => set_password2(e.target.value)}/>

                {
                    error&& <small>{error}</small>
                }

                <button onClick={register_handler}>Küldés</button>
            </form>
        </div>
    );
}

export default Registration;