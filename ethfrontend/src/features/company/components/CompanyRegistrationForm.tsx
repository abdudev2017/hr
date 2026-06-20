"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRegisterCompany } from "../hooks/useRegisterCompany";
import { useAuthStore } from "@/stores/authStore";
import { useCompanyStore } from "@/stores/companyStore";
import type { ApiFieldErrors } from "../types";

export function CompanyRegistrationForm() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const setCompany = useCompanyStore((state) => state.setCompany);
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [tinNumber, setTinNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [licenseFileName, setLicenseFileName] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [subcity, setSubcity] = useState("");
  const [woreda, setWoreda] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<ApiFieldErrors>({});
  const registerMutation = useRegisterCompany();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setFieldErrors({});

    if (!user) {
      setMessage("Please login before registering a company.");
      return;
    }

    registerMutation.mutate(
      {
        userId: user.user_id,
        input: {
          company_name: companyName,
          company_email: companyEmail,
          tin_number: Number(tinNumber),
          phone_number: Number(phoneNumber),
          license_file: licenseFile as File,
          region,
          city,
          subcity,
          woreda,
          house_number: houseNumber,
        },
      },
      {
        onSuccess: (data) => {
          setCompany(data.company_uuid ?? "", companyName);
          setMessage(data.message);
          router.push("/dashboard");
        },
        onError: (error) => {
          if (error instanceof Error && "errors" in error) {
            setFieldErrors((error as { errors?: ApiFieldErrors }).errors ?? {});
          }
          setMessage(error instanceof Error ? error.message : "Company registration failed");
        },
      },
    );
  }

  function handleLicenseFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    setLicenseFile(file);
    setLicenseFileName(file?.name ?? "");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {message && (
        <div className="rounded-md border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-700">
          {message}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-700" htmlFor="company_name">
            Company name
          </label>
          <input
            id="company_name"
            type="text"
            value={companyName}
            onChange={(event) => setCompanyName(event.target.value)}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
            required
          />
          {fieldErrors.company_name && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.company_name.join(" ")}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-700" htmlFor="company_email">
            Company email
          </label>
          <input
            id="company_email"
            type="email"
            value={companyEmail}
            onChange={(event) => setCompanyEmail(event.target.value)}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
            required
          />
          {fieldErrors.company_email && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.company_email.join(" ")}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-700" htmlFor="tin_number">
            TIN number
          </label>
          <input
            id="tin_number"
            type="number"
            value={tinNumber}
            onChange={(event) => setTinNumber(event.target.value)}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
            required
          />
          {fieldErrors.tin_number && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.tin_number.join(" ")}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-700" htmlFor="phone_number">
            Phone number
          </label>
          <input
            id="phone_number"
            type="number"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
            required
          />
          {fieldErrors.phone_number && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.phone_number.join(" ")}</p>
          )}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-zinc-700" htmlFor="license_file">
          License file
        </label>
        <input
          id="license_file"
          type="file"
          accept="image/*,.pdf"
          onChange={handleLicenseFileChange}
          className="w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
          required
        />
        {licenseFileName && <p className="mt-1 text-sm text-zinc-600">{licenseFileName}</p>}
        {fieldErrors.license_file && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.license_file.join(" ")}</p>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-700" htmlFor="region">
            Region
          </label>
          <input
            id="region"
            type="text"
            value={region}
            onChange={(event) => setRegion(event.target.value)}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
            required
          />
          {fieldErrors.region && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.region.join(" ")}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-700" htmlFor="city">
            City
          </label>
          <input
            id="city"
            type="text"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
            required
          />
          {fieldErrors.city && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.city.join(" ")}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-700" htmlFor="subcity">
            Subcity
          </label>
          <input
            id="subcity"
            type="text"
            value={subcity}
            onChange={(event) => setSubcity(event.target.value)}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
            required
          />
          {fieldErrors.subcity && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.subcity.join(" ")}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-700" htmlFor="woreda">
            Woreda
          </label>
          <input
            id="woreda"
            type="text"
            value={woreda}
            onChange={(event) => setWoreda(event.target.value)}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
            required
          />
          {fieldErrors.woreda && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.woreda.join(" ")}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-zinc-700" htmlFor="house_number">
            House number
          </label>
          <input
            id="house_number"
            type="text"
            value={houseNumber}
            onChange={(event) => setHouseNumber(event.target.value)}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
            required
          />
          {fieldErrors.house_number && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.house_number.join(" ")}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={registerMutation.isPending}
        className="w-full rounded-md bg-zinc-950 px-4 py-2 font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {registerMutation.isPending ? "Registering company..." : "Register company"}
      </button>

      <p className="text-center text-sm text-zinc-600">
        Already have a company?{" "}
        <Link href="/company/select" className="font-medium text-zinc-950 underline">
          Select company
        </Link>
      </p>
    </form>
  );
}
