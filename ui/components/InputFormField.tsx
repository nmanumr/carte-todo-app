import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';

import useId from '../hooks/use_id';
import { FormField, FormInputFuncProps, FormInputProps } from './form';

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
type Props = InputProps & FormInputProps;

export default function InputFormField({
  name, label, required, type, pattern,
  minLength, maxLength, children, onChange, ...props
}: Props) {
  const id = useId();

  return (
    <FormField
      {...{
        name, label, required, type, pattern, minLength, maxLength, children, onChange,
      }}
    >
      {({ errors, label: labelText, ...restProps }: FormInputFuncProps) => (
        <div>
          <label htmlFor={id} className="block text-sm font-medium text-gray-700">{labelText}</label>
          <input
            id={id} {...restProps} {...props}
            className="appearance-none shadow-sm block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 sm:text-sm focus:z-10 focus:outline-none focus:border-green-700 focus:ring-green-700"
          />
          {errors && <p className="text-xs mt-1.5 text-red-600">{errors.message}</p>}
        </div>
      )}
    </FormField>
  );
}
