import { useMutation, DefaultError } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  login,
  LoginVariables,
  LoginData,
} from '@/api/auth';
import EmailField from '@/components/EmailField';
import FormRootError from '@/components/FormRootError';
import PasswordField from '@/components/PasswordField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import useAuthStore from '@/store/auth';

const Login = () => {
  const navigate = useNavigate();
  const authStore = useAuthStore.getState();

  const form = useForm<LoginVariables>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const mutation = useMutation<LoginData, DefaultError, LoginVariables>({
    mutationFn: login,
    onSuccess: ({ token }) => {
      authStore.login({ token });
      navigate('/dashboard');
    },
    onError: (error) => {
      form.setError('root', {
        message: error.message,
      });
    },
  });

  const onSubmit = (data: LoginVariables) => {
    mutation.mutate(data);
  };

  return (
    <div className="page py-20">
      <div className="max-w-md mx-auto">
        <div className="text-3xl font-semibold mb-10">
          Sign in
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="form-layout">
              <EmailField
                name="username"
                label="Email"
                rules={{
                  required: true,
                }}
              />
              <PasswordField
                name="password"
                label="Password"
                rules={{
                  required: true,
                }}
              />
              <FormRootError />
              <Button type="submit">
                Login
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
