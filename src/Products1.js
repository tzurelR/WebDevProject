// Tzurel Rauper 206543738
// David Galsberg 207759614

import Product from "./Product"
import Mac from "./images/Mac.jpeg"
import Asus from "./images/ASUS.png"
import Hp from "./images/HP.avif"

const Products1 = (props) => {
    const { products, incrementQuantity } = props;

    return (
        <div>
            <div style={{ display: 'inline-block', margin: '40px' }}>
                <Product
                    img={Mac}
                    price={`${products.mac.price}
                    $`}
                    name={products.mac.name} incrementQuantity={incrementQuantity}
                    productId='mac' />
            </div>
            <div style={{ display: 'inline-block', margin: '40px' }}>
                <Product
                    img={Asus}
                    price={`${products.asus.price}$`}
                    name={products.asus.name}
                    incrementQuantity={incrementQuantity}
                    productId='asus' />
            </div>
            <div style={{ display: 'inline-block', margin: '40px' }}>
                <Product
                    img={Hp}
                    price={`${products.hp.price}$`}
                    name={products.hp.name}
                    incrementQuantity={incrementQuantity}
                    productId='hp' />
            </div>

        </div>
    )
}

export default Products1;

