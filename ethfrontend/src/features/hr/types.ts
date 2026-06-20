export const DEPARTMENTS = [
  "HR",
  "Engineering",
  "Sales",
  "Marketing",
  "Finance",
  "Operations",
] as const;

export type Department = (typeof DEPARTMENTS)[number];

export type EmployeeStatus = "active" | "on_leave";

export interface EmployeeItemDTO {
  uuid: string;
  employee_number: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string | null;
  department: Department;
  role: string;
  status: EmployeeStatus;
  join_date: string;
  company_name: string;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface Employee {
  id: string;
  employee_number: string;
  firstName: string;
  lastName: string;
  email: string;
  phone_number: string | null;
  department: Department;
  role: string;
  status: EmployeeStatus;
  joinDate: string;
  company_name: string;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export type EmployeeInput = Omit<Employee, "id" | "joinDate" | "company_name" | "created_by" | "created_at" | "updated_at"> & {
  joinDate?: string;
};

export interface EmployeeFilters {
  search: string;
  department: Department | "All";
}