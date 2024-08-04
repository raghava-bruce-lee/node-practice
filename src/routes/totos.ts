import { Router } from 'express';
import { body, param } from 'express-validator';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../controllers/todos';
import { isAuth } from '../middlewares/is-auth';

const router = Router();

router.get('/', isAuth, getTodos);

router.post('/', isAuth, [body('title').trim().notEmpty()], createTodo);

router.put(
  '/:id',
  isAuth,
  [param('id').trim().notEmpty(), body('title').trim().notEmpty()],
  updateTodo
);

router.delete('/:id', isAuth, [param('id').trim().notEmpty()], deleteTodo);

export default router;
