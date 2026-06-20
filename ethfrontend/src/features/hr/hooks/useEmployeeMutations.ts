"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEmployee, updateEmployee, deleteEmployee } from "../api/employees";
import type { Employee } from "../types";

export function useCreateEmployee() {
  const queryClient = useQueryClient();

  return useMutation<Employee, Error, { companyId: string; data: Parameters<typeof createEmployee>[1] }>({
    mutationFn: ({ companyId, data }) => createEmployee(companyId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
}

export function useUpdateEmployee() {
  const queryClient = useQueryClient();

  return useMutation<Employee, Error, { companyId: string; employeeId: string; data: Parameters<typeof updateEmployee>[2] }>({
    mutationFn: ({ companyId, employeeId, data }) => updateEmployee(companyId, employeeId, data),
    onSuccess:  () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
}

export function useDeleteEmployee() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { companyId: string; employeeId: string }>({
    mutationFn: ({ companyId, employeeId }) => deleteEmployee(companyId, employeeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
}