import React from 'react';
import { useFormContext } from 'react-hook-form';
import FormField from '../FormField';

const AgentDetails: React.FC = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <p className="text-neutral-600">
        Let's set up the basic details for your AI Voice Agent.
      </p>

      <FormField
        label="What name will your AI Agent go by?"
        name="agentName"
        register={register}
        required
        errors={errors}
        placeholder="e.g., Alex, Morgan, Taylor"
      />

      <FormField
        label="What timezone should your AI be in?"
        name="timezone"
        register={register}
        required
        errors={errors}
        placeholder="e.g., EST, PST, GMT+1"
      />

      <FormField
        label="Main purpose for the AI Voice Agent"
        name="mainPurpose"
        register={register}
        required
        errors={errors}
        placeholder="e.g., Customer Service, Sales, Appointment Scheduling"
      />
    </div>
  );
};

export default AgentDetails;