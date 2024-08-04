import { Schema, model } from 'mongoose';

const todoSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String
});

export const Todo = model('Todo', todoSchema);
