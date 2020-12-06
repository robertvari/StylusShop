import React, {createContext, useState, useEffect} from 'react';

export const ShoppingCartContext = createContext(true)

export const ShoppingCartProvider = (props) => {
    const [shopping_list, set_shopping_list] = useState([])

    useEffect(() => {
        const new_cart_list = JSON.stringify(shopping_list)
        localStorage.setItem("shopping_list", new_cart_list)

        console.log(localStorage.getItem("shopping_list"))
    }, [shopping_list])

    useEffect(() => {
        const old_cart_list = localStorage.getItem("shopping_list")
        set_shopping_list(JSON.parse(old_cart_list))
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