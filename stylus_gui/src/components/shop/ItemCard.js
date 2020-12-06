import React, {useContext, useState, useEffect, Fragment} from 'react';
import {Intcomma} from "../../utilities";
import {ShoppingCartContext} from "../contexts/ShoppingCart";


function ItemCard(props) {
    const {title, card_image, price, discount_price, in_stock, short_description, id} = props.data
    const {shopping_list, set_shopping_list} = useContext(ShoppingCartContext)
    const [in_cart, set_in_cart] = useState(false)

    const add_to_cart = () => {
        const new_shopping_list = [...shopping_list, props.data]
        localStorage.setItem("shopping_list", JSON.stringify(new_shopping_list))
        set_shopping_list(new_shopping_list)
    }

    const check_in_cart = () => {
        const filtered_cart = shopping_list.filter(item => item.id === id)
        if(filtered_cart.length > 0){
            set_in_cart(true)
        }else{
            set_in_cart(false)
        }
    }

    useEffect(() =>{
        check_in_cart()
    }, [shopping_list])

    return (
        <div className="shop-item-card">
            <div>
                <img src={card_image} alt=""/>
                <h4>{title}</h4>
            </div>

            <small>
                {short_description}
            </small>

            <div>
                {
                    in_stock?
                        <small style={{color: "green"}}>Raktáron!</small>
                        :
                        <small style={{color: "red"}}>Rendelésre</small>
                }
            </div>

            <div className="price-container">
                {discount_price?
                    <Fragment>
                        <small className="discount-price">{Intcomma(price)} Ft</small>
                        <h2>{Intcomma(discount_price)} Ft</h2>
                    </Fragment>
                    :
                    <h2>{Intcomma(price)} Ft</h2>
                }
            </div>

            {
                in_cart?
                    <div className="in_cart">Kosárban</div>
                    :
                <button onClick={add_to_cart}>
                    <i className="fas fa-cart-arrow-down"/>
                    Kosárba!
                </button>
            }

        </div>
    );
}

export default ItemCard;