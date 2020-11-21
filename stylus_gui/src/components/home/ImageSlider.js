import React, {useState, useEffect} from 'react';
import axios from "axios";

function ImageSlider(props) {
    const [items, set_items] = useState([])
    const [counter, set_counter] = useState(0)

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
                    <div className={`image-frame ${index === counter? 'active':''}`} style={{backgroundImage: `url(${item.image})`}}>
                        <h1 className={`${index === counter? 'active':''}`}>{item.message}</h1>
                    </div>
                )
            }
        </div>
    );
}

export default ImageSlider;