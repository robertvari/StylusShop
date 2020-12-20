import React from 'react';

function Profile(props) {

    return (
        <div className="form-container">
            <h1><i className="fas fa-user"/>User Name</h1>
            <hr/>

            <form action="">
                <h3>Kapcsolattartás</h3>
                <input type="text" placeholder="Vezetéknév"/>
                <input type="text" placeholder="Keresztnév"/>
                <input type="email" placeholder="Email"/>
                <input type="text" placeholder="Telefon"/>

                <hr/>
                <h3>Szállítási cím</h3>
                <input type="text" placeholder="Irányítószám"/>
                <input type="text" placeholder="Város"/>
                <input type="text" placeholder="Utca, házszám"/>
                <hr/>

                <button>Mentés</button>
            </form>
        </div>
    );
}

export default Profile;