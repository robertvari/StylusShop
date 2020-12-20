import React, {useContext} from 'react';

import {UserContext} from "../contexts/UserContext";


function Profile(props) {
    const {
        first_name,
        set_first_name,
        last_name,
        set_last_name,
        email,
        set_email,
        phone,
        set_phone,
        zipcode,
        set_zipcode,
        city,
        set_city,
        address,
        set_address,
        update_profile
    } = useContext(UserContext)

    const update_action = (e) => {
        e.preventDefault()
        update_profile()
    }

    return (
        <div className="form-container">
            <h1><i className="fas fa-user"/>{first_name} {last_name}</h1>
            <hr/>

            <form action="">
                <h3>Kapcsolattartás</h3>
                <input type="text" placeholder="Vezetéknév" value={first_name} onChange={e => set_first_name(e.target.value)}/>
                <input type="text" placeholder="Keresztnév" value={last_name} onChange={e => set_last_name(e.target.value)}/>
                <input type="text" placeholder="Telefon" value={phone} onChange={e => set_phone(e.target.value)}/>

                <hr/>
                <h3>Szállítási cím</h3>
                <input type="text" placeholder="Irányítószám" value={zipcode} onChange={e => set_zipcode(e.target.value)}/>
                <input type="text" placeholder="Város" value={city} onChange={e => set_city(e.target.value)}/>
                <input type="text" placeholder="Utca, házszám" value={address} onChange={e => set_address(e.target.value)}/>
                <hr/>

                <button onClick={update_action}>Mentés</button>
            </form>
        </div>
    );
}

export default Profile;