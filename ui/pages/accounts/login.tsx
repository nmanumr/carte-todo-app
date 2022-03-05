import Axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';

import LinkTo from '../../components/LinkTo';
import Button from '../../components/Button';
import AuthLayout from '../../layouts/AuthLayout';
import ErrorMessage from '../../components/ErrorMessage';
import { isAuthenticated, setToken } from '../../providers/auth';
import { Form } from '../../components/form';
import InputFormField from '../../components/InputFormField';

export default function Login() {
  const [apiError, setApiError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (isAuthenticated()) {
    router.push('/');
  }

  const onSubmit = async (value: Record<string, any>) => {
    setApiError('');
    setLoading(true);

    Axios.post('/api/user/authenticate/', value)
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
        <InputFormField name="password" type="password" label="Password" autoComplete="current-password" required />

        <div className="flex items-center">
          <div className="text-sm">
            Don&apos;t have account?
            {' '}
            <LinkTo href="/accounts/register" className="font-medium text-green-700 hover:text-green-800">
              Goto Register
            </LinkTo>
          </div>
        </div>

        {apiError && <ErrorMessage error={apiError} />}

        <div className="pt-2">
          <Button className="w-full" type="submit" loading={loading}>Sign In</Button>
        </div>
      </Form>
    </AuthLayout>
  );
}
