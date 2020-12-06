import React, {useContext, useState, useEffect, Fragment} from 'react';
import {ShoppingCartContext} from "../contexts/ShoppingCart";
import {Intcomma} from "../../utilities";
import {Link} from "react-router-dom";

function CartItem (props) {
    const {title, price, discount_price, id} = props.data

    return(
        <small className="cart-item">
            <p>{title}</p>

            <p>{discount_price? Intcomma(discount_price):Intcomma(price)} Ft <i className="fas fa-trash-alt" onClick={() => props.delete_item(id)}/></p>

        </small>
    )
}

function CartIcon ({set_visible, shopping_list}){
    return (
        <Fragment>
            <i className="fas fa-shopping-cart nav-button" onClick={() => set_visible(true)}>
                {
                    shopping_list.length > 0?
                        <div className="cart-item-counter">{shopping_list.length}</div>
                        :
                        null
                }
            </i>
        </Fragment>
    )
}

function ShoppingCart(props) {
    const {shopping_list, set_shopping_list} = useContext(ShoppingCartContext)
    const [total, set_total] = useState(0)
    const [visible, set_visible] = useState(false)

    const delete_item = (id) =>{
        const new_list = shopping_list.filter(item => item.id !== id)
        localStorage.setItem("shopping_list", JSON.stringify(new_list))
        set_shopping_list(new_list)
    }

    const calc_total = () => {
        let current_total = 0

        for(let i=0; i < shopping_list.length; i++){
            const current_item = shopping_list[i]
            if(current_item.discount_price){
                current_total = current_total + current_item.discount_price
            }else{
                current_total = current_total + current_item.price
            }
        }

        set_total(current_total)
    }

    useEffect(() =>{
        calc_total()
    }, [shopping_list])

    return (
        <div className="cart-container">
            <CartIcon set_visible={set_visible} shopping_list={shopping_list}/>

            <div className={`cart_popup_container ${visible? "active":""}`}>
                <div className="cart-items-container">
                    <h2>Kosár</h2>
                    <hr/>

                    {
                        shopping_list.map(data => <CartItem data={data} delete_item={delete_item}/>)
                    }

                    <hr/>

                    <h3 style={{color: "red"}}>Összesen: {Intcomma(total)} Ft</h3>

                    <div className="buttons-layout">
                        <button onClick={() => set_visible(false)}>
                            Vásárlás folytatása
                        </button>

                        <button>
                            <Link to={"/casa"} onClick={() => set_visible(false)}>
                                Pénztár
                            </Link>
                        </button>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default ShoppingCart;