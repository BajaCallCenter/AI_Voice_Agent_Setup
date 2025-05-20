import React from 'react';
import { useFormContext } from 'react-hook-form';
import RadioGroup from '../RadioGroup';
import FormField from '../FormField';

const TimelineLaunch: React.FC = () => {
  const { register, watch, formState: { errors } } = useFormContext();
  const currentProvider = watch('currentProvider');
  const switchReason = watch('switchReason');

  return (
    <div className="space-y-6">
      <p className="text-neutral-600">
        Help us understand your timeline and current situation.
      </p>

      <RadioGroup
        label="When would you like to launch?"
        name="launchTimeline"
        register={register}
        required
        errors={errors}
        options={[
          { value: "ASAP (1-2 weeks)", label: "ASAP (1-2 weeks)" },
          { value: "Within a month", label: "Within a month" },
          { value: "1-3 months", label: "1-3 months" },
          { value: "No set date yet", label: "No set date yet" }
        ]}
      />

      <RadioGroup
        label="Are you currently working with another provider?"
        name="currentProvider"
        register={register}
        required
        errors={errors}
        options={[
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
          { value: "Evaluating options", label: "Evaluating options" }
        ]}
      />

      {currentProvider === 'Yes' && (
        <RadioGroup
          label="What is the primary reason you're exploring a new provider?"
          name="switchReason"
          register={register}
          required
          errors={errors}
          options={[
            { value: "Looking for cost savings", label: "Looking for cost savings" },
            { value: "Current provider lacks innovation or AI capabilities", label: "Current provider lacks innovation or AI capabilities" },
            { value: "Quality or consistency of service has declined", label: "Quality or consistency of service has declined" },
            { value: "Need better integration with our systems", label: "Need better integration with our systems" },
            { value: "Unresponsive or poor customer support", label: "Unresponsive or poor customer support" },
            { value: "Other", label: "Other" }
          ]}
        />
      )}

      {switchReason === 'Other' && (
        <FormField
          label="Please specify reason for switching"
          name="otherSwitchReason"
          register={register}
          required
          errors={errors}
          placeholder="Enter reason for switching providers"
        />
      )}
    </div>
  );
};

export default TimelineLaunch;