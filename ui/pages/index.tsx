import useSWR from 'swr';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Button from '../components/Button';
import { isAuthenticated } from '../providers/auth';
import TaskListItem from '../components/TaskListItem';
import DashboardLayout from '../layouts/DashboardLayout';
import EditCreateTaskModal from '../components/EditCreateTaskModal';
import { LocalUserTask, RemoteResponse, RemoteUserTask } from '../@types/task';

export default function HomePage() {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [selectedTask, setSelected] = useState<LocalUserTask>();
  const { data } = useSWR<RemoteResponse<RemoteUserTask>>('/api/todo/');
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace('/accounts/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
