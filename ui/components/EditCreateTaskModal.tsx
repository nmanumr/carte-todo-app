import React, { useState } from 'react';
import Axios from 'axios';
import c from 'classnames';
import { RadioGroup } from '@headlessui/react';
import { Controller } from 'react-hook-form';
import { mutate } from 'swr';

import Modal from './Modal';
import { Form } from './form';
import InputFormField from './InputFormField';
import Button from './Button';
import LabelsInput from './LabelsInput';
import ErrorMessage from './ErrorMessage';
import { LocalUserTask } from '../@types/task';

interface Props {
  selected?: LocalUserTask;
  isOpen: boolean;
  onClose: () => any;
}

export default function EditCreateTaskModal({ isOpen, onClose, selected }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = (val: Record<string, any>) => {
    setError('');
    setLoading(true);

    let req;
    if (selected) {
      req = Axios.put(`/api/todo/${selected.publicId}/`, val);
    } else {
      req = Axios.post('/api/todo/', val);
    }

    req
      .then(() => {
        mutate('/api/todo/');
        onClose();
      })
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  };

  const formDefaults: Record<string, any> = selected || { priority: 'MD' };

  return (
    <Modal title={selected ? 'Update Task' : 'Create New Task'} isOpen={isOpen} onClose={onClose}>
      <Form model={formDefaults} onSubmit={onSubmit} className="mt-8 space-y-6">
        {error && <ErrorMessage error={error} />}

        <InputFormField name="title" type="text" label="Task Title" placeholder="Cook food" required />

        <Controller
          name="priority"
          render={({ field: { value, onChange } }) => (
            <RadioGroup value={value} onChange={onChange} className="mt-2">
              <RadioGroup.Label className="block text-sm font-medium text-gray-700 mb-1">Priority</RadioGroup.Label>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                {[['LO', 'Low'], ['MD', 'Medium'], ['HI', 'High']].map(([key, val]) => (
                  <RadioGroup.Option
                    key={key}
                    value={key}
                    className={({ active, checked }) => c(
                      active ? 'ring-2 ring-offset-2 ring-green-700' : '',
                      checked
                        ? 'bg-green-800 border-transparent text-white hover:bg-green-700'
                        : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50',
                      'cursor-pointer focus:outline-none border shadow-sm rounded-md py-2 px-3 flex items-center justify-center text-xs font-medium uppercase sm:flex-1',
                    )}
                  >
                    <RadioGroup.Label as="p">{val}</RadioGroup.Label>
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          )}
        />

        <Controller
          name="labels"
          render={({ field: { value, onChange } }) => (
            <LabelsInput labels={value} onChange={onChange} />
          )}
        />

        <div className="flex flex-row-reverse items-center space-x-4 space-x-reverse">
          <Button type="submit" loading={loading} className="w-full justify-center">
            {selected ? 'Update Task' : 'Add Task'}
          </Button>
          <Button type="button" onClick={onClose} className="w-full justify-center" kind="secondary">Cancel</Button>
        </div>
      </Form>
    </Modal>
  );
}
