import useSWR, { mutate } from 'swr';
import Axios from 'axios';
import React, { useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/outline';

import {
  LocalUserTask, Priority, RemoteResponse, RemoteUserTask,
} from '../@types/task';
import Button from '../components/Button';
import EditCreateTaskModal from '../components/EditCreateTaskModal';
import DashboardLayout from '../layouts/DashboardLayout';

function TaskListItem({ task, onEdit }: { task: RemoteUserTask, onEdit: (task: LocalUserTask) => any }) {
  return (
    <div key={task.publicId} className="rounded-md bg-white shadow flex items-center py-3 px-6 space-x-4">
      <div className="grow">
        <div className="w-full overflow-hidden text-ellipses">{task.title}</div>
        <div className="flex flex-wrap text-sm">
          {task.labels.map((l) => (
            <div
              key={l.publicId}
              className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-200 text-gray-800 mt-2 mr-2 shrink-0"
            >
              {l.title}
            </div>
          ))}
        </div>
      </div>
      <div className="text-sm mr-6">
        {/* @ts-ignore */}
        {Priority[task.priority]}
      </div>
      <button
        type="button" className="p-1"
        onClick={() => {
          const labels = task.labels.map((l) => l.title);
          onEdit({ ...task, labels });
        }}
      >
        <PencilIcon className="w-5 h-5 text-green-700" />
      </button>
      <button
        type="button" className="p-1"
        onClick={() => {
          Axios.delete(`/api/todo/${task.publicId}`)
            .then(() => mutate('/api/todo'));
        }}
      >
        <TrashIcon className="w-5 h-5 text-red-700" />
      </button>
    </div>
  );
}

export default function HomePage() {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [selectedTask, setSelected] = useState<LocalUserTask>();
  const { data } = useSWR<RemoteResponse<RemoteUserTask>>('/api/todo');

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
        {data?.results?.map((task) => (
          <TaskListItem
            key={task.publicId}
            task={task}
            onEdit={(t: LocalUserTask) => {
              setSelected(t);
              setAddModalOpen(true);
            }}
          />
        ))}
      </div>

      <EditCreateTaskModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setAddModalOpen(false);
          setTimeout(() => {
            setSelected(undefined);
          }, 300);
        }}
        selected={selectedTask}
      />
    </DashboardLayout>
  );
}
