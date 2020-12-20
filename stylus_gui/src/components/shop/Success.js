import React from 'react';

function Success(props) {
    return (
        <div className="success-layout">
            <h1>Sikeres Fizetés!</h1>
            <p>Köszönjük megrendelését! A feldolgozást megkezdtük.</p>
            <small>A megadott emailcímre hamarosan értesítést kap megrendelése állapotával kapcsolatban.</small>
        </div>
    );
}

export default Success;