import { RegisterForm } from "../../../features/auth/components/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-12">
      <section className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-zinc-950">Create account</h1>
          <p className="mt-2 text-sm text-zinc-600">Register to access the HR system.</p>
        </div>
        <RegisterForm />
      </section>
    </main>
  );
}
