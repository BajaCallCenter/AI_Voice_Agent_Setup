import React from 'react';
import { useFormContext } from 'react-hook-form';
import RadioGroup from '../RadioGroup';
import FormField from '../FormField';

const CallFlowEscalation: React.FC = () => {
  const { register, watch, formState: { errors } } = useFormContext();
  const escalationAction = watch('escalationAction');

  return (
    <div className="space-y-6">
      <p className="text-neutral-600">
        Define how calls should be handled when escalation is needed.
      </p>

      <RadioGroup
        label="If AI can't resolve the issue, what should happen?"
        name="escalationAction"
        register={register}
        required
        errors={errors}
        options={[
          { value: "Transfer to live agent", label: "Transfer to live agent" },
          { value: "Offer callback", label: "Offer callback" },
          { value: "Send a support ticket/email", label: "Send a support ticket/email" },
          { value: "Route to voicemail", label: "Route to voicemail" },
          { value: "Other", label: "Other" }
        ]}
      />

      {escalationAction === 'Other' && (
        <FormField
          label="Please specify escalation action"
          name="otherEscalationAction"
          register={register}
          required
          errors={errors}
          placeholder="Describe the escalation process"
        />
      )}

      <RadioGroup
        label="Do certain calls need to go to specific teams or departments?"
        name="specificTeams"
        register={register}
        required
        errors={errors}
        options={[
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
          { value: "Not sure yet", label: "Not sure yet" }
        ]}
      />
    </div>
  );
};

export default CallFlowEscalation;