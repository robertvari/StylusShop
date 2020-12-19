import React, {useContext, useState} from 'react';
import {Intcomma} from "../../utilities";
import {ShoppingCartContext} from "../contexts/ShoppingCart";


function CartPage() {
    return (
        <h1>Kosár tartalma</h1>
    )
}

function AddressPage() {
    return (
        <h1>Szállítási adatok megadása...</h1>
    )
}

function OverviewPage() {
    return (
        <h1>Áttekintés és fizetés</h1>
    )
}

function Checkout(props) {
    const {shopping_list, set_shopping_list} = useContext(ShoppingCartContext)
    const [current_step, set_current_step] = useState(1)
    const steps = ["Kosár", "Szállítási adatok megadás", "Áttekintés"]

    return (
        <div className="checkout-container">
            <div className="steps-layout">
                {
                    steps.map(step =>
                        <div key={step} className={`step-item ${steps[current_step] === step? 'active': ''}`}>{step}</div>
                    )
                }
            </div>

            <hr/>

            {current_step === 0&& <CartPage/>}
            {current_step === 1&& <AddressPage/>}
            {current_step === 2&& <OverviewPage/>}

            <div className="buttons-layout">
                {
                    current_step >0&& <button onClick={() => set_current_step(current_step -1)}>Vissza</button>
                }

                {
                    current_step === 2?
                        <button>Fizetés</button>
                        :
                        <button onClick={() => set_current_step(current_step + 1)}>{steps[current_step + 1]}</button>
                }

            </div>

        </div>
    );
}

export default Checkout;