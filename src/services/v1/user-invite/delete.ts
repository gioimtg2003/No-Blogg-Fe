import { axiosInstant } from '@/lib/axios';
import { UseMutationOptions } from '@/types/reactQuery';
import { useMutation } from '@tanstack/react-query';
import endpoint from './endpoint';

export interface DeleteInviteRequest {
  inviteId: number;
}

export interface DeleteInviteResponse {}
export const API_DELETE_INVITE = `${endpoint}`;
const getMutationKey = (params?: Record<string, any>) => [
  API_DELETE_INVITE,
  params,
];

const deleteInvite = async (data: DeleteInviteRequest) => {
  const { inviteId } = data;
  return axiosInstant.delete<DeleteInviteRequest, boolean>(
    `${API_DELETE_INVITE}/${inviteId}`
  );
};

export const useMutationDeleteInvite = (
  options: UseMutationOptions<boolean, DeleteInviteRequest>
) =>
  useMutation({
    ...options,
    mutationFn: deleteInvite,
    mutationKey: getMutationKey({ ...options }),
  });
