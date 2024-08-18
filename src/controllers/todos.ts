import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import { Todo } from '../models/todos';
import { User } from '../models/users';
import { TodoPayload } from '../models/common';
import constants from '../constants/common';
import omit from 'lodash/omit';

export const getTodos: RequestHandler = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(500).json({ message: constants.UNEXPECTED_ERROR });
    }

    const todos = (
      await user.populate({
        path: 'todos',
        select: '-userId'
      })
    ).todos;
    res.status(200).json({ todos });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const createTodo: RequestHandler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: constants.VALIDATION_FAILED, errors: errors.array() });
  }

  try {
    const { title, description, status } = req.body as TodoPayload;
    const todo = new Todo({
      title: title.trim(),
      description: description.trim(),
      status,
      userId: req.userId
    });
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(500).json({ message: constants.UNEXPECTED_ERROR });
    }

    user.todos.push(todo._id);
    await Promise.all([todo.save(), user.save()]);

    res.status(201).json({ message: 'Created the todo', todo: omit(todo.toObject(), ['userId']) });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateTodo: RequestHandler<{ id: string }> = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: constants.VALIDATION_FAILED, errors: errors.array() });
  }

  try {
    const todoId = req.params.id.trim();
    const { title, description, status } = req.body as TodoPayload;

    const todoObj = await Todo.findById(todoId);
    if (!todoObj) {
      return res.status(400).json({ message: 'Todo not found!' });
    }

    todoObj.title = title;
    todoObj.description = description;
    todoObj.status = status;
    await todoObj.save();

    res
      .status(200)
      .json({
        message: `Todo with id: ${todoId} has been updated.`,
        todo: omit(todoObj.toObject(), ['userId'])
      });
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
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(500).json({ message: constants.UNEXPECTED_ERROR });
    }

    user.todos = user.todos.filter((todo) => todo._id.toString() !== todoId);
    await Promise.all([Todo.findByIdAndDelete(todoId), user.save()]);

    res.status(200).json({ message: `Todo with id: ${todoId} has been deleted.` });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
