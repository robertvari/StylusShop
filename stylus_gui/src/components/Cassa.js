import React,{useContext} from 'react';
import {Intcomma} from "../utilities";
import {ShoppingCartContext} from "./contexts/ShoppingCart";


function Cassa(props) {
    const {shopping_list, set_shopping_list} = useContext(ShoppingCartContext)

    return (
        <div>
            {
                shopping_list.map(item => <h2>{item.name} {Intcomma(item.price)} Ft</h2>)
            }
        </div>
    );
}

export default Cassa;