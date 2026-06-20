"use client";

import { useEffect, type ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchCompaniesByUser } from "@/features/company/api/company";
import { useAuthStore } from "@/stores/authStore";
import { useCompanyStore } from "@/stores/companyStore";

export function Navbar() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const clearUser = useAuthStore((state) => state.clearUser);
  const companyId = useCompanyStore((state) => state.companyId);
  const companyName = useCompanyStore((state) => state.companyName);
  const companies = useCompanyStore((state) => state.companies);
  const setCompany = useCompanyStore((state) => state.setCompany);
  const clearCompany = useCompanyStore((state) => state.clearCompany);
  const setCompanies = useCompanyStore((state) => state.setCompanies);

  const { data: companiesData, isFetching } = useQuery({
    queryKey: ["companies", user?.user_id],
    queryFn: () => fetchCompaniesByUser(user!.user_id),
    enabled: !!user?.user_id,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (companiesData?.companies) {
      setCompanies(companiesData.companies);
    }
  }, [companiesData, setCompanies]);

  const availableCompanies = companiesData?.companies ?? companies;
  const selectedCompany = availableCompanies.find((company) => company.company_id === companyId);
  const selectedLabel = companyName ?? selectedCompany?.company_name ?? "Select company";

  function handleCompanyChange(event: ChangeEvent<HTMLSelectElement>) {
    const selectedCompanyId = event.target.value;
    if (!selectedCompanyId) {
      clearCompany();
      return;
    }

    const company = availableCompanies.find((item) => item.company_id === selectedCompanyId);
    if (company) {
      setCompany(company.company_id, company.company_name);
    }
  }

  function handleLogout() {
    clearUser();
    clearCompany();
    router.push("/auth/login");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <nav className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-950 text-sm font-semibold text-white">
              HR
            </div>
            <div>
              <p className="text-base font-semibold text-zinc-950">HR Management</p>
              <p className="text-xs text-zinc-500">Company workspace</p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="rounded-md px-3 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-950"
                >
                  Dashboard
                </Link>
                <Link
                  href="/hr"
                  className="rounded-md px-3 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-950"
                >
                  HR
                </Link>
                <Link
                  href="/company/register"
                  className="rounded-md px-3 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-950"
                >
                  Company
                </Link>
                <button
                  onClick={handleLogout}
                  className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-950"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-950"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="rounded-md bg-zinc-950 px-3 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
              {user ? user.name : "Guest"}
            </div>
            {user && (
              <div className="text-sm text-zinc-500">
                {companyId ? selectedLabel : "No company selected"}
              </div>
            )}
          </div>

          <div className="flex flex-1 items-center gap-3 sm:justify-end">
            <label className="text-sm font-medium text-zinc-700" htmlFor="company-selector">
              Company
            </label>
            <select
              id="company-selector"
              value={companyId ?? ""}
              onChange={handleCompanyChange}
              disabled={!user || isFetching}
              className="w-full max-w-xs rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 disabled:cursor-not-allowed disabled:opacity-60 sm:max-w-sm"
            >
              <option value="">{isFetching ? "Loading companies..." : "Select a company"}</option>
              {availableCompanies.map((company) => (
                <option key={company.company_id} value={company.company_id}>
                  {company.company_name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </nav>
    </header>
  );
}
