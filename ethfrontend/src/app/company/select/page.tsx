"use client";

import { useAuthStore } from "@/stores/authStore";
import { useCompanyStore } from "@/stores/companyStore";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { fetchCompaniesByUser } from "@/features/company/api/company";

export default function CompanySelectPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const companyId = useCompanyStore((state) => state.companyId);
  const setCompany = useCompanyStore((state) => state.setCompany);

  const { data: companiesData, isFetching, isError } = useQuery({
    queryKey: ["companies", user?.user_id],
    queryFn: () => fetchCompaniesByUser(user!.user_id),
    enabled: !!user?.user_id,
  });

  function handleSelect(companyId: string) {
    const company = companiesData?.companies.find((c) => c.company_id === companyId);
    if (company) {
      setCompany(company.company_id, company.company_name);
    }
  }

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-12">
      <section className="mx-auto max-w-4xl rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-zinc-950">Select Company</h1>
          <p className="mt-2 text-sm text-zinc-600">Choose a company to work with.</p>
        </div>

        {!user && (
          <p className="text-zinc-600">Please log in to view your companies.</p>
        )}

        {user && isFetching && (
          <p className="text-zinc-600">Loading companies...</p>
        )}

        {user && isError && (
          <p className="text-red-600">Failed to load companies. Please try again.</p>
        )}

        {user && companiesData && companiesData.companies.length === 0 && (
          <p className="text-zinc-600">No companies found. Register one to get started.</p>
        )}

        {user && companiesData && companiesData.companies.length > 0 && (
          <div className="space-y-3">
            {companiesData.companies.map((company) => (
              <div
                key={company.company_id}
                className="flex items-center justify-between rounded-lg border border-zinc-200 p-4"
              >
                <div>
                  <p className="font-medium text-zinc-950">{company.company_name}</p>
                  <p className="text-sm text-zinc-600">{company.company_email}</p>
                </div>
                <button
                  onClick={() => handleSelect(company.company_id)}
                  className="rounded-md bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
                >
                  {companyId === company.company_id ? "Selected" : "Select"}
                </button>
              </div>
            ))}
          </div>
        )}

        {companyId && (
          <button
            onClick={() => router.push("/dashboard")}
            className="mt-6 rounded-md bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
          >
            Go to Dashboard
          </button>
        )}

        <p className="mt-6 text-center text-sm text-zinc-600">
          Need to register a new company?{" "}
          <Link href="/company/register" className="font-medium text-zinc-950 underline">
            Register here
          </Link>
        </p>
      </section>
    </main>
  );
}