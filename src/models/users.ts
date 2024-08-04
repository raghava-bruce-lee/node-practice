import { Schema, model } from 'mongoose';
import constants from '../constants/common';

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
      ref: constants.TODO
    }
  ]
});

export const User = model(constants.USER, userSchema);
