import React, {createContext, useState} from 'react';

export const ShoppingCartContext = createContext(true)

export const ShoppingCartProvider = (props) => {
    const [shopping_list, set_shopping_list] = useState([])

    return (
        <ShoppingCartContext.Provider value={{
            shopping_list: shopping_list,
            set_shopping_list: set_shopping_list
        }}>

            {props.children}

        </ShoppingCartContext.Provider>
    )
}