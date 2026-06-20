import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CompanyData } from "@/features/company/types";

interface CompanyStore {
  companyId: string | null;
  companyName: string | null;
  companies: CompanyData[];
  setCompany: (companyId: string, companyName: string) => void;
  setCompanies: (companies: CompanyData[]) => void;
  clearCompany: () => void;
}

export const useCompanyStore = create<CompanyStore>()(
  persist(
    (set) => ({
      companyId: null,
      companyName: null,
      companies: [],
      setCompany: (companyId, companyName) => set({ companyId, companyName }),
      setCompanies: (companies) => set({ companies }),
      clearCompany: () => set({ companyId: null, companyName: null, companies: [] }),
    }),
    {
      name: "company-store",
    },
  ),
);