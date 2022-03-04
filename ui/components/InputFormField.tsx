import React from 'react';
import { FormField, FormInputFuncProps, FormInputProps } from './form';
import useId from '../hooks/use_id';

interface Props extends FormInputProps {
  autoComplete?: string;
}

export default function InputFormField({ autoComplete, ...props }: Props) {
  const id = useId();

  return (
    <FormField {...props}>
      {({ errors, label, ...restProps }: FormInputFuncProps) => (
        <div>
          <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
          <input
            id={id} autoComplete={autoComplete} {...restProps}
            className="appearance-none shadow-sm block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 sm:text-sm focus:z-10 focus:outline-none focus:border-green-600 focus:ring-green-600"
          />
          {errors && <p className="text-xs mt-1.5 text-red-600">{errors.message}</p>}
        </div>
      )}
    </FormField>
  );
}
