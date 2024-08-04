import { Router } from 'express';
import { body, param } from 'express-validator';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../controllers/todos';
import { isAuth } from '../middlewares/is-auth';
import { TODO_PAYLOAD } from '../constants/todos';

const router = Router();

router.get('/', isAuth, getTodos);

router.post('/', isAuth, [body(TODO_PAYLOAD.title).trim().notEmpty()], createTodo);

router.put(
  '/:id',
  isAuth,
  [param('id').trim().notEmpty(), body(TODO_PAYLOAD.title).trim().notEmpty()],
  updateTodo
);

router.delete('/:id', isAuth, [param('id').trim().notEmpty()], deleteTodo);

export default router;
