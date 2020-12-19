import React, {useContext, useState, Fragment, useEffect} from 'react';
import {Intcomma} from "../../utilities";
import {ShoppingCartContext} from "../contexts/ShoppingCart";

import {UserContext} from "../contexts/UserContext";

function Quantity({quantity, set_quantity}){
    return (
        <input
            type="number"
            value={quantity}
            onChange={e => set_quantity(parseInt(e.target.value))}
            min={1}
        />
    )
}

function CheckoutItem({data}){
    const [quantity, set_quantity] = useState(data.quantity)
    const {shopping_list, set_shopping_list} = useContext(ShoppingCartContext)

    useEffect(() => {
        const new_list = [...shopping_list]
        for(let i=0; i < new_list.length; i++){
            const item = new_list[i]
            if(item.id === data.id){
                item.quantity = quantity
            }
        }

        set_shopping_list(new_list)
        localStorage.setItem("shopping_list", JSON.stringify(new_list))
    }, [quantity])

    return (
        <div className="checkout-item-container">
            <div>{data.title}</div>

            {
                data.discount_price?
                    <div><small className="discount-price">{Intcomma(data.price)} Ft</small> {Intcomma(data.discount_price)} Ft</div>
                    :
                    <div>{Intcomma(data.price)} Ft</div>
            }

            <Quantity quantity={quantity} set_quantity={set_quantity}/>
        </div>
    )
}

function CartPage() {
    const {shopping_list, total} = useContext(ShoppingCartContext)

    return (
        <Fragment>
            {
                shopping_list.map(data => <CheckoutItem data={data} key={data.id}/>)
            }

            <h3 className="total">Összesen: {Intcomma(total)} Ft</h3>

        </Fragment>
    )
}

function AddressPage(){
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
        set_address
    } = useContext(UserContext)

    useEffect(() => {
        if(process.env.NODE_ENV === "development"){
            set_first_name("Kiss")
            set_last_name("Balázs")
            set_email("balazs@gmail.com")
            set_phone("06 20 555 7896")
            set_zipcode("1234")
            set_city("Debrecen")
            set_address("Petőfi utca 1.")
        }
    }, [])

    return <div className="address-layout">
        <h3>Személyes adatok</h3>
        <input type="text" placeholder="Vezetéknév" value={first_name} onChange={e => set_first_name(e.target.value)}/>
        <input type="text" placeholder="Keresztnév" value={last_name} onChange={e => set_last_name(e.target.value)}/>
        <input type="email" placeholder="Email" value={email} onChange={e => set_email(e.target.value)}/>
        <input type="text" placeholder="Telefon" value={phone} onChange={e => set_phone(e.target.value)}/>
        <hr/>

        <h3>Szállítási adatok</h3>
        <input type="text" placeholder="Irányítószám" value={zipcode} onChange={e => set_zipcode(e.target.value)}/>
        <input type="text" placeholder="Város" value={city} onChange={e => set_city(e.target.value)}/>
        <input type="text" placeholder="Utca, házszám" value={address} onChange={e => set_address(e.target.value)}/>

        <hr/>
    </div>
}

function OverviewPage() {
    return (
        <h1>Áttekintés és fizetés</h1>
    )
}

function Checkout(props) {
    const {shopping_list, set_shopping_list} = useContext(ShoppingCartContext)
    const [current_step, set_current_step] = useState(0)
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