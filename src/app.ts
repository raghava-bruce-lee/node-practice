import express from 'express';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import todoRoutes from './routes/totos';

const app = express();

app.use(json());

app.use('/todos', todoRoutes);

app.use((_: express.Request, res: express.Response) => {
  res.status(404).json({ message: 'Not found' });
});

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
