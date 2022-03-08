import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('mogodb database is now connected');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.get('/api/products', (req, res) => {
  res.send(data.products);
});

app.get('/api/products/slug/:slug', (req, res) => {
  const product = data.products.find((p) => p.slug === req.params.slug);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'product not found' });
  }
});
app.get('/api/products/:id', (req, res) => {
  const product = data.products.find((p) => p._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'product not found' });
  }
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`the server is ready at http://localhost:${port}`);
});
//test
