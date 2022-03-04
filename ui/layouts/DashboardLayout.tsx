import React from 'react';
import Logo from '../components/Logo';
import ProfileDropDown from '../components/ProfileDropDown';

export default function DashboardLayout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="min-h-screen h-full flex flex-col">
      <div className="shrink-0 bg-green-900">
        <div className="max-w-6xl w-full mx-auto flex items-center">
          <Logo className="w-16 text-white p-4" />
          <div className="grow" />

          <ProfileDropDown />
        </div>
      </div>

      <main className="grow py-4 max-w-6xl w-full mx-auto">
        {children}
      </main>
    </div>
  );
}
