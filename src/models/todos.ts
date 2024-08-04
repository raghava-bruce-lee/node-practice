import { Schema, model } from 'mongoose';
import { TODO_STATUS } from '../constants/todos';
import constants from '../constants/common';

const todoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: TODO_STATUS.NOT_STARTED
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: constants.USER,
    required: true
  }
});

export const Todo = model(constants.TODO, todoSchema);
