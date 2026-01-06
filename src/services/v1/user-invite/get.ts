import { InviteType } from '@/constants';
import { axiosInstant } from '@/lib/axios';
import { UseGetOptions } from '@/types/reactQuery';
import { useQuery } from '@tanstack/react-query';
import endpoint from './endpoint';

export interface IGetUsersInviteRequest {}

export interface IGetUsersInviteResponse {
  id: number;
  email: string;
  type: InviteType;
  createdAt: string;
  invitedBy: {
    id: number;
    email: string;
  };
  usedAt?: string;
}

export const GET_USERS_INVITE_API_URL = `${endpoint}`;

const getQueryKey = (params?: Record<string, unknown>) => [
  GET_USERS_INVITE_API_URL,
  params,
];

export const getUsersInvite = async () => {
  return axiosInstant.get<IGetUsersInviteRequest, IGetUsersInviteResponse[]>(
    GET_USERS_INVITE_API_URL
  );
};

export const useGetUsersInvite = (
  options: UseGetOptions<IGetUsersInviteResponse[], IGetUsersInviteRequest>
) =>
  useQuery({
    ...options,
    queryKey: getQueryKey({ ...options }),
    queryFn: getUsersInvite,
  });
