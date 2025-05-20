import React from 'react';
import { useFormContext } from 'react-hook-form';
import CheckboxGroup from '../CheckboxGroup';
import RadioGroup from '../RadioGroup';
import FormField from '../FormField';

const CallTypes: React.FC = () => {
  const { register, watch, formState: { errors } } = useFormContext();
  const selectedCallTypes = watch('callTypes') || [];

  return (
    <div className="space-y-6">
      <p className="text-neutral-600">
        Tell us about the types of calls you need to handle.
      </p>

      <CheckboxGroup
        label="What best describes the types of calls we'd be handling?"
        name="callTypes"
        register={register}
        required
        errors={errors}
        options={[
          { value: "General inquiries", label: "General inquiries" },
          { value: "Customer service", label: "Customer service" },
          { value: "Technical support", label: "Technical support" },
          { value: "Scheduling/appointments", label: "Scheduling/appointments" },
          { value: "Billing/payment", label: "Billing/payment" },
          { value: "Product returns or complaints", label: "Product returns or complaints" },
          { value: "Order status", label: "Order status" },
          { value: "Other", label: "Other" }
        ]}
      />

      {selectedCallTypes.includes('Other') && (
        <FormField
          label="Please specify other call types"
          name="otherCallType"
          register={register}
          required
          errors={errors}
          placeholder="Enter other call types"
        />
      )}

      <RadioGroup
        label="Can you estimate the mix of these call types?"
        name="callMix"
        register={register}
        required
        errors={errors}
        options={[
          { value: "Mostly simple/general (80%+)", label: "Mostly simple/general (80%+)" },
          { value: "Mix of simple and complex", label: "Mix of simple and complex" },
          { value: "Mostly complex or technical", label: "Mostly complex or technical" },
          { value: "Not sure yet", label: "Not sure yet" }
        ]}
      />
    </div>
  );
};

export default CallTypes;