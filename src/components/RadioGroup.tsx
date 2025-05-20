import React from 'react';
import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  label: string;
  name: string;
  options: RadioOption[];
  register: UseFormRegister<FieldValues>;
  required?: boolean;
  errors: FieldErrors;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  name,
  options,
  register,
  required = false,
  errors
}) => {
  return (
    <div className="space-y-2">
      <p className="block text-sm font-medium text-neutral-700">
        {label} {required && <span className="text-error-500">*</span>}
      </p>
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              id={`${name}-${option.value}`}
              type="radio"
              value={option.value}
              {...register(name, {
                required: required ? "This field is required" : false
              })}
              className="h-4 w-4 text-[#D602C6] border-neutral-300 focus:ring-[#D602C6] checked:bg-[#D602C6] accent-[#D602C6]"
            />
            <label htmlFor={`${name}-${option.value}`} className="ml-2 text-sm text-neutral-700">
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {errors[name] && (
        <p className="text-error-500 text-sm mt-1">{errors[name]?.message as string}</p>
      )}
    </div>
  );
};

export default RadioGroup;