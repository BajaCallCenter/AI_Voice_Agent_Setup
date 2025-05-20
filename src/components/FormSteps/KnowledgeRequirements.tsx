import React from 'react';
import { useFormContext } from 'react-hook-form';
import RadioGroup from '../RadioGroup';

const KnowledgeRequirements: React.FC = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <p className="text-neutral-600">
        Tell us about your knowledge base and system requirements.
      </p>

      <RadioGroup
        label="Will the agents need access to internal systems?"
        name="systemAccess"
        register={register}
        required
        errors={errors}
        options={[
          { value: "Yes, via web portal", label: "Yes, via web portal" },
          { value: "Yes, via API", label: "Yes, via API" },
          { value: "No system access required", label: "No system access required" },
          { value: "Not sure yet", label: "Not sure yet" }
        ]}
      />

      <RadioGroup
        label="Do you have a help center or knowledge base we can use?"
        name="knowledgeBase"
        register={register}
        required
        errors={errors}
        options={[
          { value: "Yes, publicly available", label: "Yes, publicly available" },
          { value: "Yes, internal only", label: "Yes, internal only" },
          { value: "No, but we can provide one", label: "No, but we can provide one" },
          { value: "No", label: "No" }
        ]}
      />

      <RadioGroup
        label="Can we use your website for general FAQs?"
        name="websiteFAQ"
        register={register}
        required
        errors={errors}
        options={[
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
          { value: "Let me check", label: "Let me check" }
        ]}
      />
    </div>
  );
};

export default KnowledgeRequirements;