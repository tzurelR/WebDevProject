// Tzurel Rauper 206543738
// David Galsberg 207759614

// For start the react do cd to react, then- npm run start

import './App.css';
import Header from './Header';
import Products1 from './Products1';
import { useState, useEffect } from 'react'

function App() {

  let cartId = 0;

  const [iWantIt_clicked, setIWantIt_clicked] = useState(false);
  const [cartProducts, setCartProducts] = useState({

    mac: {
      name: 'mac',
      price: 370,
      quantity: 0
    },
    asus: {
      name: 'asus',
      price: 140,
      quantity: 0

    },
    hp: {
      name: 'hp',
      price: 250,
      quantity: 0
    },
    sum: 0,
    id: 0,

  });

  const updateSum = () => {
    setCartProducts((prevProducts) => {
      const updatedProducts = { ...prevProducts };

      // Calculate sum
      let totalSum = 0;

      totalSum += updatedProducts.asus.quantity * updatedProducts.asus.price;
      totalSum += updatedProducts.hp.quantity * updatedProducts.hp.price;
      totalSum += updatedProducts.mac.quantity * updatedProducts.mac.price;


      // Update sum
      updatedProducts.sum = totalSum;


      return updatedProducts;
    });
  };






  // function to convert the data from server:
  const updateCartQuantities = (data) => {

    setCartProducts((prevProducts) => {
      const updatedProducts = { ...prevProducts };

      // Update quantities
      Object.keys(updatedProducts).forEach((itemName) => {
        if (itemName !== 'sum' && itemName !== 'id') {
          if (data.items && data.items[itemName]) {
            updatedProducts[itemName].quantity = parseInt(data.items[itemName].quantity);
          } else {
            updatedProducts[itemName].quantity = 0;
          }
        }
      });



      // Update id
      if (data._id) {
        updatedProducts.id = data._id;
      }



      return updatedProducts;
    });
    // Update sum
    updateSum();
  };



  //this useEffect is like GET:
  useEffect(() => {

    const cartId = localStorage.getItem("cart id");
    const URL = "http://localhost:3001/cart?id=" + (cartId ? cartId : "");

    fetch(URL)
      .then((res) => res.json())
      .then((cartData) => {

        if (cartId !== cartData._id) // update
          localStorage.setItem("cart id", cartData._id);

        updateCartQuantities(cartData);

      })
  }, []);



  const add = (event) => {
    const _productId = event;
    // if we not use in localStorage
    //const cartId = cartProducts.id;

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        //cart_id: cartId,
        cart_id: localStorage.getItem("cart id"),
        product: _productId,
      }),
    };

    fetch("http://localhost:3001/cart/product", requestOptions)
      .then((res) => res.json())
      .then((cartData) => {
        updateCartQuantities(cartData);
        setIWantIt_clicked(true);
      });
  };

  useEffect(() => {
  }, [cartProducts]);


  const remove = (event) => {
    // if we not use in localStorage
    //const cartId = cartProducts.id;
    const _productId = event.target.name;

    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cart_id: cartId,
        cart_id: localStorage.getItem("cart id"),
        product: _productId,
      })
    }
    fetch("http://localhost:3001/cart/product", requestOptions)
      .then((res) => res.json())
      .then((cartData) => {

        //call to function that 'render' the cart
        updateCartQuantities(cartData);

      })
  }

  const changeQuantity = (event) => {
    const cartId = cartProducts.id;
    const _productId = event.target.name;
    const _quantity = event.target.value !== '' ? event.target.value : '0';


    if (_quantity < 0) return

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cart_id: cartId,
        product: _productId,
        quantity: _quantity,
      })
    }
    fetch("http://localhost:3001/cart/product", requestOptions)
      .then((res) => res.json())
      .then((cartData) => {

        updateCartQuantities(cartData);


      })

  }


  const handleQuantityChange = (productKey, newQuantity) => {
    setCartProducts((prevProducts) => {
      const updatedProducts = {
        ...prevProducts,
        [productKey]: {
          ...prevProducts[productKey],
          quantity: newQuantity,
        },
      };
      return updatedProducts;
    });
  };

  //this function is for X btn:
  const resetQuantity = (productKey) => {
    handleQuantityChange(productKey, 0);
  };





  return (
    < div className="App" >
      <Header products={cartProducts} handleQuantityChange={changeQuantity} resetQuantity={remove} iWantIt_clicked={iWantIt_clicked} setIWantIt_clicked={setIWantIt_clicked} ></Header>
      <Products1 products={cartProducts} incrementQuantity={add}></Products1>
    </div >
  );
}

export default App;

