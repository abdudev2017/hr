"use client";

import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/auth";
import type { AuthApiResponse, UserRegistrationInput } from "../types";

export function useRegisterUser() {
  return useMutation<AuthApiResponse, Error, UserRegistrationInput>({
    mutationFn: registerUser,
  });
}
