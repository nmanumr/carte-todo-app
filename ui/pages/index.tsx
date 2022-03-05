import React, { useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/outline';
import Button from '../components/Button';
import DashboardLayout from '../layouts/DashboardLayout';
import AddTaskModal from '../components/AddTaskModal';

export default function HomePage() {
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="md:flex md:items-center mb-6 md:justify-between mt-6 sm:mt-12">
        <div className="flex-1 min-w-0">
          <h2 className="text-3xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Welcome to todo list!
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Button kind="primary" className="text-xs py-2.5 px-5" onClick={() => setAddModalOpen(true)}>
            Create New Task
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-md bg-white shadow flex items-center py-3 px-6 space-x-4">
          <div className="grow">
            <div className="w-full overflow-hidden text-ellipses">Set out garbage</div>
            <div className="flex text-sm space-x-2 mt-2">
              <div className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-200 text-gray-800">Cleaning</div>
              <div className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-200 text-gray-800">
                Room Maintenance
              </div>
            </div>
          </div>
          <div className="text-sm mr-6">
            High
          </div>
          <button type="button" className="p-1">
            <PencilIcon className="w-5 h-5 text-green-700" />
          </button>
          <button type="button" className="p-1">
            <TrashIcon className="w-5 h-5 text-red-700" />
          </button>
        </div>

        <div className="rounded-md bg-white shadow flex items-center py-3 px-6 space-x-4">
          <div className="grow">
            <div className="w-full overflow-hidden text-ellipses">Set out garbage</div>
            <div className="flex text-sm space-x-2 mt-2">
              <div className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-200 text-gray-800">Cleaning</div>
              <div className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-200 text-gray-800">
                Room Maintenance
              </div>
            </div>
          </div>
          <div className="text-sm mr-6">
            High
          </div>
          <button type="button" className="p-1">
            <PencilIcon className="w-5 h-5 text-green-700" />
          </button>
          <button type="button" className="p-1">
            <TrashIcon className="w-5 h-5 text-red-700" />
          </button>
        </div>
      </div>

      <AddTaskModal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} />
    </DashboardLayout>
  );
}
