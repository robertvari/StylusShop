import React, {useEffect, useState} from 'react';
import Categories from "./shop/Categories";
import ItemCard from "./shop/ItemCard";
import axios from "axios";


function Shop(props) {
    const [items, set_items] = useState([])
    const API_URL = process.env.REACT_APP_API_URL

    const fetch_items = () => {
        axios({
            method: "get",
            url: `${API_URL}/shop`
        })
            .then(res => set_items(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() =>{
        fetch_items()
    }, [])


    return (
        <div>
            <Categories/>

            <div className="shop-container">

                <div className="filter-layout">
                    filters...
                </div>

                <div className="shop-grid">
                    {
                        items.map(data => <ItemCard key={data.id} data={data}/>)
                    }
                </div>
            </div>

        </div>
    );
}

export default Shop;