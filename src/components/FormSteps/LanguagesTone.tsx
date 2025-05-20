import React from 'react';
import { useFormContext } from 'react-hook-form';
import RadioGroup from '../RadioGroup';
import FormField from '../FormField';

const LanguagesTone: React.FC = () => {
  const { register, watch, formState: { errors } } = useFormContext();
  const languages = watch('languages');
  const agentTone = watch('agentTone');

  return (
    <div className="space-y-6">
      <p className="text-neutral-600">
        Specify language and tone preferences for your AI agent.
      </p>

      <RadioGroup
        label="Which language(s) do you need?"
        name="languages"
        register={register}
        required
        errors={errors}
        options={[
          { value: "English only", label: "English only" },
          { value: "Spanish only", label: "Spanish only" },
          { value: "English + Spanish", label: "English + Spanish" },
          { value: "Other", label: "Other" }
        ]}
      />

      {languages === 'Other' && (
        <FormField
          label="Please specify required languages"
          name="otherLanguages"
          register={register}
          required
          errors={errors}
          placeholder="List required languages"
        />
      )}

      <RadioGroup
        label="What tone should the voice agent use?"
        name="agentTone"
        register={register}
        required
        errors={errors}
        options={[
          { value: "Friendly and casual", label: "Friendly and casual" },
          { value: "Professional and formal", label: "Professional and formal" },
          { value: "Empathetic and supportive", label: "Empathetic and supportive" },
          { value: "Neutral", label: "Neutral" },
          { value: "Other", label: "Other" }
        ]}
      />

      {agentTone === 'Other' && (
        <FormField
          label="Please specify preferred tone"
          name="otherTone"
          register={register}
          required
          errors={errors}
          placeholder="Describe preferred tone"
        />
      )}

      <RadioGroup
        label="Do you want the AI to sound..."
        name="aiVoicePreference"
        register={register}
        required
        errors={errors}
        options={[
          { value: "As human as possible", label: "As human as possible" },
          { value: "Slightly robotic/formal", label: "Slightly robotic/formal" },
          { value: "Doesn't matter as long as it performs well", label: "Doesn't matter as long as it performs well" }
        ]}
      />
    </div>
  );
};

export default LanguagesTone;