// The key values should match with TodoPayload keys
export const TODO_PAYLOAD = {
  title: 'title',
  description: 'description',
  status: 'status'
};

// The key values should match with SignupPayload keys
export const AUTH_REQUEST = {
  name: 'name',
  email: 'email',
  password: 'password'
};

export enum TODO_STATUS {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}

export type TodoStatus = TODO_STATUS;
