import { Schema, model } from 'mongoose';
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
  userId: {
    type: Schema.Types.ObjectId,
    ref: constants.USER,
    required: true
  }
});

export const Todo = model(constants.TODO, todoSchema);
