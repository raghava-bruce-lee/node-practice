import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import { Todo } from '../models/todos';

export const getTodos: RequestHandler = async (_, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({ todos });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const createTodo: RequestHandler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: 'Validation failed, entered data is incorrect!', errors: errors.array() });
  }

  try {
    const { title, description } = req.body as { title: string; description: string };
    const todo = new Todo({
      title: title.trim(),
      description: description.trim()
    });
    await todo.save();
    res.status(201).json({ message: 'Created the todo', todo });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateTodo: RequestHandler<{ id: string }> = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: 'Validation failed, entered data is incorrect!', errors: errors.array() });
  }

  try {
    const todoId = req.params.id.trim();
    const { title, description } = req.body as { title: string; description: string };

    const todoObj = await Todo.findById(todoId);
    if (todoObj) {
      todoObj.title = title;
      todoObj.description = description;
      await todoObj.save();

      res.status(200).json({ message: `Todo with id: ${todoId} has been updated.` });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteTodo: RequestHandler<{ id: string }> = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: 'Validation failed, id should not be empty!', errors: errors.array() });
  }

  try {
    const todoId = req.params.id.trim();
    await Todo.findByIdAndDelete(todoId);

    res.status(200).json({ message: `Todo with id: ${todoId} has been deleted.` });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
