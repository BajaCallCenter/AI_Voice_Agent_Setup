import React from 'react';
import { useFormContext } from 'react-hook-form';
import RadioGroup from '../RadioGroup';

const CallVolumeHours: React.FC = () => {
  const { register, watch, formState: { errors } } = useFormContext();
  const supportCoverage = watch('supportCoverage');

  return (
    <div className="space-y-6">
      <p className="text-neutral-600">
        Help us understand your call volume and support hours requirements.
      </p>

      <RadioGroup
        label="How many inbound calls do you receive?"
        name="callVolume"
        register={register}
        required
        errors={errors}
        options={[
          { value: "Less than 50/day", label: "Less than 50/day" },
          { value: "50-100/day", label: "50-100/day" },
          { value: "100-500/day", label: "100-500/day" },
          { value: "500+ per day", label: "500+ per day" },
          { value: "Not sure yet", label: "Not sure yet" }
        ]}
      />

      <RadioGroup
        label="When do you need support coverage?"
        name="supportCoverage"
        register={register}
        required
        errors={errors}
        options={[
          { value: "Weekdays, business hours only", label: "Weekdays, business hours only" },
          { value: "Weekdays, extended hours", label: "Weekdays, extended hours" },
          { value: "7 days/week, business hours", label: "7 days/week, business hours" },
          { value: "24/7", label: "24/7" },
          { value: "Other", label: "Other" }
        ]}
      />

      {supportCoverage === 'Other' && (
        <FormField
          label="Please specify support coverage needs"
          name="otherSupportCoverage"
          register={register}
          required
          errors={errors}
          placeholder="Enter your support coverage requirements"
        />
      )}

      <RadioGroup
        label="Does your call volume change seasonally?"
        name="seasonalVolume"
        register={register}
        required
        errors={errors}
        options={[
          { value: "No, it's consistent", label: "No, it's consistent" },
          { value: "Yes, peak during holidays", label: "Yes, peak during holidays" },
          { value: "Yes, peak during specific campaigns", label: "Yes, peak during specific campaigns" },
          { value: "Not sure yet", label: "Not sure yet" }
        ]}
      />
    </div>
  );
};

export default CallVolumeHours;