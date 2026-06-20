"use client";

import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/auth";
import type { AuthApiResponse, AuthUser, UserLoginInput } from "../types";

export function useLoginUser() {
  return useMutation<AuthApiResponse<AuthUser>, Error, UserLoginInput>({
    mutationFn: loginUser,
  });
}
