import React from 'react';
import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';

interface TextareaFieldProps {
  label: string;
  name: string;
  register: UseFormRegister<FieldValues>;
  required?: boolean;
  errors: FieldErrors;
  placeholder?: string;
  rows?: number;
}

const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  name,
  register,
  required = false,
  errors,
  placeholder = '',
  rows = 4
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-neutral-700">
        {label} {required && <span className="text-error-500">*</span>}
      </label>
      <textarea
        id={name}
        {...register(name, {
          required: required ? "This field is required" : false
        })}
        rows={rows}
        placeholder={placeholder}
        className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D602C6] text-black"
      />
      {errors[name] && (
        <p className="text-error-500 text-sm mt-1">{errors[name]?.message as string}</p>
      )}
    </div>
  );
};

export default TextareaField;