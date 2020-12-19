import React, {createContext, useEffect, useState} from "react";

export const UserContext = createContext(true)

export const UserProvider = (props) => {
    const [first_name, set_first_name] = useState("")
    const [last_name, set_last_name] = useState("")
    const [email, set_email] = useState("")
    const [phone, set_phone] = useState("")
    const [zipcode, set_zipcode] = useState("")
    const [city, set_city] = useState("")
    const [address, set_address] = useState("")

    return (
        <UserContext.Provider value={{
            first_name: first_name,
            set_first_name: set_first_name,

            last_name: last_name,
            set_last_name: set_last_name,

            email: email,
            set_email: set_email,

            phone: phone,
            set_phone: set_phone,

            zipcode:zipcode,
            set_zipcode:set_zipcode,

            city:city,
            set_city:set_city,

            address:address,
            set_address:set_address
        }}>

            {props.children}

        </UserContext.Provider>
    )
}