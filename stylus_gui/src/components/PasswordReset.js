import React from 'react';

function PasswordReset(props) {
    return (
        <div className="form-container">
            <h2><i className="fas fa-key"/> Adja meg a regissztrációnál használt címet</h2>
            <small>A megadott címre instrukciókat küldünk majd a jelszava visszaállításához.</small>
            <input type="email" placeholder="Email"/>

            <button>Küldés</button>
        </div>
    );
}

export default PasswordReset;