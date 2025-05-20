import React from 'react';
import { useFormContext } from 'react-hook-form';
import FormField from '../FormField';

const ClientInformation: React.FC = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <p className="text-neutral-600">
        Please provide your business information below.
      </p>

      <FormField
        label="Client Business Name"
        name="businessName"
        register={register}
        required
        errors={errors}
        placeholder="Enter your business name"
      />

      <FormField
        label="Website"
        name="website"
        register={register}
        required
        errors={errors}
        placeholder="https://example.com"
      />

      <FormField
        label="Date"
        name="date"
        register={register}
        required
        errors={errors}
        type="date"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Point of Contact Name"
          name="contactName"
          register={register}
          required
          errors={errors}
          placeholder="Enter contact name"
        />

        <FormField
          label="Email"
          name="email"
          register={register}
          required
          errors={errors}
          type="email"
          placeholder="email@example.com"
          validation={{
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          }}
        />

        <FormField
          label="Phone"
          name="phone"
          register={register}
          required
          errors={errors}
          placeholder="(123) 456-7890"
        />
      </div>
    </div>
  );
};

export default ClientInformation;