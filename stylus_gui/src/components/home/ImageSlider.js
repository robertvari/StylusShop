import React, {useState, useEffect} from 'react';
import axios from "axios";

function ImageSlider(props) {
    const [items, set_items] = useState([])
    const [counter, set_counter] = useState(0)
    const API_URL = process.env.REACT_APP_API_URL

    const fetch_items = () => {
        axios({
            method: "get",
            url: `${API_URL}shop/promoted/`
        })
            .then(res => set_items(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() =>{
        fetch_items()
    }, [])

    useEffect(() => {
        setTimeout(() =>{
            if( counter === items.length -1){
                set_counter(0)
            }else{
                set_counter(counter + 1)
            }
        }, 10000)
    }, [counter])

    return (
        <div className="image-slider-container">
            {
                items.map((item, index) =>
                    <div className={`image-frame ${index === counter? 'active':''}`} style={{backgroundImage: `url(${item.promotion_image})`}}>
                        <h2 className={`${index === counter? 'active':''}`}>{item.promotion_title}</h2>
                    </div>
                )
            }
        </div>
    );
}

export default ImageSlider;