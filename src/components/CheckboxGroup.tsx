import React from 'react';
import { useFormContext, UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';

interface CheckboxOption {
  value: string;
  label: string;
}

interface CheckboxGroupProps {
  label: string;
  name: string;
  options: CheckboxOption[];
  register: UseFormRegister<FieldValues>;
  required?: boolean;
  errors: FieldErrors;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  name,
  options,
  register,
  required = false,
  errors
}) => {
  const { setValue, watch } = useFormContext();
  const watchedValue = watch(name) || [];

  const handleCheck = (value: string) => {
    const currentValues = [...watchedValue];
    const index = currentValues.indexOf(value);
    
    if (index === -1) {
      currentValues.push(value);
    } else {
      currentValues.splice(index, 1);
    }
    
    setValue(name, currentValues, { shouldValidate: true });
  };

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
              type="checkbox"
              value={option.value}
              checked={watchedValue.includes(option.value)}
              onChange={() => handleCheck(option.value)}
              {...register(name, {
                required: required ? "This field is required" : false
              })}
              className="h-4 w-4 text-[#D602C6] border-neutral-300 rounded focus:ring-[#D602C6] checked:bg-[#D602C6] accent-[#D602C6]"
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

export default CheckboxGroup;