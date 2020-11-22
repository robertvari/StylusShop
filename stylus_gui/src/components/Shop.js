import React from 'react';
import Categories from "./shop/Categories";

function Shop(props) {
    return (
        <div>
            <Categories/>

            <div className="shop-container">

                <div className="filter-layout">
                    filters...
                </div>

                <div className="shop-grid">
                    items...
                </div>
            </div>

        </div>
    );
}

export default Shop;