import React from 'react';
import c from 'classnames';
import { RadioGroup } from '@headlessui/react';
import { Controller } from 'react-hook-form';

import Modal from './Modal';
import { Form } from './form';
import InputFormField from './InputFormField';
import Button from './Button';
import LabelsInput from './LabelsInput';

interface Props {
  isOpen: boolean;
  onClose: () => any;
}

export default function AddTaskModal({ isOpen, onClose }: Props) {
  return (
    <Modal title="Create New Task" isOpen={isOpen} onClose={onClose}>
      <Form
        model={{ priority: 'MD' }}
        onSubmit={() => {
        }} className="mt-8 space-y-6"
      >
        <InputFormField name="title" type="text" label="Task Title" placeholder="Cook food" required />

        <Controller
          name="priority"
          render={({ field: { value, onChange } }) => (
            <RadioGroup value={value} onChange={onChange} className="mt-2">
              <RadioGroup.Label className="block text-sm font-medium text-gray-700 mb-1">Priority</RadioGroup.Label>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                {[['HI', 'High'], ['MD', 'Medium'], ['LO', 'Low']].map(([key, val]) => (
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

        <LabelsInput />

        <div className="flex flex-row-reverse items-center space-x-4 space-x-reverse">
          <Button type="submit" className="w-full justify-center">Add Task</Button>
          <Button type="button" onClick={onClose} className="w-full justify-center" kind="secondary">Cancel</Button>
        </div>
      </Form>
    </Modal>
  );
}
