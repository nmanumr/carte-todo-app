import { PencilIcon, TrashIcon } from '@heroicons/react/outline';
import Axios from 'axios';
import { mutate } from 'swr';
import React from 'react';
import { LocalUserTask, Priority, RemoteUserTask } from '../@types/task';

export default function TaskListItem({ task, onEdit }: { task: RemoteUserTask, onEdit: (task: LocalUserTask) => any }) {
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
          Axios.delete(`/api/todo/${task.publicId}/`)
            .then(() => mutate('/api/todo'));
        }}
      >
        <TrashIcon className="w-5 h-5 text-red-700" />
      </button>
    </div>
  );
}
