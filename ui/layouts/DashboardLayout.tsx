import React from 'react';
import Logo from '../components/Logo';
import ProfileDropDown from '../components/ProfileDropDown';

export default function DashboardLayout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="min-h-screen h-full flex flex-col">
      <div className="shrink-0 bg-green-900">
        <div className="max-w-6xl w-full mx-auto flex items-center px-4 sm:px-6 lg:px-8 py-4">
          <Logo className="w-8 text-white h-auto" />
          <div className="grow" />

          <ProfileDropDown />
        </div>
      </div>

      <main className="grow max-w-6xl w-full mx-auto py-8 px-4 sm:px-4 lg:px-8">
        {children}
      </main>
    </div>
  );
}
