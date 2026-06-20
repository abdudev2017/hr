"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLoginUser } from "../hooks/useLoginUser";
import { useAuthStore } from "@/stores/authStore";
import type { ApiFieldErrors } from "../types";

export function LoginForm() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<ApiFieldErrors>({});
  const loginMutation = useLoginUser();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setFieldErrors({});

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          if (data.user) {
            setUser(data.user);
          }
          setMessage(data.message);
          router.push("/hr");
        },
        onError: (error) => {
          if (error instanceof Error && "errors" in error) {
            setFieldErrors((error as { errors?: ApiFieldErrors }).errors ?? {});
          }
          setMessage(error instanceof Error ? error.message : "Login failed");
        },
      },
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {message && (
        <div className="rounded-md border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-700">
          {message}
        </div>
      )}

      <div>
        <label className="mb-1 block text-sm font-medium text-zinc-700" htmlFor="login-email">
          Email
        </label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
          required
        />
        {fieldErrors.email && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.email.join(" ")}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-zinc-700" htmlFor="login-password">
          Password
        </label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
          required
        />
        {fieldErrors.password && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.password.join(" ")}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loginMutation.isPending}
        className="w-full rounded-md bg-zinc-950 px-4 py-2 font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loginMutation.isPending ? "Signing in..." : "Login"}
      </button>

      <p className="text-center text-sm text-zinc-600">
        Do not have an account?{" "}
        <Link href="/auth/register" className="font-medium text-zinc-950 underline">
          Register
        </Link>
      </p>
    </form>
  );
}
