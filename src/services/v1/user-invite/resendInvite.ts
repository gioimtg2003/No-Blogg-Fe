import { axiosInstant } from '@/lib/axios';
import { UseMutationOptions } from '@/types/reactQuery';
import { useMutation } from '@tanstack/react-query';
import endpoint from './endpoint';

export interface ResendInviteRequest {
  inviteId: number;
}

export interface ResendInviteResponse {}

export const API_RESEND_INVITE = `${endpoint}/resend-invite`;
const getMutationKey = (params?: Record<string, any>) => [
  API_RESEND_INVITE,
  params,
];

const resendInvite = async (data: ResendInviteRequest) => {
  const { inviteId } = data;
  return axiosInstant.post<ResendInviteRequest, boolean>(
    `${API_RESEND_INVITE}/${inviteId}`
  );
};

export const useMutationResendInvite = (
  options: UseMutationOptions<boolean, ResendInviteRequest>
) =>
  useMutation({
    ...options,
    mutationFn: resendInvite,
    mutationKey: getMutationKey({ ...options }),
  });
