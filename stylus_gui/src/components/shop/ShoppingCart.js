import React, {useContext, useState, useEffect} from 'react';
import {ShoppingCartContext} from "../contexts/ShoppingCart";
import {Intcomma} from "../../utilities";
import {Link} from "react-router-dom";

function CartItem (props) {
    const {title, price, id} = props.data

    return(
        <small className="cart-item">
            <p>{title}</p>

            <p>{Intcomma(price)} Ft <i className="fas fa-trash-alt" onClick={() => props.delete_item(id)}/></p>

        </small>
    )
}


function ShoppingCart(props) {
    const {shopping_list, set_shopping_list} = useContext(ShoppingCartContext)
    const [total, set_total] = useState(0)

    const delete_item = (id) =>{
        const new_list = shopping_list.filter(item => item.id !== id)
        set_shopping_list(new_list)
    }


    const calc_total = () => {
        let current_total = 0

        for(let i=0; i < shopping_list.length; i++){
            const current_item = shopping_list[i]
            current_total = current_total + current_item.price
        }

        set_total(current_total)
    }

    useEffect(() =>{
        calc_total()
    }, [shopping_list])

    return (
        <div className="cart-container">
            <i className="fas fa-shopping-cart nav-button"/>


            <div className="cart-items-container">
                <h2>Kosár</h2>
                <hr/>

                {
                    shopping_list.map(data => <CartItem data={data} delete_item={delete_item}/>)
                }

                <hr/>

                <h3 style={{color: "red"}}>Összesen: {Intcomma(total)} Ft</h3>
                <button>
                    <Link to="/cassa">
                        Pénztár
                    </Link>
                </button>
            </div>
        </div>
    );
}

export default ShoppingCart;