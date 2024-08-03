import { Router } from 'express';
import { body, param } from 'express-validator';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../controllers/todos';

const router = Router();

router.get('/', getTodos);

router.post('/', [body('title').trim().notEmpty()], createTodo);

router.put('/:id', [param('id').trim().notEmpty(), body('title').trim().notEmpty()], updateTodo);

router.delete('/:id', [param('id').trim().notEmpty()], deleteTodo);

export default router;
