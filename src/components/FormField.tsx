import React from 'react';
import { UseFormRegister, FieldValues, FieldErrors, RegisterOptions } from 'react-hook-form';

interface FormFieldProps {
  label: string;
  name: string;
  register: UseFormRegister<FieldValues>;
  required?: boolean;
  errors: FieldErrors;
  placeholder?: string;
  type?: string;
  validation?: RegisterOptions;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  register,
  required = false,
  errors,
  placeholder = '',
  type = 'text',
  validation = {}
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-neutral-700">
        {label} {required && <span className="text-error-500">*</span>}
      </label>
      <input
        id={name}
        type={type}
        {...register(name, {
          required: required ? "This field is required" : false,
          ...validation
        })}
        placeholder={placeholder}
        className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-neutral-800"
      />
      {errors[name] && (
        <p className="text-error-500 text-sm mt-1">{errors[name]?.message as string}</p>
      )}
    </div>
  );
};

export default FormField;