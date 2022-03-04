import { PropsWithChildren } from 'react';
import Logo from '../components/Logo';

export default function AuthLayout({ children }: PropsWithChildren<{}>) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Logo className="mx-auto w-20 text-green-900 mt-4 mb-10" />

          {children}
        </div>
      </div>
    </div>
  );
}
