// hooks/useRegister.ts
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { z } from 'zod';


const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const RegisterSchema = z.object({
    username: z
      .string({
        required_error: 'Username is required',
      })
      .min(3, {
        message: 'Username must be at least 3 characters',
      }),
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


  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    setLoading(true);
    setError(null);
    console.log(data);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.username,
          usermail: data.usermail,
          password: data.password,
        }),
      });

      if (response.ok) {
        toast.success('Registered Successfully.');
        router.push('/login');
      } else {
        const error = await response.json();
        setError(error.errorMessage);
      }
    } catch (error) {
      setError('Something went wrong!');
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

export default useRegister;
