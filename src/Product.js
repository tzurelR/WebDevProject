// Tzurel Rauper 206543738
// David Galsberg 207759614

import './App.css';

const Product = (props) => {
    const { incrementQuantity, productId } = props;
    return (
        <div>
            <img src={props.img} style={{ width: '350px', height: '300px' }} />
            <h3>name: {props.name}</h3>
            <p>price: {props.price}</p>
            <button className="iWantItbtn" name={productId} onClick={() => incrementQuantity(props.productId)}>
                I want it!
            </button>
        </div>
    )
}

export default Product;