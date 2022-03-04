import React from 'react';
import Button from '../components/Button';
import DashboardLayout from '../layouts/DashboardLayout';

export default function HomePage() {
  return (
    <DashboardLayout>
      <div className="md:flex md:items-center mb-6 md:justify-between mt-6 sm:mt-12">
        <div className="flex-1 min-w-0">
          <h2 className="text-3xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Welcome to todo list!
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Button kind="primary" className="text-xs py-2.5 px-5">Create New Task</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
