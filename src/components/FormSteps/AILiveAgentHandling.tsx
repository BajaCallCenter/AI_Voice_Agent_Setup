import React from 'react';
import { useFormContext } from 'react-hook-form';
import RadioGroup from '../RadioGroup';
import CheckboxGroup from '../CheckboxGroup';
import FormField from '../FormField';

const AILiveAgentHandling: React.FC = () => {
  const { register, watch, formState: { errors } } = useFormContext();
  const aiLiveAgentMix = watch('aiLiveAgentMix');
  const selectedLiveAgentCalls = watch('liveAgentCalls') || [];
  const liveAgentProvider = watch('liveAgentProvider');

  return (
    <div className="space-y-6">
      <p className="text-neutral-600">
        Define how you want to balance AI and live agent interactions.
      </p>

      <RadioGroup
        label="How would you like to use AI and live agents?"
        name="aiLiveAgentMix"
        register={register}
        required
        errors={errors}
        options={[
          { value: "AI handles all calls first, escalates as needed", label: "AI handles all calls first, escalates as needed" },
          { value: "AI handles simple calls only, live agents handle complex ones", label: "AI handles simple calls only, live agents handle complex ones" },
          { value: "Live agents answer all calls", label: "Live agents answer all calls" },
          { value: "Other", label: "Other" }
        ]}
      />

      {aiLiveAgentMix === 'Other' && (
        <FormField
          label="Please specify your preferred AI/Live agent mix"
          name="otherAiLiveAgentMix"
          register={register}
          required
          errors={errors}
          placeholder="Describe your preferred setup"
        />
      )}

      <CheckboxGroup
        label="What calls should always be handled by a live agent?"
        name="liveAgentCalls"
        register={register}
        required
        errors={errors}
        options={[
          { value: "Billing/payment issues", label: "Billing/payment issues" },
          { value: "Mental health or sensitive issues", label: "Mental health or sensitive issues" },
          { value: "Technical problems", label: "Technical problems" },
          { value: "Legal or compliance inquiries", label: "Legal or compliance inquiries" },
          { value: "None - AI can attempt first", label: "None - AI can attempt first" },
          { value: "Other", label: "Other" }
        ]}
      />

      {selectedLiveAgentCalls.includes('Other') && (
        <FormField
          label="Please specify other types of calls for live agents"
          name="otherLiveAgentCalls"
          register={register}
          required
          errors={errors}
          placeholder="Enter other call types for live agents"
        />
      )}

      <RadioGroup
        label="If a live agent is required during the call, how would you like us to handle it?"
        name="liveAgentProvider"
        register={register}
        required
        errors={errors}
        options={[
          { value: "voicemedia", label: "Voicemedia should provide the live agents" },
          { value: "internal", label: "Your company will provide the live agents and we should transfer to your internal team" },
          { value: "depends", label: "It depends on the call type" },
          { value: "other", label: "Other" }
        ]}
      />

      {liveAgentProvider === 'other' && (
        <FormField
          label="Please specify your preferred live agent handling"
          name="otherLiveAgentProvider"
          register={register}
          required
          errors={errors}
          placeholder="Describe how you would like live agent handling to work"
        />
      )}
    </div>
  );
};

export default AILiveAgentHandling;