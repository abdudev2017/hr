import type { ApiFieldErrors, AuthApiResponse, AuthUser, UserLoginInput, UserRegistrationInput } from "../types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api/v1";

export class ApiError extends Error {
  errors?: ApiFieldErrors;

  constructor(message: string, errors?: ApiFieldErrors) {
    super(message);
    this.name = "ApiError";
    this.errors = errors;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(data.message ?? "Request failed", data.errors);
  }

  return data as T;
}

export async function registerUser(input: UserRegistrationInput): Promise<AuthApiResponse> {
  const formData = new FormData();
  formData.append("name", input.name);
  formData.append("email", input.email);
  formData.append("password", input.password);

  if (input.profile_image) {
    formData.append("profile_image", input.profile_image);
  }

  return request<AuthApiResponse>("/user/register/", {
    method: "POST",
    body: formData,
  });
}

export async function loginUser(input: UserLoginInput): Promise<AuthApiResponse<AuthUser>> {
  return request<AuthApiResponse<AuthUser>>("/user/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });
}
