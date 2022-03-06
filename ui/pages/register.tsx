import Axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { UseFormReturn } from 'react-hook-form';

import LinkTo from '../components/LinkTo';
import AuthLayout from '../layouts/AuthLayout';
import ErrorMessage from '../components/ErrorMessage';
import { isAuthenticated, setToken } from '../providers/auth';
import { Form } from '../components/form';
import Button from '../components/Button';
import InputFormField from '../components/InputFormField';

export default function Register() {
  const [apiError, setApiError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (isAuthenticated()) {
    router.push('/');
  }

  const onSubmit = async (value: Record<string, any>, form: UseFormReturn) => {
    setApiError('');

    if (value.password !== value.password2) {
      form.setError('password2', { message: "Password doesn't match" });
      return;
    }

    setLoading(true);
    const {
      password, name, email, username,
    } = value;

    Axios.post('/api/user/create/', {
      password, name, email, username,
    })
      .then((response) => {
        setToken(response.data.accessToken);
        router.push('/');
      })
      .catch((e) => {
        setApiError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <AuthLayout>
      <Form onSubmit={onSubmit} className="space-y-4">

        <InputFormField name="username" type="text" label="Username" autoComplete="username" required />
        <InputFormField name="email" type="email" label="Email" autoComplete="email" required />
        <InputFormField name="password" type="password" label="Password" autoComplete="new-password" required />
        <InputFormField name="password2" type="password" label="Confirm Password" autoComplete="new-password" required />

        {apiError && <ErrorMessage error={apiError} />}

        <div className="flex items-center text-sm space-x-1">
          <span>Already have account?</span>
          <LinkTo href="/login" className="font-medium text-green-700 hover:text-green-800">
            Goto Login
          </LinkTo>
        </div>

        <div className="pt-2">
          <Button className="w-full" loading={loading} type="submit">Sign up</Button>
        </div>
      </Form>
    </AuthLayout>
  );
}
