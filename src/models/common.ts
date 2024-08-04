export interface JwtCustomPayload {
  userId: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload extends LoginPayload {
  name: string;
}

export interface TodoPayload {
  title: string;
  description: string;
}
