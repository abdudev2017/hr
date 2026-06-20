export interface CompanyAddressInput {
  region: string;
  city: string;
  subcity: string;
  woreda: string;
  house_number: string;
}

export interface CompanyRegistrationInput extends CompanyAddressInput {
  company_name: string;
  company_email: string;
  license_file: File;
  tin_number: number;
  phone_number: number;
}

export interface CompanyApiResponse {
  success: boolean;
  message: string;
  company_uuid?: string;
}

export interface CompanyData {
  company_id: string;
  company_name: string;
  company_email: string;
  license_file: string | null;
  tin_number: number;
  phone_number: string;
  address?: {
    region: string;
    city: string;
    subcity: string;
    woreda: string;
    house_number: string;
  } | null;
}

export interface CompanyListResponse {
  success: boolean;
  message: string;
  companies: CompanyData[];
}

export interface ApiFieldErrors {
  [key: string]: string[];
}
