import React from 'react';
import { useFormContext } from 'react-hook-form';
import FormField from '../FormField';
import RadioGroup from '../RadioGroup';

const Integrations: React.FC = () => {
  const { register, watch, formState: { errors } } = useFormContext();
  const needIntegration = watch('needIntegration');

  return (
    <div className="space-y-6">
      <p className="text-neutral-600">
        Tell us about your current systems and integration needs.
      </p>

      <FormField
        label="What software or systems does your business currently use?"
        name="currentSystems"
        register={register}
        required
        errors={errors}
        placeholder="e.g., Salesforce, HubSpot, Microsoft Dynamics"
      />

      <RadioGroup
        label="Do you need the AI Agent to integrate with these systems?"
        name="needIntegration"
        register={register}
        required
        errors={errors}
        options={[
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" }
        ]}
      />

      {needIntegration === 'Yes' && (
        <FormField
          label="Please specify which systems need integration"
          name="integrationsSpecify"
          register={register}
          required
          errors={errors}
          placeholder="List the systems that need integration"
        />
      )}
    </div>
  );
};

export default Integrations;