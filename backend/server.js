import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';

dotenv.config();
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('mogodb database is now connected');
  })
  .catch((err) => {
    console.log(err.message);
  });
// catch erros//

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

//fetch data using seedRouter//
app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`the server is ready at http://localhost:${port}`);
});
