import React, {createContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom"
import axios from "axios";
import {useCookies} from 'react-cookie'

export const UserContext = createContext(true)

export const UserProvider = (props) => {
    const API_URL = process.env.REACT_APP_API_URL
    const history = useHistory()
    const [cookies, setCookie, removeCookies] = useCookies();

    const [first_name, set_first_name] = useState("")
    const [last_name, set_last_name] = useState("")
    const [email, set_email] = useState("")
    const [phone, set_phone] = useState("")
    const [zipcode, set_zipcode] = useState("")
    const [city, set_city] = useState("")
    const [address, set_address] = useState("")

    const [logged_in, set_logged_in] = useState(null)
    const [error, set_error] = useState(null)

    const check_token = () => {
        if(cookies.token){
            set_logged_in(cookies.token)
        }
    }

    const log_in_user = async (email, password) => {
        try{
            const res = await axios({
                method: "post",
                url: `${API_URL}auth/login/`,
                data: {
                    email: email,
                    password: password
                }
            })

            const token = res.data.key
            set_logged_in(token)
            setCookie('token', token, {path:'/', sameSite:'strict', maxAge:86400})
            history.push('/profile')
        }catch (err){
            set_error("Hibás adatokat adtál meg.")
            setTimeout(() => set_error(null), 5000)
        }
    }

    const fetch_user = async () => {
        const res = await axios({
            method: "get",
            url: `${API_URL}users/profile/`,
            headers: {
                authorization: `token ${logged_in}`
            }
        })

        const {profile} = res.data
        set_first_name(profile.first_name)
        set_last_name(profile.last_name)
        set_email(res.data.email)
        set_phone(profile.phone)
        set_zipcode(profile.zipcode)
        set_city(profile.city)
        set_address(profile.address)
    }

    const update_profile = () => {
        axios({
            method: "patch",
            url: `${API_URL}users/profile/`,
            headers : {
                authorization: `token ${logged_in}`
            },
            data: {
                first_name: first_name,
                last_name: last_name,
                phone: phone,
                zipcode: zipcode,
                city: city,
                address: address
            }
        })
    }

    useEffect(() => {
        if(logged_in){
            fetch_user()
        }
    }, [logged_in])

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
            set_address:set_address,

            logged_in: logged_in,
            check_token: check_token,
            log_in_user: log_in_user,
            error: error,
            update_profile: update_profile
        }}>

            {props.children}

        </UserContext.Provider>
    )
}