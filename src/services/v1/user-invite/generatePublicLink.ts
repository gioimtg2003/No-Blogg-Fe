import { axiosInstant } from '@/lib/axios';
import { UseGetOptions } from '@/types/reactQuery';
import { useQuery } from '@tanstack/react-query';
import endpoint from './endpoint';

export interface IGeneratePublicLinkRequest {}

export interface IGeneratePublicLinkResponse {
  url: string;
}

const GENERATE_PUBLIC_LINK_API_URL = `${endpoint}/public-invite/generate`;
const getQueryKey = (params?: Record<string, unknown>) => [
  GENERATE_PUBLIC_LINK_API_URL,
  params,
];

export const generatePublicLink = async () => {
  return axiosInstant.get<
    IGeneratePublicLinkRequest,
    IGeneratePublicLinkResponse
  >(GENERATE_PUBLIC_LINK_API_URL);
};

export const useGetPublicLinkInvite = (
  options: UseGetOptions<
    IGeneratePublicLinkResponse,
    IGeneratePublicLinkRequest
  >
) => {
  return useQuery({
    ...options,
    queryKey: getQueryKey({ ...options }),
    queryFn: generatePublicLink,
  });
};
