"use client";

import Link from "next/link";
import { useAuthStore } from "@/stores/authStore";
import { useCompanyStore } from "@/stores/companyStore";

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const companyId = useCompanyStore((state) => state.companyId);
  const companyName = useCompanyStore((state) => state.companyName);
  const companies = useCompanyStore((state) => state.companies);
  

 
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-12">
      <section className="mx-auto max-w-5xl space-y-6">
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-zinc-950">Dashboard</h1>
          <p className="mt-2 text-sm text-zinc-600">Manage company and HR workflows from one place.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {/* <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-zinc-500">User</p>
            <p className="mt-2 font-medium text-zinc-950">{user?.name ?? "Not logged in"}</p>
            <p className="mt-1 text-sm text-zinc-600">{user?.email ?? ""}</p>
          </div> */}

          {/* <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-zinc-500">Company ID</p>
            <p className="mt-2 break-words font-medium text-zinc-950">{companyId ?? "Not selected"}</p>
          </div> */}

          {/* <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-zinc-500">Company</p>
            <p className="mt-2 font-medium text-zinc-950">{companyName ?? "Not selected"}</p>
          </div> */}
        </div>


        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href="/company/register"
            className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50"
          >
            <h2 className="text-lg font-semibold text-zinc-950">Company Registration</h2>
            <p className="mt-2 text-sm text-zinc-600">Create or select the company used by HR workflows.</p>
          </Link>

          <Link
            href="/hr"
            className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50"
          >
            <h2 className="text-lg font-semibold text-zinc-950">HR Dashboard</h2>
            <p className="mt-2 text-sm text-zinc-600">Employee directory and HR management features.</p>
          </Link>
        </div>
      </section>
    </main>
  );
}