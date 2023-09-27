// Tzurel Rauper 206543738
// David Galsberg 207759614

import { useState } from "react";
import Cart from './Cart';
import './Title.css';


const Header = (props) => {
    const { products, handleQuantityChange, resetQuantity, iWantIt_clicked, setIWantIt_clicked } = props;
    const [show, setShow] = useState(false);

    return (
        <div className="title">
            <h1>My Shop</h1>
            <div id="div_cartBtn">
                <button className="cartBtn"
                    onClick={() => {
                        if (iWantIt_clicked) {
                            setShow(false);
                            setIWantIt_clicked(false)
                        }
                        else { setShow(!show) }

                    }}>
                    {show || iWantIt_clicked ? "Hide" : "Show"}
                    Cart 🛒
                </button></div>
            {show || iWantIt_clicked ? <Cart products={products} handleQuantityChange={handleQuantityChange} resetQuantity={resetQuantity} /> : ''}

        </div>
    )
}

export default Header;