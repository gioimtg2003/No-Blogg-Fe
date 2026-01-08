import { axiosInstant } from '@/lib/axios';
import { UseGetOptions } from '@/types/reactQuery';
import { useQuery } from '@tanstack/react-query';
import endpoint from './endpoint';

export interface IGetUsersRequest {}

export interface IGetUsersResponse {
  id: number;
  email: string;
  teams: {
    name: string;
    id: number;
  }[];
  roles: {
    name: string;
    id: number;
  }[];
  createdAt: string;
}

const USER_TEAM_API_URL = `${endpoint}/users`;

const getQueryKey = (params?: Record<string, unknown>) => [
  USER_TEAM_API_URL,
  params,
];

export const getUsers = async () => {
  return axiosInstant.get<IGetUsersRequest, IGetUsersResponse[]>(
    USER_TEAM_API_URL
  );
};

export const useGetUsers = (
  options: UseGetOptions<IGetUsersResponse[], IGetUsersRequest>
) =>
  useQuery({
    ...options,
    queryKey: getQueryKey({ ...options }),
    queryFn: getUsers,
  });
