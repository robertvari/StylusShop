import React, {createContext, useState, useEffect} from 'react';

export const ShoppingCartContext = createContext(true)

export const ShoppingCartProvider = (props) => {
    const [shopping_list, set_shopping_list] = useState([])
    const [total, set_total] = useState(0)

    const calc_total = () => {
        let current_total = 0

        for(let i=0; i < shopping_list.length; i++){
            const current_item = shopping_list[i]
            if(current_item.discount_price){
                current_total = current_total + (current_item.discount_price * current_item.quantity)
            }else{
                current_total = current_total + (current_item.price * current_item.quantity)
            }
        }

        set_total(current_total)
    }

    useEffect(() => {
        const old_cart_list = localStorage.getItem("shopping_list")
        if(old_cart_list){
            set_shopping_list(JSON.parse(old_cart_list))
        }
    }, [])

    useEffect(() => {
        calc_total()
    }, [shopping_list])

    return (
        <ShoppingCartContext.Provider value={{
            shopping_list: shopping_list,
            set_shopping_list: set_shopping_list,
            total: total,
            calc_total:calc_total
        }}>

            {props.children}

        </ShoppingCartContext.Provider>
    )
}