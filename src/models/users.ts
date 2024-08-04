import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  todos: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Todo'
    }
  ]
});

export const User = model('User', userSchema);
