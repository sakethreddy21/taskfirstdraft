'use client';

import { appActions } from '@/app/store/app-slice';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { ShieldAlert } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import useDebounce from '@/hooks/useDebounce';
import { Button } from '@/components/ui/button';
import { IStoreState } from '../store/store';
import Link from 'next/link';
import useLogin from '@/hooks/useLogin';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoggedIn = useSelector((state: IStoreState) => state.app.isLoggedIn);
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

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });

  const debouncedEmail = useDebounce(form.watch('usermail'), 100);

  useEffect(() => {
    if (debouncedEmail) {
      if (
        !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          debouncedEmail
        )
      ) {
        form.setError('usermail', {
          type: 'manual',
          message: 'Please enter a valid email address',
        });
        return;
      }
    } else {
      form.clearErrors('usermail');
    }
  }, [debouncedEmail, form]);

  useEffect(() => {
    form.clearErrors('root');
  }, [form.watch('password')]);

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  const { onSubmit, loading, error } = useLogin();
  return (
    <div className="w-full place-items-center bg-gradient-to-b from-white to-[#AFA3FF] h-screen">
      <div className="flex items-center justify-center h-full">
        <Card className="w-[648px] h-[476px] justify-center bg-white outline-none border-none p-[60px] rounded-2xl ring-1 ring-white/10 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="font-semibold text-black text-xl w-full text-[48px]">
              Welcome to
              <span className='text-[#4B36CC]'> Workflo!</span>
            </CardTitle>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="px-10 pt-[30px]">
                <div className="w-full flex flex-col gap-y-[12px]">
                  <FormField
                    control={form.control}
                    name="usermail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#89929B] text-xs sr-only">
                          Email Address
                        </FormLabel>
                        <FormControl className="focus-within:border-1">
                          <div className="flex bg-[#EBEBEB] justify-start items-center rounded-lg">
                            <input
                              type="email"
                              placeholder="Your Email"
                              {...field}
                              className='bg-[#EBEBEB] w-full h-[46px] border-none px-4 text-black'
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-600 font-inter font-normal text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="flex items-center">
                          <Label htmlFor="password" className="sr-only">
                            Password
                          </Label>
                        </FormLabel>
                        <FormControl className="bg-[#EBEBEB] focus-within:border-1">
                          <div className="flex bg-[#EBEBEB] justify-start items-center rounded-lg">
                            <input
                              type={showPassword ? 'text' : 'password'}
                              placeholder="Password"
                              {...field}
                              className='bg-[#EBEBEB] w-full h-[46px] border-none px-4 focus:border-none text-black'
                            />
                            <Image
                              src={
                                showPassword
                                  ? '/shared/password-hide-icon.svg'
                                  : '/shared/password-show-icon.svg'
                              }
                              width={120}
                              height={120}
                              alt="Password Visibility Icon"
                              className="w-5 h-5"
                              onClick={() => setShowPassword(!showPassword)}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-600 font-inter font-normal text-xs" />
                      </FormItem>
                    )}
                  />
                  {form.formState.errors.root?.message && (
                    <FormMessage className="text-red-600 font-inter font-normal text-xs w-full text-center">
                      <ShieldAlert className="w-4 h-4 inline-block text-red-500" />
                      {form.formState.errors.root?.message}
                    </FormMessage>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col justify-center px-10">
                <Button
                  size={'lg'}
                  variant={!form.formState.isValid ? 'disabled' : 'confirm'}
                  type="submit"
                  className="custom-gradient font-normal text-white text-[20px] w-full "
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
                {error && <div className="text-red-600 text-center mt-4">{error}</div>}
                <div className="pt-[32px] text-black text-[20px] flex flex-row">
                  <p>
                    Don’t have an account? Create <span className="mr-1">a</span>
                  </p>
                  <p className='text-[#0054A1]'><Link href='/register'>new account</Link></p>
                </div>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
