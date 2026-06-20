"use client";

import { useMutation } from "@tanstack/react-query";
import { registerCompany } from "../api/company";
import type { CompanyApiResponse, CompanyRegistrationInput } from "../types";

export function useRegisterCompany() {
  return useMutation<CompanyApiResponse, Error, { userId: string; input: CompanyRegistrationInput }>({
    mutationFn: ({ userId, input }) => registerCompany(userId, input),
  });
}
