import React from 'react';
import { useFormContext } from 'react-hook-form';
import TextareaField from '../TextareaField';

const AdditionalNotes: React.FC = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <p className="text-neutral-600">
        Please provide any additional information that might be helpful for setting up your AI Voice Agent.
      </p>

      <TextareaField
        label="Is there anything else we should know?"
        name="additionalNotes"
        register={register}
        required
        errors={errors}
        rows={5}
        placeholder="Enter any additional information"
      />
    </div>
  );
};

export default AdditionalNotes;