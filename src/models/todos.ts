import { Schema, model } from 'mongoose';

const todoSchema = new Schema({
  //   userId: {
  //     type: String,
  //     required: true
  //   },
  title: {
    type: String,
    required: true
  },
  description: String
});

export const Todo = model('Todo', todoSchema);
