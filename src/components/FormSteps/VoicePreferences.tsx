import React from 'react';
import { useFormContext } from 'react-hook-form';
import RadioGroup from '../RadioGroup';

const VoicePreferences: React.FC = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <p className="text-neutral-600">
        Please specify your preferences for the AI Assistant's voice.
      </p>

      <RadioGroup
        label="Do you have a voice preference for your AI Assistant?"
        name="voicePreference"
        register={register}
        required
        errors={errors}
        options={[
          { value: "Male", label: "Male" },
          { value: "Female", label: "Female" },
          { value: "No Preference", label: "No Preference" }
        ]}
      />
    </div>
  );
};

export default VoicePreferences;