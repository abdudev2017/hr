"use client";

import Link from "next/link";
import { useCompanyStore } from "@/stores/companyStore";

export default function HRPage() {
  const companyId = useCompanyStore((state) => state.companyId);
  const companyName = useCompanyStore((state) => state.companyName);

  if (!companyId) {
    return (
      <main className="min-h-screen bg-zinc-50 px-6 py-12">
        <section className="mx-auto max-w-5xl">
          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-semibold text-zinc-950">HR Dashboard</h1>
            <p className="mt-2 text-sm text-zinc-600">Please select a company first.</p>
            <Link href="/dashboard" className="mt-4 inline-block rounded-md bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800">
              Go to Dashboard
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-12">
      <section className="mx-auto max-w-5xl space-y-6">
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-zinc-950">HR Dashboard</h1>
          <p className="mt-2 text-sm text-zinc-600">Managing: {companyName}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Link
            href="/hr/employees"
            className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50"
          >
            <h2 className="text-lg font-semibold text-zinc-950">Employees</h2>
            <p className="mt-2 text-sm text-zinc-600">View and manage employee directory.</p>
          </Link>

          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-950">Departments</h2>
            <p className="mt-2 text-sm text-zinc-600">HR, Engineering, Sales, Marketing, Finance, Operations.</p>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-950">Reports</h2>
            <p className="mt-2 text-sm text-zinc-600">Generate HR reports and analytics.</p>
          </div>
        </div>
      </section>
    </main>
  );
}