
import { useQuery } from '@tanstack/react-query';
import useAuthorizedHttp from '@/hooks/use-authorized-http';
import { useDispatch } from 'react-redux';
import { appActions } from '@/store/app-slice';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { UserType } from '@/types/index';

export const useGetActiveUser = () => {
  const http = useAuthorizedHttp();
  const dispatch = useDispatch();
  const router = useRouter();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['active', 'user', 'loggedin'],
    queryFn: async () => {
      try {
        const res = await http({
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/private/user/`,
          method: 'get',
        });
        return res.data as UserType;
      } catch (error: any) {
        console.error(error);
        if (error.response.status === 403) {
          dispatch(appActions.logout());
          router.push('/login');
        }
        toast.error('Session expired. Please login again.');
      }
    },
  });

  return { data, isLoading, error, refetch };
};
