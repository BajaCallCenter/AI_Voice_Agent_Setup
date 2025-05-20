import React from 'react';
import { useFormContext } from 'react-hook-form';
import FormField from '../FormField';

const ContactInformation: React.FC = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <p className="text-neutral-600">
        Please provide your company's contact information below.
      </p>

      <FormField
        label="Company Name"
        name="companyName"
        register={register}
        required
        errors={errors}
        placeholder="Enter your company name"
      />

      <FormField
        label="Primary Contact Name"
        name="primaryContactName"
        register={register}
        required
        errors={errors}
        placeholder="Enter primary contact name"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Contact Email"
          name="contactEmail"
          register={register}
          required
          errors={errors}
          placeholder="email@example.com"
          type="email"
          validation={{
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          }}
        />

        <FormField
          label="Contact Phone Number"
          name="contactPhone"
          register={register}
          required
          errors={errors}
          placeholder="(123) 456-7890"
        />
      </div>

      <FormField
        label="Business Website"
        name="businessWebsite"
        register={register}
        required
        errors={errors}
        placeholder="https://example.com"
      />

      <FormField
        label="Industry/Type of Business"
        name="industryType"
        register={register}
        required
        errors={errors}
        placeholder="e.g., Retail, Healthcare, Education"
      />
    </div>
  );
};

export default ContactInformation;