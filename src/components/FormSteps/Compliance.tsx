import React from 'react';
import { useFormContext } from 'react-hook-form';
import FormField from '../FormField';
import TextareaField from '../TextareaField';

const Compliance: React.FC = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <p className="text-neutral-600">
        Define compliance and security requirements for your AI Agent.
      </p>

      <FormField
        label="Are there any specific compliance or privacy regulations the agent must adhere to?"
        name="complianceRegulations"
        register={register}
        required
        errors={errors}
        placeholder="e.g., GDPR, HIPAA, CCPA"
      />

      <TextareaField
        label="What security measures are required for customer data handling?"
        name="securityMeasures"
        register={register}
        required
        errors={errors}
        rows={3}
        placeholder="Describe security requirements"
      />
    </div>
  );
};

export default Compliance;