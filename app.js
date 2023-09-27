// Tzurel Rauper 206543738
// David Galsberg 207759614

// For start the server do cd to backend, then- npm run start

const express = require('express')
const cors = require('cors');
const cart = require('./src/cart.js')
const app = express()
const port = 3001
const mongojs = require('mongojs')
const MONGO_USERNAME = 'Student'
const MONGO_PWD = 'Webdev2023Student'
const MONGO_DB = 'webdev2023'
const MONGO_CONN = "mongodb+srv://" + MONGO_USERNAME + ":" + MONGO_PWD + "@cluster0.uqyflra.mongodb.net/" + MONGO_DB;

// Take this MONGO_CONN to compass for see our DB:
console.log("MONGO_CONN: ");
console.log(MONGO_CONN);

const db = mongojs(MONGO_CONN);
let collection = null;
collection = db.carts_206543738; //we update this to id number
if (!collection) {
  console.error("Please un-comment line #14 and change the collection name!")
  return;
}


const logRequest = (req, res, next) => {
  console.log(`Received request to ${req.url}`)
  next()
}
app.use(logRequest)
app.use(cors())
app.use(express.json())


app.get('/products', (req, res) => {

})
app.get('/cart', (req, res) => {
  let id = null;
  if (req.query['id'] && req.query['id'].length >= 12) {
    id = mongojs.ObjectId(req.query['id'])
  }

  collection.findOne({ _id: id }, (err, cartObj) => {
    if (!cartObj) {
      cartObj = cart.new();
      collection.save(cartObj, (err, cartObj) => {
        res.json(cartObj);
      });
    } else {
      res.json(cartObj)
    }

  });
});

app.post('/cart/product', (req, res) => {

  const cart_id = req.body['cart_id']

  const product_id = req.body['product'];
  const quantity = parseInt(req.body['quantity']);
  const id = mongojs.ObjectId(cart_id);

  collection.findOne({ _id: id }, (err, cartObj) => {

    if (!cartObj) {
      cartObj = cart.new();
    }
    // NOTE: this if is redundant so, it in '//'!
    //if (quantity) {
    if (quantity >= 0) {
      cart.update_quantity(cartObj, product_id, quantity)
    }
    //}

    else {
      cart.add(cartObj, product_id, 1);
    }
    cart.recalc(cartObj);

    collection.save(cartObj, (err, cartObj) => {
      res.json(cartObj);
    });

  });
});

app.delete('/cart/product', (req, res) => {


  const product_id = req.body['product'];
  const cart_id = req.body['cart_id'];
  const id = mongojs.ObjectId(cart_id);

  collection.findOne({ _id: id }, (err, cartObj) => {

    cart.remove(cartObj, product_id);
    cart.recalc(cartObj);

    collection.save(cartObj, (err, cartObj) => {
      res.json(cartObj);

    });
  });

})


app.listen(port, () => {
  console.log(`Shop API running on http://localhost:${port}`)
})

