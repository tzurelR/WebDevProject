// Tzurel Rauper 206543738
// David Galsberg 207759614

import './App.css';

const Cart = (props) => {
    // we get props and want to display this props in cart:
    let cartProducts = <></>;
    const { products, handleQuantityChange, resetQuantity } = props;

    if (products) {
        cartProducts = Object.entries(products).map(([productKey, productValue]) => {

            if (productValue.quantity !== 0 && (productKey !== 'sum' && productKey !== 'id')) {
                return (
                    <li key={productKey} className="cart-list">
                        <div className="product-details">
                            {/* {productValue.name} */}
                            <span className="product-name">{productValue.name}{": "}</span>
                            <input
                                className="product-quantity"
                                name={productValue.name}
                                type="number"
                                value={productValue.quantity}
                                onChange={(e) => handleQuantityChange(e)}

                            />
                            <p>{productValue.quantity * productValue.price}$</p>
                            <button className="remove-button" name={productValue.name} onClick={(e) => resetQuantity(e)}>X</button>
                        </div>
                    </li>

                );

            } else {
                return null; // Return null for products with quantity 0
            }


        });

    }

    return (
        <ul>{cartProducts}<p>total: {products.sum}＄</p></ul>
    )

}

export default Cart;



