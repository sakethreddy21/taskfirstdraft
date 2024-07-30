// hooks/useLogin.ts
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { appActions } from  '@/app/store/app-slice';
import { z } from 'zod';
const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const LoginSchema = z.object({
    usermail: z
      .string({
        required_error: 'e-mail is required',
      })
      .email({
        message: 'Invalid e-mail',
      }),
    password: z
      .string({
        required_error: 'password is required',
      })
      .min(8, {
        message: 'Password must be at least 8 characters',
      }),
  });


  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setLoading(true);
    setError(null);
    console.log(data);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usermail: data.usermail,
          password: data.password,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        dispatch(appActions.login({
          accessToken: result.token || '',
          usermail: data.usermail,
          username: result.username,
          id: result.id,
          role: 'USER', // Adjust role if necessary
        }));
        
        router.push('/');
        toast.success('Login Successful.');
      } else {
        const error = await response.json();
        setError(error.errorMessage);
        toast.error(error.errorMessage || 'Login failed');
      }
    } catch (error) {
      setError('Something went wrong!');
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return {
    onSubmit,
    loading,
    error,
  };
};

export default useLogin;
