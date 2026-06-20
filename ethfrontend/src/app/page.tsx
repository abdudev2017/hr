import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-zinc-50 px-6 py-24">
      <h1 className="text-3xl font-semibold text-zinc-950">HR management system</h1>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/auth/register"
          className="rounded-md bg-zinc-950 px-5 py-3 font-medium text-white transition hover:bg-zinc-800"
        >
          Register
        </Link>
        <Link
          href="/auth/login"
          className="rounded-md border border-zinc-300 bg-white px-5 py-3 font-medium text-zinc-950 transition hover:bg-zinc-100"
        >
          Login
        </Link>
      </div>
    </main>
  );
}
