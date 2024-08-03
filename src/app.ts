import express from 'express';
import { json } from 'body-parser';
import todoRoutes from './routes/totos';

const app = express();

app.use(json());

app.use('/todos', todoRoutes);

app.use((_: express.Request, res: express.Response) => {
  res.status(404).json({ message: 'Not found' });
});

app.listen(3000);
