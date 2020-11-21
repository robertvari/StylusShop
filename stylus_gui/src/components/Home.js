import React, {useState, useEffect} from 'react';
import axios from "axios"
import ImageSlider from "./home/ImageSlider";
import PostCard from "./home/PostCard";

function Home(props) {
    const [posts, set_posts] = useState([])

    const fetch_items = () => {
        axios({
            method: "get",
            url: "http://localhost:3001/home"
        })
            .then(res => set_posts(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() =>{
        fetch_items()
    }, [])

    return (
        <div>
            <ImageSlider/>

            {
              posts.map(data => <PostCard key={data.id} data={data}/>)
            }
        </div>
    );
}

export default Home;