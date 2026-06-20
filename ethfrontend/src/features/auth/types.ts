export interface UserRegistrationInput {
  name: string;
  email: string;
  password: string;
  profile_image?: File | null;
}

export interface UserLoginInput {
  email: string;
  password: string;
}

export interface AuthUser {
  user_id: string;
  name: string;
  email: string;
}

export interface ApiFieldErrors {
  [key: string]: string[];
}

export interface AuthApiResponse<T = unknown> {
  success: boolean;
  message: string;
  user?: T;
  errors?: ApiFieldErrors;
}
 
