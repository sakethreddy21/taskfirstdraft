'use client';

import { useRouter } from 'next/navigation';
import {  useState } from 'react';
import { z } from 'zod';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import useRegister from '@/hooks/useRegister';



const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

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

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
  });



 

//create onSubm,it function using fetchapi for this api 'api/register'
const { onSubmit, loading, error } = useRegister();

  return (
    <div className="w-full place-items-center bg-gradient-to-b from-white to-[#AFA3FF] h-screen">
      <div className="flex items-center justify-center h-full">
        <Card className="w-[648px] h-[556px] justify-center bg-white outline-none border-none p-[60px] rounded-2xl ring-1 ring-white/10 shadow-xl">
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
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl className="focus-within:border-1">
                          <div className="flex bg-[#EBEBEB] justify-start items-center rounded-lg">
                            <input
                              type="text"
                              placeholder="Username"
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
                      <FormItem>
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
                  {loading ? 'Registering...' : 'Register'}
                </Button>
                {error && <div className="text-red-600 text-center mt-4">{error}</div>}
                <div className="pt-[32px] text-black text-[20px] flex flex-row">
                  <p>
                    Already have an account? <span className="mr-1 text-[#0054A1]"><Link href='/login'>Login in</Link></span>
                  </p>
                </div>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
