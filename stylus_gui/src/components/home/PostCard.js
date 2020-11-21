import React from 'react';

function PostCard(props) {
    const {title, image, body, id} = props.data

    return (
        <div className="card-container">
            <img src={image} alt=""/>

            <div className="card-body">
                <h1>{title}</h1>
                <p>{body}</p>
            </div>
        </div>
    );
}

export default PostCard;