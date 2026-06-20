import type { Employee, EmployeeFilters } from "../types";

export type EmployeeFormData = Parameters<typeof createEmployee>[1];

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api/v1";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    cache: "no-store",
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

function transformEmployee(item: Record<string, unknown>): Employee {
  return {
    id: item.uuid as string,
    employee_number: item.employee_number as string,
    firstName: item.first_name as string,
    lastName: item.last_name as string,
    email: item.email as string,
    phone_number: item.phone_number as string | null,
    department: item.department as Employee["department"],
    role: item.role as string,
    status: item.status as Employee["status"],
    joinDate: item.join_date as string,
    company_name: item.company_name as string,
    created_by: item.created_by as string | null,
    created_at: item.created_at as string,
    updated_at: item.updated_at as string,
  };
}

export async function getEmployees(companyId: string, filters: EmployeeFilters): Promise<Employee[]> {
  const params = new URLSearchParams();
  params.set("company_id", companyId);

  if (filters.search.trim()) {
    params.set("search", filters.search.trim());
  }

  if (filters.department !== "All") {
    params.set("department", filters.department);
  }

  const response = await request<{ success: boolean; message: string; items: Record<string, unknown>[] }>(
    `/employees/?${params.toString()}`,
  );
  return response.items.map(transformEmployee);
}

export async function getEmployeeById(companyId: string, employeeId: string): Promise<Employee> {
  const params = new URLSearchParams();
  params.set("company_id", companyId);
  const response = await request<{ employee: Record<string, unknown> }>(`/employees/${employeeId}/?${params.toString()}`);
  return transformEmployee(response.employee);
}

export async function createEmployee(
  companyId: string,
  data: { employee_number: string; first_name: string; last_name: string; email: string; phone_number?: string; department: string; role: string; status?: string; join_date: string },
): Promise<Employee> {
  const params = new URLSearchParams();
  params.set("company_id", companyId);
  const response = await request<{ success: boolean; message: string; employee: Record<string, unknown> }>(`/employees/?${params.toString()}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return transformEmployee(response.employee);
}

export async function updateEmployee(
  companyId: string,
  employeeId: string,
  data: Partial<{ employee_number: string; first_name: string; last_name: string; email: string; phone_number: string; department: string; role: string; status: string; join_date: string }>,
): Promise<Employee> {
  const params = new URLSearchParams();
  params.set("company_id", companyId);
  const response = await request<{ success: boolean; message: string; employee: Record<string, unknown> }>(
    `/employees/${employeeId}/?${params.toString()}`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    },
  );
  return transformEmployee(response.employee);
}

export async function deleteEmployee(companyId: string, employeeId: string): Promise<void> {
  const params = new URLSearchParams();
  params.set("company_id", companyId);
  await request<void>(`/employees/${employeeId}/?${params.toString()}`, {
    method: "DELETE",
  });
}

export async function getEmployeeCounts(companyId: string): Promise<{ total: number; active: number; on_leave: number }> {
  const response = await request<{ success: boolean; message: string; total_employees: number; active_employees: number; on_leave_employees: number }>(
    `/employees/summary/?company_id=${companyId}`,
  );
  return {
    total: response.total_employees,
    active: response.active_employees,
    on_leave: response.on_leave_employees,
  };
}