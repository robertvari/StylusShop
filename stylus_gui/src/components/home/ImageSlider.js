import React, {useState, useEffect} from 'react';
import axios from "axios";

function ImageSlider(props) {
    const [items, set_items] = useState([])

    const fetch_items = () => {
        axios({
            method: "get",
            url: "http://localhost:3001/slideshow"
        })
            .then(res => set_items(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() =>{
        fetch_items()
    }, [])

    return (
        <div className="image-slider-container">
            {
                items.map((item, index) =>
                    <div style={{backgroundImage: `url(${item.image})`}}>
                        {item.message}
                    </div>
                )
            }
        </div>
    );
}

export default ImageSlider;