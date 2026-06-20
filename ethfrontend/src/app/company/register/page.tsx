import { CompanyRegistrationForm } from "@/features/company/components/CompanyRegistrationForm";

export default function CompanyRegisterPage() {
  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-12">
      <section className="mx-auto max-w-4xl rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-zinc-950">Company registration</h1>
          <p className="mt-2 text-sm text-zinc-600">Register your company to start using the HR system.</p>
        </div>
        <CompanyRegistrationForm />
      </section>
    </main>
  );
}
