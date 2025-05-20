import React from 'react';
import { useFormContext } from 'react-hook-form';
import RadioGroup from '../RadioGroup';

const TechnicalSettings: React.FC = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <p className="text-neutral-600">
        Configure the technical aspects of your AI Voice Agent.
      </p>

      <RadioGroup
        label="Call Recording: Enable call recordings for playback/reporting?"
        name="callRecording"
        register={register}
        required
        errors={errors}
        options={[
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" }
        ]}
      />

      <RadioGroup
        label="Enable Transcripts: Save the timeline of your calls?"
        name="enableTranscripts"
        register={register}
        required
        errors={errors}
        options={[
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" }
        ]}
      />
    </div>
  );
};

export default TechnicalSettings;