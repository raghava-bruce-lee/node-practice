import { TodoStatus } from '../constants/todos';

export interface JwtCustomPayload {
  userId: string;
}

// update AUTH_REQUEST constant if this inteface keys were changed
export interface LoginPayload {
  email: string;
  password: string;
}

// update AUTH_REQUEST constant if this inteface keys were changed
export interface SignupPayload extends LoginPayload {
  name: string;
}

// update TODO_PAYLOAD constant if this inteface keys were changed
export interface TodoPayload {
  title: string;
  description: string;
  status: TodoStatus;
}
