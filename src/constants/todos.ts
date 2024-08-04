import { TodoPayload, SignupPayload, LoginPayload } from '../models/common';

export const TODO_PAYLOAD: TodoPayload = {
  title: 'title',
  description: 'description'
};

export const AUTH_REQUEST: SignupPayload = {
  name: 'name',
  email: 'email',
  password: 'password'
};
