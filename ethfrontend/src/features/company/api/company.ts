import type { ApiFieldErrors, CompanyApiResponse, CompanyListResponse, CompanyRegistrationInput } from "../types";

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

export async function registerCompany(userId: string, input: CompanyRegistrationInput): Promise<CompanyApiResponse> {
  const formData = new FormData();
  formData.append("company_name", input.company_name);
  formData.append("company_email", input.company_email);
  formData.append("license_file", input.license_file);
  formData.append("tin_number", String(input.tin_number));
  formData.append("phone_number", String(input.phone_number));
  formData.append("region", input.region);
  formData.append("city", input.city);
  formData.append("subcity", input.subcity);
  formData.append("woreda", input.woreda);
  formData.append("house_number", input.house_number);

  return request<CompanyApiResponse>(`/company/register/${userId}/`, {
    method: "POST",
    body: formData,
  });
}

export async function fetchCompaniesByUser(userId: string): Promise<CompanyListResponse> {
  return request<CompanyListResponse>(`/company/all/${userId}/`, {
    method: "GET",
  });
}
