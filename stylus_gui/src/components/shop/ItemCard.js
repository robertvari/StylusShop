import React from 'react';
import {Intcomma} from "../../utilities";


function ItemCard(props) {
    const {title, image, price, discont, in_stock} = props.data

    return (
        <div className="shop-item-card">
            <div>
                <img src={image} alt=""/>
                <h4>{title}</h4>
            </div>

            <div>
                {
                    in_stock?
                        <small style={{color: "green"}}>Raktáron!</small>
                        :
                        <small style={{color: "red"}}>Rendelésre</small>
                }
            </div>

            <div className="price-container">
                {discont&& <small className="discount-price">{Intcomma(discont)} Ft</small>}
                <h2>{Intcomma(price)} Ft</h2>
            </div>

            <button>
                <i className="fas fa-cart-arrow-down"/>
                Kosárba!
            </button>

        </div>
    );
}

export default ItemCard;