import React, {createContext, useState, useEffect} from 'react';

export const ShoppingCartContext = createContext(true)

export const ShoppingCartProvider = (props) => {
    const [shopping_list, set_shopping_list] = useState([])

    useEffect(() => {
        const old_cart_list = localStorage.getItem("shopping_list")
        if(old_cart_list){
            set_shopping_list(JSON.parse(old_cart_list))
        }
    }, [])

    return (
        <ShoppingCartContext.Provider value={{
            shopping_list: shopping_list,
            set_shopping_list: set_shopping_list
        }}>

            {props.children}

        </ShoppingCartContext.Provider>
    )
}