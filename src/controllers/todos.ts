import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';

export const getTodos: RequestHandler = (_, res) => {
  res.status(200).json({ todos: [] });
};

export const createTodo: RequestHandler = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: 'Validation failed, entered data is incorrect!', errors: errors.array() });
  }

  const todo = (req.body as { todo: string }).todo.trim();
  res.status(201).json({ message: 'Created the todo', todo });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: 'Validation failed, entered data is incorrect!', errors: errors.array() });
  }

  const todoId = req.params.id;
  const updatedTodo = (req.body as { todo: string }).todo.trim();

  res.status(200).json({ message: `Todo with id: ${todoId} updated to ${updatedTodo}.` });
};

export const deleteTodo: RequestHandler<{ id: string }> = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: 'Validation failed, entered data is incorrect!', errors: errors.array() });
  }

  const todoId = req.params.id;
  res.status(200).json({ message: `Todo with id: ${todoId} has been deleted.` });
};
