import React from 'react';
import { useFormContext } from 'react-hook-form';
import FormField from '../FormField';

const CallVolume: React.FC = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <p className="text-neutral-600">
        Please provide information about your expected call patterns.
      </p>

      <FormField
        label="What is the expected call volume per day/week?"
        name="expectedCallVolume"
        register={register}
        required
        errors={errors}
        placeholder="e.g., 50 calls per day, 200-300 calls per week"
      />

      <FormField
        label="Average call duration (if known)"
        name="averageCallDuration"
        register={register}
        errors={errors}
        placeholder="e.g., 5 minutes, 8-10 minutes"
      />

      <FormField
        label="Do you have a preferred voice tone for the AI Agent?"
        name="preferredVoiceTone"
        register={register}
        required
        errors={errors}
        placeholder="e.g., Professional, Friendly, Empathetic"
      />
    </div>
  );
};

export default CallVolume;