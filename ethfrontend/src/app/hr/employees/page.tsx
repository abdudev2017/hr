"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useCompanyStore } from "@/stores/companyStore";
import { getEmployees, getEmployeeCounts } from "@/features/hr/api/employees";
import type { EmployeeFormData } from "@/features/hr/api/employees";
import { useCreateEmployee, useUpdateEmployee, useDeleteEmployee } from "@/features/hr/hooks/useEmployeeMutations";
import { EmployeeForm } from "@/features/hr/components/EmployeeForm";
import type { EmployeeFilters, Employee } from "@/features/hr/types";

export default function EmployeesPage() {
  const companyId = useCompanyStore((state) => state.companyId);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [deletingEmployee, setDeletingEmployee] = useState<Employee | null>(null);
  const [filters, setFilters] = useState<EmployeeFilters>({
    search: "",
    department: "All",
  });

  const { data: employees, isLoading, isError } = useQuery({
    queryKey: ["employees", companyId, filters],
    queryFn: () => getEmployees(companyId!, filters),
    enabled: !!companyId,
  });
 
  
  const { data: counts } = useQuery({
    queryKey: ["employee-counts", companyId],
    queryFn: () => getEmployeeCounts(companyId!),
    enabled: !!companyId,
  });

  const createMutation = useCreateEmployee();
  const updateMutation = useUpdateEmployee();
  const deleteMutation = useDeleteEmployee();

  function handleCreateSubmit(data: EmployeeFormData) {
    if (companyId) {
      createMutation.mutate({ companyId, data }, { onSuccess: () => setShowForm(false) });
    }
  }

  function handleUpdateSubmit(data: EmployeeFormData) {
    if (companyId && editingEmployee) {
      
      updateMutation.mutate(
        { companyId, employeeId: editingEmployee.id, data },
        { onSuccess: () => setEditingEmployee(null) },
      );
    }
  }

  function handleDeleteConfirm() {
    if (companyId && deletingEmployee) {
      deleteMutation.mutate(
        { companyId, employeeId: deletingEmployee.id },
        { onSuccess: () => setDeletingEmployee(null) },
      );
    }
  }

  const isMutating = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-12">
      <section className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-950">Employees</h1>
            <p className="mt-1 text-sm text-zinc-600">Search and manage employees.</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            disabled={isMutating}
            className="rounded-md bg-zinc-950 px-4 py-2 font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Add Employee
          </button>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700" htmlFor="search">
                Search
              </label>
              <input
                id="search"
                type="text"
                placeholder="Search employees..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700" htmlFor="department">
                Department
              </label>
              <select
                id="department"
                value={filters.department}
                onChange={(e) => setFilters({ ...filters, department: e.target.value as EmployeeFilters["department"] })}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
              >
                <option value="All">All Departments</option>
                <option value="HR">HR</option>
                <option value="Engineering">Engineering</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
                <option value="Finance">Finance</option>
                <option value="Operations">Operations</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => setFilters({ search: "", department: "All" })}
                className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-950 transition hover:bg-zinc-100"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-zinc-500">Total Employees</p>
            <p className="mt-2 text-2xl font-semibold text-zinc-950">{counts?.total ?? 0}</p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-zinc-500">Active</p>
            <p className="mt-2 text-2xl font-semibold text-zinc-950">{counts?.active ?? 0}</p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-zinc-500">On Leave</p>
            <p className="mt-2 text-2xl font-semibold text-zinc-950">{counts?.on_leave ?? 0}</p>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white shadow-sm">
          <table className="w-full">
            <thead className="border-b border-zinc-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-zinc-600">Id No</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-zinc-600">Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-zinc-600">Email</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-zinc-600">Department</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-zinc-600">Role</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-zinc-600">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-zinc-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-sm text-zinc-600">
                    Loading employees...
                  </td>
                </tr>
              )}
              {isError && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-sm text-red-600">
                    Failed to load employees.
                  </td>
                </tr>
              )}
              {employees?.map((employee) => (
                <tr key={employee.id} className="border-b border-zinc-100 last:border-0">
                  <td className="px-4 py-3 text-sm text-zinc-600">{employee.employee_number}</td>
                  <td className="px-4 py-3 text-sm text-zinc-900">
                    {employee.firstName} {employee.lastName}
                  </td>
                  <td className="px-4 py-3 text-sm text-zinc-600">{employee.email}</td>
                  <td className="px-4 py-3 text-sm text-zinc-600">{employee.department}</td>
                  <td className="px-4 py-3 text-sm text-zinc-600">{employee.role}</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`inline-block rounded px-2 py-1 text-xs font-medium ${
                        employee.status === "active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {employee.status === "active" ? "Active" : "On Leave"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <button
                      onClick={() => setEditingEmployee(employee)}
                      disabled={isMutating}
                      className="mr-2 rounded-md px-3 py-1 text-xs font-medium text-zinc-600 underline hover:text-zinc-900 disabled:cursor-not-allowed"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeletingEmployee(employee)}
                      disabled={isMutating}
                      className="rounded-md px-3 py-1 text-xs font-medium text-red-600 underline hover:text-red-800 disabled:cursor-not-allowed"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {!isLoading && !isError && employees?.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-sm text-zinc-600">
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
        


      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-zinc-950">Add Employee</h2>
            <EmployeeForm
              onSubmit={handleCreateSubmit}
              onCancel={() => setShowForm(false)}
              isSubmitting={createMutation.isPending}
            />
          </div>
        </div>
      )}

      {editingEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-zinc-950">Edit Employee</h2>
            <EmployeeForm
              employee={editingEmployee}
              onSubmit={handleUpdateSubmit}
              onCancel={() => setEditingEmployee(null)}
              isSubmitting={updateMutation.isPending}
              
              
            />
          </div>
        </div>
      )}

      {deletingEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-zinc-950">Delete Employee</h2>
            <p className="text-sm text-zinc-600">
              Are you sure you want to delete {deletingEmployee.firstName} {deletingEmployee.lastName}?
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleDeleteConfirm}
                disabled={deleteMutation.isPending}
                className="rounded-md bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
              </button>
              <button
                onClick={() => setDeletingEmployee(null)}
                disabled={deleteMutation.isPending}
                className="rounded-md border border-zinc-300 bg-white px-4 py-2 font-medium text-zinc-950 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}