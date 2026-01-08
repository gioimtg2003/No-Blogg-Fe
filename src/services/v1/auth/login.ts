import { axiosInstant } from '@/lib/axios';
import { UseMutationOptions } from '@/types/reactQuery';
import { useMutation } from '@tanstack/react-query';
import endpoint from './endpoint';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {}

const LOGIN_API_URL = `${endpoint}/login`;
const getMutationKey = (params?: Record<string, unknown>) => [
  LOGIN_API_URL,
  params,
];

const login = async (params: LoginRequest) => {
  return axiosInstant.post<LoginRequest, LoginResponse>(LOGIN_API_URL, params);
};

export const useLogin = (
  options: UseMutationOptions<LoginResponse, LoginRequest>
) =>
  useMutation({
    ...options,
    mutationFn: login,
    mutationKey: getMutationKey({ ...options }),
  });
