import express from 'express';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import authRoutes from './routes/auth';
import todoRoutes from './routes/totos';
import { get404Error } from './controllers/errors';

const app = express();

app.use(json());

app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);
app.use(get404Error);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}?retryWrites=true`
  )
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch((error) => {
    console.error(error);
  });
