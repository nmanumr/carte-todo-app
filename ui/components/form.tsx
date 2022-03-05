import React, { useEffect } from 'react';
import {
  useForm, FormProvider, useFormContext,
  Mode, UseFormReturn, FieldError,
  UseFormRegisterReturn,
} from 'react-hook-form';

interface FormProps {
  mode?: Mode;
  reValidateMode?: Exclude<Mode, 'onTouched' | 'all'>;
  criteriaMode?: 'firstError' | 'all',
  onSubmit: (e: Record<string, any>, form: UseFormReturn) => void;
  className?: string;
  model?: Record<string, any>;
}

export interface FormInputProps {
  name: string;
  label?: string;
  required?: boolean;
  type?: string;
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  onChange?: (e: { target: any, type?: any }, form: UseFormReturn) => void;
}

export interface FormInputFuncProps extends UseFormRegisterReturn {
  label: string;
  errors: FieldError;
}

export function Form({
  model, onSubmit, children, className,
  mode = 'onSubmit',
  criteriaMode = 'all',
  reValidateMode = 'onChange',
}: React.PropsWithChildren<FormProps>) {
  const form = useForm({
    mode, reValidateMode, defaultValues: model, criteriaMode,
  });

  useEffect(() => {
    if (model) {
      Object.entries(model).forEach(([k, v]) => {
        form.setValue(k, v);
      });
    } else {
      form.reset();
    }
  }, [form, model]);

  return (
    <FormProvider {...form}>
      {typeof children === 'function'
        ? children(form)
        : (
          <form
            className={className} noValidate
            onSubmit={form.handleSubmit((e) => onSubmit(e, form))}
          >
            {children}
          </form>
        )}
    </FormProvider>
  );
}

export function FormField({
  name, label, required, type, pattern,
  minLength, maxLength, children, onChange,
}: React.PropsWithChildren<FormInputProps>) {
  const form = useFormContext();

  // onBlur, onChange, name, ref
  const inputProps = form.register(name, {
    required: required ? `${label || name} field is required` : false,
    pattern: type === 'email' ? {
      value: /^([^\s@])+@(([^\s@.])+\.)+([^\s.]{2,})+$/i,
      message: 'Invalid email address',
    } : pattern,
    minLength: minLength ? {
      value: minLength,
      message: `${label || name} should be at least ${minLength} character long`,
    } : undefined,
    maxLength: maxLength ? {
      value: maxLength,
      message: `${label || name} should be less than ${maxLength} character long`,
    } : undefined,
  });

  if (onChange) {
    const inputOnChange = inputProps.onChange;

    inputProps.onChange = (e) => {
      onChange(e, form);
      return inputOnChange(e);
    };
  }

  if (typeof children === 'function') {
    return children({
      ...inputProps,
      type,
      label,
      errors: form.formState.errors[name],
    });
  }

  return children;
}
