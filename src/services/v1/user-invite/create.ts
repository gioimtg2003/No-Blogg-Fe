import { axiosInstant } from '@/lib/axios';
import { UseMutationOptions } from '@/types/reactQuery';
import { useMutation } from '@tanstack/react-query';
import endpoint from './endpoint';

export interface CreateInviteRequest {
  email: string[];
}

export interface CreateInviteResponse {}
export const API_CREATE_INVITE = `${endpoint}`;
const getMutationKey = (params?: Record<string, any>) => [
  API_CREATE_INVITE,
  params,
];

const createInvite = async (data: CreateInviteRequest) => {
  const { email } = data;
  return axiosInstant.post<CreateInviteRequest, boolean>(
    `${API_CREATE_INVITE}`,
    { email }
  );
};

export const useCreateInvite = (
  options: UseMutationOptions<boolean, CreateInviteRequest>
) =>
  useMutation({
    ...options,
    mutationFn: createInvite,
    mutationKey: getMutationKey({ ...options }),
  });
