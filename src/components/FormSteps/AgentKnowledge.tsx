import React from 'react';
import { useFormContext } from 'react-hook-form';
import FormField from '../FormField';
import CheckboxGroup from '../CheckboxGroup';
import RadioGroup from '../RadioGroup';
import TextareaField from '../TextareaField';

const AgentKnowledge: React.FC = () => {
  const { register, watch, formState: { errors } } = useFormContext();
  const relevantFAQs = watch('relevantFAQs');

  return (
    <div className="space-y-6">
      <p className="text-neutral-600">
        Provide details about what your AI Agent needs to know.
      </p>

      <RadioGroup
        label="Are there any relevant FAQs, brochures, presentations, or restriction guidelines the AI should have for context?"
        name="relevantFAQs"
        register={register}
        required
        errors={errors}
        options={[
          { value: "Yes", label: "Yes (please provide a copy)" },
          { value: "No", label: "No" }
        ]}
      />

      <TextareaField
        label="Please list the key products, services, or information the AI Agent should be familiar with"
        name="keyProducts"
        register={register}
        required
        errors={errors}
        rows={3}
        placeholder="Enter key products, services or information"
      />

      <CheckboxGroup
        label="What type of calls does the AI need to handle?"
        name="callTypes"
        register={register}
        required
        errors={errors}
        options={[
          { value: "Inbound", label: "Inbound" },
          { value: "Outbound", label: "Outbound" },
          { value: "Both", label: "Both" }
        ]}
      />

      <TextareaField
        label="Will your AI need to perform actions before, during, or after calls?"
        name="aiActions"
        register={register}
        required
        errors={errors}
        rows={3}
        placeholder="Please specify the actions"
      />

      <TextareaField
        label="What are the most common questions or issues your customers face?"
        name="commonQuestions"
        register={register}
        required
        errors={errors}
        rows={3}
        placeholder="List common questions or issues"
      />

      <TextareaField
        label="Are there any phrases, terms, or jargon the AI Agent should avoid?"
        name="avoidTerms"
        register={register}
        required
        errors={errors}
        rows={3}
        placeholder="List phrases, terms or jargon to avoid"
      />

      <TextareaField
        label="Opening Script"
        name="openingScript"
        register={register}
        errors={errors}
        rows={2}
        placeholder="Enter preferred opening script"
      />

      <TextareaField
        label="Closing Script"
        name="closingScript"
        register={register}
        errors={errors}
        rows={2}
        placeholder="Enter preferred closing script"
      />
    </div>
  );
};

export default AgentKnowledge;