import express from 'express';
import Product from '../models/productModel.js';
import data from '../data.js';

const seedRouter = express.Router();
seedRouter.get('/', async (req, res) => {
  //remove() function not used now and use deleteMany()!!
  await Product.deleteMany({});
  //create new products by insert an array of products from local data.js//
  const createdProducts = await Product.insertMany(data.products);
  res.send({ createdProducts });
});

export default seedRouter;
