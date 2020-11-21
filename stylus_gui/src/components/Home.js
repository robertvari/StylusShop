import React, {useState, useEffect} from 'react';
import axios from "axios"

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
            {
              posts.map(item => <h1>{item.title}</h1>)
            }
        </div>
    );
}

export default Home;